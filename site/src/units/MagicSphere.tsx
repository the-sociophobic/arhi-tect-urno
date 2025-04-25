import { FC, useEffect, useRef } from 'react'

import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import generatePath from '../utils/generatePath'
import envMapSource from '../utils/envMapSource'


const MagicSphere: FC = () => {

  const { pointer } = useThree()
  const sphereRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const video = document.getElementById('video');
    (video as HTMLVideoElement)?.play?.()
  }, [])

  const video = document.getElementById('video')
  const texture = new THREE.VideoTexture( (video as HTMLVideoElement)! )
  texture.colorSpace = THREE.SRGBColorSpace

  const envMap = useLoader(RGBELoader, generatePath(envMapSource))
  // envMap.mapping = THREE.EquirectangularRefractionMapping

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.set(
        pointer.y / 2.5,
        Math.PI / 3 + pointer.x / 2.5,
        0
      )
    }
  })

  return (
    <Sphere
      ref={sphereRef}
      args={[3.25, 35, 35]}
      scale={[1, 1, .1887]}
      position={[0, 0, 0]}
    >
      <meshPhongMaterial
        color={'0xff00ff'}
        envMap={envMap}
        // envMap={texture}
        map={texture}
        reflectivity={.5}
        refractionRatio={0.95}
      />
    </Sphere>
  )
}


export default MagicSphere
