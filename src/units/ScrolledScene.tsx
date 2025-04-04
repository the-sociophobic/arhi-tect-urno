import { FC } from 'react'

import { AssetRenderOne } from './Asset'
import MagicSphere from './MagicSphere'


const ScrolledScene: FC = () => {
  return (
    <>
      <MagicSphere />
      <AssetRenderOne
        asset={{
          preload: true,
          model_path: '/models/logo.glb'
        }}
        scale={[5, 5, 5]}
        position={[0, -10, 0]}
      />
    </>
  )
}


export default ScrolledScene
