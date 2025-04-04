import { FC, useRef } from 'react'

import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import generatePath from '../utils/generatePath'


const MagicSphere: FC = () => {

  const { pointer } = useThree()
  const sphereRef = useRef<THREE.Mesh>(null)

  // useEffect(() => {
  //   const video = document.getElementById('video');
  //   (video as HTMLVideoElement)?.play?.()
  // })
  // const video = document.getElementById('video')
  // const texture = new THREE.VideoTexture( (video as HTMLVideoElement)! )
  // texture.colorSpace = THREE.SRGBColorSpace

  const envMap = useLoader(RGBELoader, generatePath('/hdri/envMap.hdr'))
  // envMap.mapping = THREE.EquirectangularRefractionMapping

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.set(
        pointer.y / 1.5,
        Math.PI / 3 + pointer.x / 1.5,
        0
      )
    }
  })

  return (
    <Sphere
      ref={sphereRef}
      args={[3.25]}
      scale={[1, 1, .3]}
      position={[0, 0, 0]}
    >
      <meshBasicMaterial
        color={'0xffffff'}
        envMap={envMap}
        // envMap={texture}
        refractionRatio={0.95}
      />
    </Sphere>
  )
}


export default MagicSphere
