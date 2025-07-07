import { FC } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'


export type SkewCardsRenderOneProps = {
  pic: string
}


const SkewCardsRenderOne: FC<SkewCardsRenderOneProps> = ({
  pic
}) => {
  const geometry = new THREE.PlaneGeometry(1.6, 1, 40, 40)
  const texture = useLoader(THREE.TextureLoader, pic)

  return (
    <>
      <mesh
        args={[geometry]}
        scale={1.5}
      >
        <meshStandardMaterial map={texture}/>
        {/* <PlaneMaterial texturePath={pic} /> */}
      </mesh>
      <mesh
        args={[geometry]}
        scale={1}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial map={texture}/>
        {/* <PlaneMaterial texturePath={pic} /> */}
      </mesh>
    </>
  )
}


export default SkewCardsRenderOne
