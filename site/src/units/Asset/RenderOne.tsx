import { FC, useRef } from 'react'

import { AssetLoader } from './Loader'
import { AssetRenderOneData } from './Types'


export type AssetRenderOneProps = AssetRenderOneData & {
  _ref?: any
  onClick?: () => void
}


export const AssetRenderOne: FC<AssetRenderOneProps> = (data) => {
  const assetRef = useRef(AssetLoader.load({ ...data, applyTransforms: true }))

  return (
    <primitive
      ref={data._ref}
      onClick={data.onClick}
      position={data.position}
      rotation={data.rotation}
      scale={data.scale}
      object={assetRef.current.scene}
    />
  )
}
