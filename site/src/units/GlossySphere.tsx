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

  const geometry = new THREE.PlaneGeometry(5, 5, 1, 1)
  const texture = useLoader(THREE.TextureLoader, generatePath('/sphere.png'))
  const texture2 = useLoader(THREE.TextureLoader, generatePath('/sphere_mask.png'))

  return (
    <>
      <mesh
        args={[geometry]}
        scale={1.5}
      >
        <meshStandardMaterial
          map={texture}
          transparent={true}
          alphaTest={.5}
          opacity={.7}
        />
      </mesh>
      <mesh
        args={[geometry]}
        scale={1.501}
        position={[0, 0, -.05]}
      >
        <meshPhysicalMaterial
          map={texture2}
          transparent={true}
          alphaTest={.5}
          opacity={1}
          roughness={.4}
          transmission={.5}
        />
      </mesh>

      {/* <Sphere
        scale={[2.5, 2.5, 2.5]}
        args={[1, 50, 50]}
      >
        <meshPhysicalMaterial
          opacity={.9}
          transparent={true}
          metalness={.7}
          roughness={.4}
          transmission={2}
          color={'#ACAA75'}
        // specularIntensity={3}
        // aberrationStrength={0}
        // ior={1}
        // bounces={0}
        // envMap={envMap}
        />
      </Sphere> */}
      {/* <Sphere
        scale={[2.53, 2.53, 2.53]}
        args={[1, 50, 50]}
      >
        <meshStandardMaterial
          opacity={.03}
          transparent={true}
          metalness={1}
          roughness={.1}
        // aberrationStrength={0}
        // ior={1}
        // bounces={0}
        // envMap={envMap}
        />
      </Sphere> */}
    </>
  )
}


export default GlossySphere
