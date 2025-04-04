import React, { useRef, useEffect } from 'react'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, useScroll } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'



const CAMERA_INITIAL_POSITION = new THREE.Vector3(0, -5, 17)
const CAMERA_INITIAL_TARGET = new THREE.Vector3(0, 0, 0)
const CAMERA_MAX_POLAR_ANGLE = Math.PI / 2 + .01

// const moveVector = new THREE.Vector3()
// const pointerMoveVector = new THREE.Vector3()
const positionToTarget = new THREE.Vector3()


export const CameraControls: React.FC = () => {
  const controlsRef = useRef<OrbitControlsType>(null)

  // Инициализация камеры
  useEffect(() => {
    const controls = controlsRef.current

    if (!controls)
      return

    controls.object.position.copy(CAMERA_INITIAL_POSITION)
    controls.target.copy(CAMERA_INITIAL_TARGET)
    controls.maxPolarAngle = CAMERA_MAX_POLAR_ANGLE
    controls.enableZoom = false
    controls.update()
  }, [])
  // Конец инициализации камеры

  const data = useScroll()
    
  // Управление камерой
  useFrame((_threeState, _delta) => {
    const controls = controlsRef.current

    if (!controls)
      return

    const { target } = controls
    const { position } = controls.object
    // const cameraForwardVector = getCameraForwardVector(position, target)
    // const yRotation = Math.acos(cameraForwardVector.z) * Math.sign(cameraForwardVector.x) - Math.PI

    positionToTarget
      .copy(target)
      .sub(position)
    // const zoom = positionToTarget.length()

    target.set(
      0,
      data.range(0, 1) * -10,
      0
    )
    const angle = Math.PI / 3 * (.4 + data.range(0, 1))
    position.set(
      Math.cos(angle) * 17,
      // data.range(0, 1) * 15,
      data.range(0, 1) * -10 + 3,
      Math.sin(angle) * 17
    )


    // moveVector
    //   .set(
    //     (left ? -1 : 0) + (right ? 1 : 0),
    //     0,
    //     (forward ? -1 : 0) + (backward ? 1 : 0)
    //   )
    //   .applyAxisAngle(upDirection, yRotation)
    //   .normalize()
    //   .multiplyScalar(CAMERA_MOVEMENT_SPEED * zoom * delta)

    // if (firstPersonMode) {
    //   moveVector.multiplyScalar(FIRST_PERSON_SPEED)
    //   rigidBody.setLinvel(moveVector, true)

    //   // rigidBody.translation() всегда выдаёт неправильную позицию
    //   sphere.getWorldPosition(spherePosition)
    //   position.copy(spherePosition).setY(FIRST_PERSON_HEIGHT)
    //   target.copy(position).add(positionToTarget)
    // } else {
    //   position.add(moveVector)
    //   target.add(moveVector)
    // }

    controls.update()
  })
  // Конец управления камерой

  return (
    <OrbitControls ref={controlsRef as any} />
  )
}


// const COORD_DELTA = 0.0001
// const cameraForwardTmpVector = new THREE.Vector3()

// const getCameraForwardVector = (position: THREE.Vector3, target: THREE.Vector3) => {
//   cameraForwardTmpVector.copy(target).sub(position)
//   // Для правильной работы Math.acos координата не должна равняться 0. Лучше 0.000001
//   cameraForwardTmpVector
//     .set(
//       cameraForwardTmpVector.x === 0 ? COORD_DELTA : cameraForwardTmpVector.x,
//       0,
//       cameraForwardTmpVector.z === 0 ? COORD_DELTA : cameraForwardTmpVector.z
//     )
//     .normalize()

//   return cameraForwardTmpVector
// }
