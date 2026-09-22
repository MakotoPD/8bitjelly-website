<template>
  <div
    ref="host"
    class="octopus-model"
    role="img"
    :aria-label="$t('hero.octopusAlt')"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <img v-if="failed" src="/whale.png" class="octopus-fallback" alt="" />
  </div>
</template>

<script setup lang="ts">
import type { Group, Material, MeshToonMaterial, Texture, WebGLRenderer } from 'three'

const host = ref<HTMLElement>()
const failed = ref(false)
const pointer = { x: 0, y: 0 }
let renderer: WebGLRenderer | undefined
let model: Group | undefined
let bodyTexture: Texture | undefined
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

    const [octopus, texture] = await Promise.all([
      new OBJLoader().loadAsync('/models/pink-octopus/octopus.obj'),
      new THREE.TextureLoader().loadAsync('/models/pink-octopus/body.png'),
    ])
    if (disposed) {
      texture.dispose()
      octopus.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          for (const material of Array.isArray(child.material) ? child.material : [child.material]) material.dispose()
        }
      })
      return
    }

    model = octopus
    bodyTexture = texture
    texture.colorSpace = THREE.SRGBColorSpace
    toonGradient = new THREE.DataTexture(new Uint8Array([45, 115, 190, 255]), 4, 1, THREE.RedFormat)
    toonGradient.minFilter = THREE.NearestFilter
    toonGradient.magFilter = THREE.NearestFilter
    toonGradient.needsUpdate = true
    const materialByName: Record<string, MeshToonMaterial> = {
      'Material.001': new THREE.MeshToonMaterial({ map: texture, gradientMap: toonGradient }),
      'Material.002': new THREE.MeshToonMaterial({ color: '#71263f', gradientMap: toonGradient }),
      'Material.003': new THREE.MeshToonMaterial({ color: '#b93660', gradientMap: toonGradient }),
      'Material.004': new THREE.MeshToonMaterial({ color: '#8f6680', gradientMap: toonGradient }),
    }
    const outlineMaterial = new THREE.MeshBasicMaterial({ color: '#1b0b2e', side: THREE.BackSide })
    materials = [...Object.values(materialByName), outlineMaterial]
    octopus.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return
      const original = child.material
      const replacement = (material: Material) => materialByName[material.name] || materialByName['Material.001']!
      child.material = Array.isArray(original) ? original.map(replacement) : replacement(original)
      for (const material of Array.isArray(original) ? original : [original]) material.dispose()
    })

    const bounds = new THREE.Box3().setFromObject(octopus)
    const center = bounds.getCenter(new THREE.Vector3())
    const scale = 4.2 / Math.max(...bounds.getSize(new THREE.Vector3()).toArray())
    octopus.position.copy(center).multiplyScalar(-1)
    const outline = octopus.clone()
    outline.scale.setScalar(1.025)
    outline.position.copy(center).multiplyScalar(-1.025)
    outline.traverse(child => {
      if (child instanceof THREE.Mesh) child.material = outlineMaterial
    })
    const pivot = new THREE.Group()
    pivot.scale.setScalar(scale)
    pivot.add(outline, octopus)
    scene.add(pivot)

    scene.add(new THREE.HemisphereLight(0xfff6fb, 0x67203d, 0.7))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(-3, 5, 6)
    scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0xff8fba, 0.35)
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
    resizeObserver.observe(host.value!)
    resize()

    let rotationX = 0
    let rotationY = 0
    const animate = (time: number) => {
      if (!renderer) return
      const t = time * 0.001
      rotationX += (pointer.y - rotationX) * 0.05
      rotationY += (pointer.x - rotationY) * 0.05
      pivot.rotation.x = rotationX * 0.18 + Math.sin(t * 0.8) * 0.04
      pivot.rotation.y = rotationY * 0.4 + Math.sin(t * 0.45) * 0.22
      pivot.position.y = Math.sin(t * 1.4) * 0.1
      renderer.render(scene, camera)
    }
    visibilityObserver = new IntersectionObserver(([entry]) => {
      if (disposed) return
      renderer?.setAnimationLoop(entry?.isIntersecting && !reducedMotion ? animate : null)
      if (entry?.isIntersecting) renderer?.render(scene, camera)
    })
    visibilityObserver.observe(host.value!)
  } catch (error) {
    console.error('Could not load the hero octopus', error)
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
  bodyTexture?.dispose()
  toonGradient?.dispose()
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<style scoped>
.octopus-model {
  position: absolute;
  inset: 0;
  z-index: 2;
}
.octopus-model :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 18px 24px rgba(27, 11, 46, 0.2));
}
.octopus-fallback {
  position: absolute;
  width: 80%;
  max-height: 100%;
  object-fit: contain;
  inset: 0;
  margin: auto;
}
</style>
