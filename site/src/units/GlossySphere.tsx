import { FC } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import generatePath from '../utils/generatePath'
import envMapSource from '../utils/envMapSource'


const GlossySphere: FC = () => {
  const envMap = useLoader(RGBELoader, generatePath(envMapSource))
  envMap.mapping = THREE.EquirectangularReflectionMapping

  return (
    <>
      <Sphere
        scale={[2.5, 2.5, 2.5]}
        args={[1, 50, 50]}
      >
        <meshStandardMaterial
          opacity={.5}
          transparent={true}
          metalness={.5}
          roughness={.35}
        // aberrationStrength={0}
        // ior={1}
        // bounces={0}
        // envMap={envMap}
        />
      </Sphere>
      <Sphere
        scale={[2.53, 2.53, 2.53]}
        args={[1, 50, 50]}
      >
        <meshStandardMaterial
          opacity={.1}
          transparent={true}
          metalness={1}
          roughness={.1}
        // aberrationStrength={0}
        // ior={1}
        // bounces={0}
        // envMap={envMap}
        />
      </Sphere>
    </>
  )
}


export default GlossySphere
