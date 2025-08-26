import { FC } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import useMousePointerOnHover from '../../hooks/useMousePointerOnHover'


export type HintsRenderOneProps = {
  onClick: () => void
  rotation: number
  texture: string
}


const HintsRenderOne: FC<HintsRenderOneProps> = ({
  rotation,
  texture,
  onClick
}) => {
  const geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
  const textureLoaded = useLoader(THREE.TextureLoader, texture)
  const mousePointerProps = useMousePointerOnHover()

  return (
    <group
      onClick={onClick}
      rotation={[0, rotation, 0]}
      {...mousePointerProps}
    >
      <mesh
        args={[geometry]}
        position={[0, .1, 2.5]}
        scale={5.5}
      >
        <meshStandardMaterial
          emissive={0xFFFFFF}
          emissiveIntensity={1000}
          map={textureLoaded}
          transparent={true}
        />
      </mesh>
    </group>
  )
}


export default HintsRenderOne
