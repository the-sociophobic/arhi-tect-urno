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
      camera={orthographic ? { zoom: 115, position: [0, 0, 10] } : {}}
      className={className}
    >
      <Suspense>
        {children}
      </Suspense>
    </Canvas>
  )
}


export default ThreeScene
