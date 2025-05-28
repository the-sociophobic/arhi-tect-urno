import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import { Vector3 } from '../../types/three.type'


export type AnimationType<T> = {
  id: string

  startValue: T
  endValue: T

  startTime: number
  duration: number

  alpha: number
  state: AnimationStateType
  onChange: (value: T) => void
}

export type AnimationStateType = 'forward' | 'backward' | 'paused' | 'start' | 'finish'


const useAnimations = () => {
  const registeredAnimations = useRef(new Map<string, AnimationType<number | Vector3>>())
  const { clock } = useThree()

  const registerAnimation = (animation: Omit<AnimationType<number | Vector3>, 'startTime' | 'alpha' | 'state'>) => {
    if (registeredAnimations.current.get(animation.id))
      return

    registeredAnimations.current.set(animation.id, {
      ...animation,
      startTime: 0,
      alpha: 0,
      state: 'start'
    })
  }
  const handleAnimation = (
    animationId: string,
    elapsedTime: number
  ) => {
    const animation = registeredAnimations.current.get(animationId)

    if (!animation)
      return

    const {
      startValue,
      endValue,
      startTime,
      duration,
      alpha,
      state,
      onChange,
    } = animation

    if (['start', 'finish'].includes(state))
      return

    const endTime = startTime + duration

    if (elapsedTime < startTime || elapsedTime > endTime)
      return

    const updatedAnimation = { ...animation }
    if (state === 'paused') {
      updatedAnimation.startTime = elapsedTime + duration * alpha
    } else {
      let pastTime = 0
      switch (state) {
        case 'forward':
          pastTime = elapsedTime - startTime
          break
        case 'backward':
          pastTime = endTime - elapsedTime
          break
      }
      let updatedAlpha = pastTime / duration
      let updatedState = state
      
      if (state === 'forward' && updatedAlpha > 1) {
        updatedState = 'finish'
        updatedAlpha = 1
      }      
      if (state === 'backward' && updatedAlpha < 0) {
        updatedState = 'start'
        updatedAlpha = 0
      }

      const isNumberType = typeof startValue === 'number'
      const currentValue = isNumberType ?
        lerpNumber(startValue, endValue as number, updatedAlpha)
        :
        lerpVector3(startValue as Vector3, endValue as Vector3, updatedAlpha)

      updatedAnimation.alpha = updatedAlpha
      updatedAnimation.state = updatedState
      onChange(currentValue)
    }

    registeredAnimations.current.set(animationId, updatedAnimation)
  }

  useFrame(threeState => {
    const { elapsedTime } = threeState.clock
    registeredAnimations.current.forEach((animation, animationId) => {
      handleAnimation(animationId, elapsedTime)
    })
  })

  const play = (id: string) => {
    const animation = registeredAnimations.current.get(id)

    if (!animation || animation.state === 'finish')
      return

    let updatedStartTime = animation.startTime

    if (animation.state === 'start')
      updatedStartTime = clock.elapsedTime

    const updatedAnimation = {
      ...animation,
      state: 'forward' as AnimationStateType,
      startTime: updatedStartTime
    }
    registeredAnimations.current.set(id, updatedAnimation)
  }
  const playBackward = (id: string) => {
    const animation = registeredAnimations.current.get(id)

    if (!animation || animation.state === 'start')
      return

    let updatedStartTime = animation.startTime

    if (animation.state === 'finish')
      updatedStartTime = clock.elapsedTime

    const updatedAnimation = {
      ...animation,
      state: 'backward' as AnimationStateType,
      startTime: updatedStartTime
    }
    registeredAnimations.current.set(id, updatedAnimation)
  }
  const pause = (id: string) => {
    const animation = registeredAnimations.current.get(id)
    const updatedAnimation = { ...animation, state: 'paused' }
    registeredAnimations.current.set(id, updatedAnimation as AnimationType<number | Vector3>)
  }

  return {
    registerAnimation,
    play,
    playBackward,
    pause,
  }
}


export default useAnimations


export const lerpNumber = (
  startValue: number,
  endValue: number,
  alpha: number
) => {
  return startValue + (endValue - startValue) * alpha
}

export const lerpVector3 = (
  startValue: Vector3,
  endValue: Vector3,
  alpha: number
) => {
  return [
    lerpNumber(startValue[0], endValue[0], alpha),
    lerpNumber(startValue[1], endValue[1], alpha),
    lerpNumber(startValue[2], endValue[2], alpha),
  ] as Vector3
}
