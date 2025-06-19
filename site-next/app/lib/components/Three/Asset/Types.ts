import { ObjectMap } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

import { Vector3, Shifts } from '@/app/lib/types/three.type'


export type AssetData = {
  model_path: string
  preload?: boolean
}

export type normalizeScaleFnType = (bbSize: Vector3) => Vector3

export type AssetRenderOneData = {
  asset: AssetData
} & AssetTransforms

export type AssetTransforms = {
  normalizeScaleFn?: normalizeScaleFnType
  pivotToCenter?: boolean
} & Shifts

export type GLTF_Type = (GLTF & ObjectMap)
