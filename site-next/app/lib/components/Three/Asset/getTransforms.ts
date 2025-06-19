import * as THREE from 'three'

import { AssetTransforms } from '../Asset'
import { Vector3, Vector4, MatrixTransforms } from '@/app/lib/types/three.type'


export type getTransformMatrixType = (props: { scene: THREE.Group } & AssetTransforms) => THREE.Matrix4
export type getTransformsType = (props: { scene: THREE.Group } & AssetTransforms) => Required<MatrixTransforms>


const tmpQuaternion = new THREE.Quaternion()
const GLTFNormalizeScaleMatrix = new THREE.Matrix4()
const pivotOffsetMatrix = new THREE.Matrix4()
const pivotToCenterMatrix = new THREE.Matrix4()
const tmpVector3 = new THREE.Vector3()
const tmp2Vector3 = new THREE.Vector3()
const tmpBox3 = new THREE.Box3()
const bbSize = new THREE.Vector3()


export const getTransformMatrix: getTransformMatrixType = ({
  scene,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  normalizeScaleFn,
  pivotToCenter
}) => {
  const transformMatrix = new THREE.Matrix4()

  const quaternionObjectRotate = tmpQuaternion
    .setFromAxisAngle(
      tmpVector3.set(0, 1, 0),
      rotation[1]
    )

  tmpVector3.set(...position)

  transformMatrix
    .compose(
      tmpVector3,
      quaternionObjectRotate,
      tmp2Vector3.set(1, 1, 1)
    )

  if (normalizeScaleFn) {
    tmpBox3.setFromObject(scene)
    tmpBox3.getSize(bbSize)
    const normalizedSize = normalizeScaleFn(bbSize.toArray())
    const resScale: Vector3 = [
      normalizedSize[0] * scale[0],
      normalizedSize[1] * scale[1],
      normalizedSize[2] * scale[2],
    ]
    GLTFNormalizeScaleMatrix
      .compose(
        tmpVector3.set(0, 0, 0),
        tmpQuaternion.set(0, 0, 0, 0),
        tmp2Vector3.set(...resScale)
      )

    transformMatrix
      .multiply(GLTFNormalizeScaleMatrix)
  }

  if (pivotToCenter) {
    tmpBox3.setFromObject(scene)
    tmpVector3.copy(scene.position)

    const pivotOffset = tmpBox3.max.clone()
      .add(tmpBox3.min)
      .divideScalar(-2)
      .add(tmpVector3)

    pivotOffsetMatrix
      .compose(
        pivotOffset,
        tmpQuaternion.set(0, 0, 0, 0),
        tmp2Vector3.set(1, 1, 1)
      )

    transformMatrix.multiply(pivotOffsetMatrix)
    tmpBox3.setFromObject(scene)
    tmp2Vector3.set(0, tmpBox3.max.clone().sub(tmpBox3.min).divideScalar(2).y, 0)
    pivotToCenterMatrix.setPosition(tmp2Vector3)
    transformMatrix.multiply(pivotToCenterMatrix)
  }


  return transformMatrix
}

export const getTransforms: getTransformsType = (props) => {
  const transformMatrix = getTransformMatrix(props)

  transformMatrix.decompose(tmpVector3, tmpQuaternion, tmp2Vector3)

  return ({
    position: tmpVector3.toArray() as Vector3,
    quaternion: tmpQuaternion.toArray() as Vector4,
    scale: tmp2Vector3.toArray() as Vector3,
  })
}
