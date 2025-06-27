'use client'

import { FC, useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { Environment, Sphere } from '@react-three/drei'
import generatePath from '../../utils/generatePath'
import AssetRenderOne from './Asset/RenderOne'
import { Vector3 } from '../../types/three.type'


const envMapSource = generatePath('/three/studio_1k_bw.hdr')
const texturePath = generatePath('/three/architect_main.png')


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
      const newRotation = getRotationFromPointer(pointer.x, pointer.y)
      const newRotationLerp = lerpRotation(sphereRef.current.rotation.toArray() as Vector3, newRotation)

      sphereRef.current.rotation.set(...newRotationLerp)
    }
  })

  const { pointer } = useThree()
  const [initialRotation] = useState(getRotationFromPointer(pointer.x, pointer.y))

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
        rotation={[0, Math.PI, 0]}
      >
        <group
          ref={sphereRef}
          position={[0, 0, 0]}
          rotation={initialRotation}
          scale={[1, 4, 1]}
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


const getRotationFromPointer = (pointerX: number, pointerY: number) => {
  const _x = pointerX && !isNaN(pointerX) ? pointerX : 0
  const _y = pointerY && !isNaN(pointerY) ? pointerY : 0
  const x = Math.sign(_x) * Math.min(Math.abs(_x) * 4, 1)
  const y = Math.sign(_y) * Math.min(Math.abs(_y) * 4, 1)
  const xRotation = Math.asin(Math.sign(y) * (Math.abs(y) ** 1)) / 1.7 - Math.PI / 2
  const yRotation = Math.asin(Math.sign(x) * (Math.abs(x) ** 1)) / 1.7

  return [
    xRotation,
    0,
    yRotation,
  ] as Vector3
}

const lerpRotation = (rotationA: Vector3, rotationB: Vector3) => {
  return [
    (rotationA[0] - rotationB[0]) * 0.92 + rotationB[0],
    (rotationA[1] - rotationB[1]) * 0.92 + rotationB[1],
    (rotationA[2] - rotationB[2]) * 0.92 + rotationB[2]
  ] as Vector3
}