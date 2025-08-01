import { FC } from 'react'

import { Canvas } from '@react-three/fiber'
import SceneObjects from '../units/SceneObjects'


const Scene: FC = () => {
  return (
    <Canvas
      // orthographic
      camera={{ zoom: .85 }}
    >
      <SceneObjects />
    </Canvas>
  )
}


export default Scene
