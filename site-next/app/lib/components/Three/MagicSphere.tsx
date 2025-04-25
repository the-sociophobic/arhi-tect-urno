'use client'

import { FC, useEffect, useRef } from 'react'

import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { Environment, Sphere } from '@react-three/drei'


const generatePath = (path: string) => path
const envMapSource = '/three/studio_1k_bw.hdr'
const texturePath = '/three/architect_main.png'

const MagicSphere: FC = () => {

  const { pointer } = useThree()
  const sphereRef = useRef<THREE.Mesh>(null)

  // useEffect(() => {
  //   const video = document.getElementById('video');
  //   (video as HTMLVideoElement)?.play?.()
  // }, [])

  // const video = document.getElementById('video')
  // const texture = new THREE.VideoTexture( (video as HTMLVideoElement)! )
  // texture.colorSpace = THREE.SRGBColorSpace

  const texture = useLoader(THREE.TextureLoader, texturePath)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.5, 1.5)
  texture.offset.set(-.015, .5)

  const envMap = useLoader(RGBELoader, generatePath(envMapSource))
  // envMap.mapping = THREE.EquirectangularRefractionMapping

  useFrame(threeState => {
    if (sphereRef.current) {
      // sphereRef.current.rotation.set(
      //   pointer.y / 2.5,
      //   Math.PI / 3 + pointer.x / 2.5,
      //   0
      // )
      // const alpha = threeState.clock.elapsedTime - Math.floor(threeState.clock.elapsedTime)
      sphereRef.current.rotation.set(
        Math.PI / 15 * Math.cos(threeState.clock.elapsedTime),
        Math.PI / 15 * Math.sin(threeState.clock.elapsedTime),
        0
      )
    }
  })

  return (
    <>
      <Environment files={generatePath(envMapSource)} />
      <ambientLight intensity={3} />
      <group scale={[.9, .9, .9]}>
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
            map={envMap}
            reflectivity={.5}
            refractionRatio={0.95}
          />
        </Sphere>
      </group>
    </>
  )
}


export default MagicSphere
