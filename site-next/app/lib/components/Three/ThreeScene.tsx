'use client'

import { ReactNode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'


export type ThreeSceneProps = {
  children: ReactNode
  className?: string
  orthographic?: boolean
}


const ThreeScene: React.FC<ThreeSceneProps> = ({
  children,
  className,
  orthographic=true
}) => {
  return (
    <Canvas
      orthographic={orthographic}
      camera={orthographic ?
        { zoom: 115, position: [0, 0, 10] }
        :
        {
          zoom: 1.5,
          position: [0, -8, 0],
          // position: [0, 8, 0],
          // rotation: [-Math.PI / 2, 0, 0],
        }
      }
      className={className}
    >
      <Suspense>
        {children}
      </Suspense>
    </Canvas>
  )
}


export default ThreeScene
