import { FC } from 'react'

import { AssetRenderOne } from './Asset'
import generatePath from '../utils/generatePath'
import useContentful from '../hooks/useContentful'
// import Particles from './Particles'


const ScrolledScene: FC = () => {
  const { data: contentful } = useContentful()
  console.log(contentful)
  
  return (
    <>
      {/* <Particles count={100} /> */}
      <AssetRenderOne
        asset={{
          preload: true,
          model_path: generatePath('/models/logo.glb')
        }}
        scale={[5, 5, 5]}
        position={[0, -10, 0]}
      />
    </>
  )
}


export default ScrolledScene
