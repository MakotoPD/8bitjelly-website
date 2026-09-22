<template>
  <div
    ref="host"
    class="contact-turtle"
    role="img"
    :aria-label="$t('contact.turtleAlt')"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <img v-if="failed" src="/whale.png" class="turtle-fallback" alt="" />
  </div>
</template>

<script setup lang="ts">
import type { Group, Material, MeshToonMaterial, Texture, WebGLRenderer } from 'three'

const host = ref<HTMLElement>()
const failed = ref(false)
const pointer = { x: 0, y: 0 }
let renderer: WebGLRenderer | undefined
let model: Group | undefined
let toonGradient: Texture | undefined
let materials: Material[] = []
let visibilityObserver: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined
let disposed = false
let reducedMotion = false

function onPointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch' || reducedMotion || !host.value) return
  const bounds = host.value.getBoundingClientRect()
  pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
  pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
}

function onPointerLeave() {
  pointer.x = 0
  pointer.y = 0
}

onMounted(async () => {
  if (!host.value) return
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  try {
    const [THREE, { OBJLoader }] = await Promise.all([
      import('three'),
      import('three/addons/loaders/OBJLoader.js'),
    ])
    if (disposed || !host.value) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.z = 7.4
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.value.appendChild(renderer.domElement)

    const turtle = await new OBJLoader().loadAsync('/models/turtle/turtle.obj')
    if (disposed) {
      turtle.traverse(child => {
        if (child instanceof THREE.Mesh) child.geometry.dispose()
      })
      return
    }

    model = turtle
    toonGradient = new THREE.DataTexture(new Uint8Array([35, 105, 185, 255]), 4, 1, THREE.RedFormat)
    toonGradient.minFilter = THREE.NearestFilter
    toonGradient.magFilter = THREE.NearestFilter
    toonGradient.needsUpdate = true
    const materialByName: Record<string, MeshToonMaterial> = {
      shell: new THREE.MeshToonMaterial({ color: '#a8c957', gradientMap: toonGradient }),
      body: new THREE.MeshToonMaterial({ color: '#087887', gradientMap: toonGradient }),
      flipper_left: new THREE.MeshToonMaterial({ color: '#a7ca55', gradientMap: toonGradient }),
      flipper_right: new THREE.MeshToonMaterial({ color: '#a7ca55', gradientMap: toonGradient }),
    }
    const outlineMaterial = new THREE.MeshBasicMaterial({ color: '#1b0b2e', side: THREE.BackSide })
    materials = [...Object.values(materialByName), outlineMaterial]
    turtle.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return
      child.material.dispose()
      child.material = materialByName[child.name] || materialByName.body!
    })

    const bounds = new THREE.Box3().setFromObject(turtle)
    const center = bounds.getCenter(new THREE.Vector3())
    const scale = 5.2 / bounds.getSize(new THREE.Vector3()).x
    turtle.position.copy(center).multiplyScalar(-1)
    const outline = turtle.clone()
    outline.scale.setScalar(1.035)
    outline.position.copy(center).multiplyScalar(-1.035)
    outline.traverse(child => {
      if (child instanceof THREE.Mesh) child.material = outlineMaterial
    })
    const baseRotationY = Math.PI - 0.18
    const pivot = new THREE.Group()
    pivot.scale.setScalar(scale)
    pivot.rotation.y = baseRotationY
    pivot.add(outline, turtle)
    scene.add(pivot)

    scene.add(new THREE.HemisphereLight(0xfff8df, 0x335941, 0.75))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(-3, 5, 6)
    scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0xffd65c, 0.4)
    fillLight.position.set(4, -2, -3)
    scene.add(fillLight)

    const resize = () => {
      if (!host.value || !renderer) return
      const { width, height } = host.value.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    }
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host.value)
    resize()

    let rotationX = 0
    let rotationY = 0
    const animate = (time: number) => {
      if (!renderer) return
      const t = time * 0.001
      rotationX += (pointer.y - rotationX) * 0.05
      rotationY += (pointer.x - rotationY) * 0.05
      pivot.rotation.x = rotationX * 0.14 + Math.sin(t * 0.9) * 0.05
      pivot.rotation.y = baseRotationY + rotationY * 0.32 + Math.sin(t * 0.5) * 0.12
      pivot.rotation.z = Math.sin(t * 0.75) * 0.035
      pivot.position.y = Math.sin(t * 1.3) * 0.1
      renderer.render(scene, camera)
    }
    visibilityObserver = new IntersectionObserver(([entry]) => {
      if (disposed) return
      renderer?.setAnimationLoop(entry?.isIntersecting && !reducedMotion ? animate : null)
      if (entry?.isIntersecting) renderer?.render(scene, camera)
    })
    visibilityObserver.observe(host.value)
  } catch (error) {
    console.error('Could not load the contact turtle', error)
    renderer?.dispose()
    renderer?.domElement.remove()
    failed.value = true
  }
})

onUnmounted(() => {
  disposed = true
  visibilityObserver?.disconnect()
  resizeObserver?.disconnect()
  renderer?.setAnimationLoop(null)
  model?.traverse(child => {
    if ('geometry' in child) (child.geometry as { dispose: () => void }).dispose()
  })
  materials.forEach(material => material.dispose())
  toonGradient?.dispose()
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<style scoped>
.contact-turtle {
  position: absolute;
  inset: 0;
  z-index: 2;
}
.contact-turtle :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 14px 20px rgba(27, 11, 46, 0.2));
}
.turtle-fallback {
  position: absolute;
  width: 80%;
  max-height: 100%;
  object-fit: contain;
  inset: 0;
  margin: auto;
}
</style>
