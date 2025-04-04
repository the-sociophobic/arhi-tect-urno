import { ObjectMap } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import { Shifts } from '../../types/vectors'
import { Vector3 } from '../../types/core'


export type AssetData = {
  model_path: string
  preload?: boolean
}

export type normalizeScaleFnType = (bbSize: Vector3) => Vector3

export type AssetRenderOneData = {
  id?: string
  asset: AssetData
} & AssetTransforms

export type AssetTransforms = {
  normalizeScaleFn?: normalizeScaleFnType
  pivotToCenter?: boolean
} & Shifts

export type GLTF_Type = (GLTF & ObjectMap)
