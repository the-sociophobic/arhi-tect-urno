import { FC, useRef } from 'react'

import { AssetLoader } from './Loader'
import { AssetRenderOneData } from './Types'


export const AssetRenderOne: FC<AssetRenderOneData> = (data) => {
  const assetRef = useRef(AssetLoader.load({ ...data, applyTransforms: true }))

  return (
    <primitive
      position={data.position}
      rotation={data.rotation}
      scale={data.scale}
      object={assetRef.current.scene}
    />
  )
}
