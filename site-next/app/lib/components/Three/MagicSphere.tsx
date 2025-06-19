'use client'

import { FC, useEffect, useRef } from 'react'

import * as THREE from 'three'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { Environment, Sphere } from '@react-three/drei'
import generatePath from '../../utils/generatePath'
import AssetRenderOne from './Asset/RenderOne'


const envMapSource = generatePath('/three/studio_1k_bw.hdr')
const texturePath = generatePath('/three/architect_main.png')
const sphereForwardTmpVector = new THREE.Vector3()


const MagicSphere: FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const video = document.getElementById('video');
    (video as HTMLVideoElement)?.play?.()
  }, [])

  let texture

  const video = document.getElementById('video')

  if (video) {
    texture = new THREE.VideoTexture((video as HTMLVideoElement)!)
    texture.colorSpace = THREE.SRGBColorSpace
  } else {
    texture = useLoader(THREE.TextureLoader, texturePath)
  }

  if (texture.wrapS && texture.wrapT && texture.repeat && texture.offset) {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    // texture.repeat.set(1.8, 1)
    // texture.offset.set(-.015, .5)
    // texture.offset.set(.05, 0)
  }


  const envMap = useLoader(RGBELoader, envMapSource)
  // envMap.mapping = THREE.EquirectangularRefractionMapping

  useFrame(threeState => {
    if (sphereRef.current) {
      const { pointer } = threeState
      sphereForwardTmpVector.set(
        pointer.x,
        pointer.y,
        .5,
      ).normalize()
      // const xRotation = Math.acos(sphereForwardTmpVector.y) * Math.sign(sphereForwardTmpVector.z) - Math.PI
      // const yRotation = Math.acos(sphereForwardTmpVector.z) * Math.sign(sphereForwardTmpVector.x) - Math.PI
      const xRotation = -Math.PI / 2 + pointer.y / 2.35
      const yRotation = pointer.x / 2.35
      sphereRef.current.rotation.set(
        xRotation,
        // yRotation,
        0,
        yRotation,
      )
      // const alpha = threeState.clock.elapsedTime - Math.floor(threeState.clock.elapsedTime)
      // sphereRef.current.rotation.set(
      //   Math.PI / 15 * Math.cos(threeState.clock.elapsedTime),
      //   Math.PI / 15 * Math.sin(threeState.clock.elapsedTime),
      //   0
      // )
    }
  })

  return (
    <>
      <Environment
        files={envMapSource}
        // environmentRotation={10}
        // backgroundRotation={10}
        // map={envMap}
        // backgroundIntensity={1}
        // environmentIntensity={100}
      />
      {/* <Environment preset="city" /> */}
      <ambientLight intensity={1.7} />
      <group
        rotation={[Math.PI / 2, Math.PI, 0]}
      >
        <group
          ref={sphereRef}
          scale={[1.75, 5.0, 1.75]}
          position={[0, 0, 2]}
        >
          <group
          // position={[0, -1, 0]}
          >

            <AssetRenderOne
              asset={{
                model_path: generatePath('/three/sphere.glb'),
                preload: true
              }}
              envMap={envMap}
              // envMap={texture}
              map={texture}
            />

            {/* <Sphere
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
        </Sphere> */}
          </group>
        </group>
      </group>
    </>
  )
}


export default MagicSphere
