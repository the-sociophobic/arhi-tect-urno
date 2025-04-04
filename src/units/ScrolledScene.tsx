import { FC } from 'react'

import { AssetRenderOne } from './Asset'
import MagicSphere from './MagicSphere'
import Particles from './Particles'


const ScrolledScene: FC = () => {
  return (
    <>
      <MagicSphere />
      {/* <Particles count={100} /> */}
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
