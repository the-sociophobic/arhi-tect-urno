import { FC } from 'react'

import { Text } from '@react-three/drei'



export type TextRenderOneProps = {
  text: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  color?: string
  onClick?: () => void
}


const TextThree: FC<TextRenderOneProps> = ({
  text,
  position,
  rotation,
  scale = [.15, .15, .15],
  color='black',
  onClick
}) => {
  return (
    <Text
      position={position}
      rotation={rotation}
      scale={scale}
      color={color}
      anchorX='center'
      anchorY='middle'
      onClick={onClick}
    >
      {text}
    </Text>
  )
}


export default TextThree
