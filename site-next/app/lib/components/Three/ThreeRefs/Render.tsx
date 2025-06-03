import { FC, useEffect } from 'react'

import { mouseClickedRef } from './Refs'
import { notifyThreeRef } from './ThreeRef'


const handleMouseDown = () => {
  mouseClickedRef.current = true
  notifyThreeRef(mouseClickedRef)
}
const handleMouseUp = () => {
  mouseClickedRef.current = false
  notifyThreeRef(mouseClickedRef)
}


export const ThreeRefsRender: FC = () => {
  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)

    return () => window.removeEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)

    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <></>
  )
}
