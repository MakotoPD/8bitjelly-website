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
import type { Group, Material, MeshStandardMaterial, Texture, WebGLRenderer } from 'three'

const host = ref<HTMLElement>()
const failed = ref(false)
const pointer = { x: 0, y: 0 }
let renderer: WebGLRenderer | undefined
let model: Group | undefined
let bodyTexture: Texture | undefined
let materials: MeshStandardMaterial[] = []
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
    const materialByName: Record<string, MeshStandardMaterial> = {
      'Material.001': new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 }),
      'Material.002': new THREE.MeshStandardMaterial({ color: '#853249', roughness: 0.8 }),
      'Material.003': new THREE.MeshStandardMaterial({ color: '#b13e60', roughness: 0.8 }),
      'Material.004': new THREE.MeshStandardMaterial({ color: '#9b758e', roughness: 0.8 }),
    }
    materials = Object.values(materialByName)
    octopus.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return
      const original = child.material
      const replacement = (material: Material) => materialByName[material.name] || materialByName['Material.001']!
      child.material = Array.isArray(original) ? original.map(replacement) : replacement(original)
      for (const material of Array.isArray(original) ? original : [original]) material.dispose()
    })

    const bounds = new THREE.Box3().setFromObject(octopus)
    const scale = 4.2 / Math.max(...bounds.getSize(new THREE.Vector3()).toArray())
    octopus.position.copy(bounds.getCenter(new THREE.Vector3())).multiplyScalar(-scale)
    octopus.scale.setScalar(scale)
    const pivot = new THREE.Group()
    pivot.add(octopus)
    scene.add(pivot)

    scene.add(new THREE.HemisphereLight(0xffffff, 0x7a3553, 1.4))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(-3, 5, 6)
    scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0xffc4d9, 0.8)
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
