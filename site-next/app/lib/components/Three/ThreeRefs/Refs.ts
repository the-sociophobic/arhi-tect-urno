import { Vector2, Vector3 } from 'three'

import { ThreeRef } from './ThreeRef'


export const mouseClickedRef = new ThreeRef<boolean>(false)

export const prevMouseClickedRef = new ThreeRef<boolean>(false)

export const prevPointerRef = new ThreeRef<Vector2>(new Vector2(0, 0))

export const pointerAcceleration = new ThreeRef<Vector3>(new Vector3(0, 0, 0))
