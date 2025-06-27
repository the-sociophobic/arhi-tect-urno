import { FC } from 'react'
import * as THREE from 'three'

import { AssetLoader } from './Loader'
import { AssetRenderOneData } from './Types'


export type AssetRenderOneProps = AssetRenderOneData & {
  map: any
  envMap: any
}


const AssetRenderOne: FC<AssetRenderOneProps> = ({
  map,
  envMap,
  ...data
}) => {
  const material = new THREE.MeshStandardMaterial({
    map,
    metalness: 0,
    roughness: 0,
  })
  // const material = new THREE.MeshPhongMaterial({
  //   map,
  //   envMap,
  //   // specularMap: envMap,
  //   // lightMap: envMap,
  //   // specular: 1,
  //   // reflectivity: 0,
  //   // refractionRatio: 0,
  // })
  const model = AssetLoader.load({ ...data })
  const scene = AssetLoader.changeMaterialGLTF(model.scene, material as any)

  return (
    <primitive
      object={scene}
    />
  )
}


export default AssetRenderOne
