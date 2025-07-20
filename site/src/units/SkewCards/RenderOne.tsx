import { FC } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import useMousePointerOnHover from '../../hooks/useMousePointerOnHover'


export type SkewCardsRenderOneProps = {
  img: string
  url: string
  opacity: number
}


const SkewCardsRenderOne: FC<SkewCardsRenderOneProps> = ({
  img,
  url,
  opacity
}) => {
  const geometry = new THREE.PlaneGeometry(1.6, 1, 40, 40)
  const texture = useLoader(THREE.TextureLoader, img)
  const mousePointerProps = useMousePointerOnHover()

  return (
    <group
      rotation={[0, 0, .25]}
      {...mousePointerProps}
      onClick={() => { window.location.href = url }}
    >
      <mesh
        args={[geometry]}
        scale={1.5}
      >
        <meshStandardMaterial
          map={texture}
          transparent={true}
          opacity={opacity}
        />
        {/* <PlaneMaterial texturePath={img} /> */}
      </mesh>
      <mesh
        args={[geometry]}
        scale={1.5}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial
          map={texture}
          transparent={true}
          opacity={opacity}
        />
        {/* <PlaneMaterial texturePath={img} /> */}
      </mesh>
    </group>
  )
}


export default SkewCardsRenderOne
