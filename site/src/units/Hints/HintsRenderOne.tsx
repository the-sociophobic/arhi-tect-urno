import { FC } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'


export type HintsRenderOneProps = {
  rotation: number
  texture: string
}


const HintsRenderOne: FC<HintsRenderOneProps> = ({
  rotation,
  texture
}) => {
  const geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
  const textureLoaded = useLoader(THREE.TextureLoader, texture)

  return (
    <group rotation={[0, rotation, 0]}>
      <mesh
        args={[geometry]}
        position={[0, 0, 1.5]}
        scale={1.5}
      >
        <meshStandardMaterial
          map={textureLoaded}
          transparent={true}
        />
      </mesh>
    </group>
  )
}


export default HintsRenderOne
