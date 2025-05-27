import { Plane } from 'three'


export interface TextureCoords {
  readonly U: number
  readonly V: number
}

export type MaterialsRenderData = {
  materials: Readonly<MaterialData[]>
  materialGroups: Readonly<MaterialGroup[]>
  clippingPlanes?: Readonly<Plane[]>
  transparent?: boolean
  opacity?: number
  textureOffset?: TextureCoords
  textureSize?: TextureCoords
}

export type MaterialsRenderOneData = {
  material: MaterialData
  clippingPlanes?: Readonly<Plane[]>
  transparent?: boolean
  opacity?: number
  textureOffset?: TextureCoords
  textureSize?: TextureCoords
}

export type MaterialData = {
  id: string
  src: string
  textureMaps?: TextureMap[]
  materialIndex: number
  textureSize?: TextureCoords
}

export type TextureMap = {
  mapType: 'map' | 'metalnessMap' | 'roughnessMap' | 'normalMap'
  src: string
}

export type MaterialGroup = {
  start: number
  count: number
  materialIndex: number
}

export type MaterialLayer = {
  id: string
  parentId: string
  materialGroups: Readonly<MaterialGroup[]>
  clippingPlanes: Readonly<Plane[]>
  thickness?: number
  textureSize: TextureCoords
  textureOffset: TextureCoords
}
