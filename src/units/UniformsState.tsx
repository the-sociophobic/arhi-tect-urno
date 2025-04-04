import { FC, useEffect } from 'react'
import { debounce } from 'lodash'

import { notifyThreeRef, useSubscribeThreeRef } from '../utils/ThreeRef'
import {
  scrollPos,
} from './Uniforms'


const UniformsState: FC = () => {
  // SUBSCRIBE TO UNIFORMS UPDATES
  useSubscribeThreeRef(scrollPos, () => {
  })

  // DEVICE ACCELEROMETER NOISE
  useEffect(() => {
    const handleScroll = debounce((event: Event) => {
      console.log(event)
    }, 10)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <></>
  )
}


export default UniformsState
