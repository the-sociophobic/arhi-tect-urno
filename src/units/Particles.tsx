import { useFrame } from '@react-three/fiber'
import { FC, useMemo, useRef } from 'react'

import * as THREE from 'three'


export type ParticlesProps = {
  count: number
}
export type ParticleRenderOne = {
  t: number
  factor: number
  speed: number
  xFactor: number
  yFactor: number
  zFactor: number
  mx: number
  my: number
}


const Particles: FC<ParticlesProps> = ({ count }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const dummy = useMemo(() => new THREE.Object3D(), [])
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp: ParticleRenderOne[] = []

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }

    return temp
  }, [count])
  // The innards of this hook will run every frame
  useFrame(() => {
    const mesh = meshRef.current

    if (!mesh)
      return
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      const t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      // Update the dummy object
      dummy.position.set(
        ((particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10) / 10,
        ((particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10) / 10 -7,
        ((particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10) / 10,
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      // And apply the matrix to the instanced item
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial attach="material" color="#751575" />
    </instancedMesh>
  )
}


export default Particles
