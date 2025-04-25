'use client'

import { ReactNode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'


export type ThreeSceneProps = {
  children: ReactNode
  className?: string
}


const ThreeScene: React.FC<ThreeSceneProps> = ({
  children,
  className
}) => {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 115, position: [0, 0, 10] }}
      className={className}
    >
      <Suspense>
        {children}
      </Suspense>
    </Canvas>
  )
}


export default ThreeScene
