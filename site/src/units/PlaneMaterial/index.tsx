import { FC } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

import vertShader from './_shader.vert?raw'
import fragShader from './_shader.frag?raw'


export type PlaneMaterialProps = {
  texturePath: string
}


const PlaneMaterial: FC<PlaneMaterialProps> = ({
  texturePath
}) => {
  const texture = useLoader(THREE.TextureLoader, texturePath)

  return (
    <shaderMaterial
      fragmentShader={fragShader}
      vertexShader={vertShader}
      uniforms={{
        uTexture: { 
          value: texture
        },
        uOpacity: { 
          value: 1
        },
        uHoverProgress: { 
          value: 0
        },
        uDirection: { // Направление скролла
          value: 0
        },
        uIntensity: {  // Скорость скролла
          value: 0
        },
        uLimitCurve: { 
          value: 0.05
        },
        uLimitShear: { 
          value: 0.25
        },
        uColorBlend: { 
          value: 0
        },
        uHoverMultiplier: { 
          value: 0
        },
        uOffsetNoise: { 
          value: [0, 1]
        },
        uColor: new THREE.Uniform(new THREE.Color(2965556)),
      }}
    />
  )
}


export default PlaneMaterial
