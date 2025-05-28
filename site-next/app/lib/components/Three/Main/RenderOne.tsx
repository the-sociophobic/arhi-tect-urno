'use client'

import { useRouter } from 'next/navigation'
import { FC, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Box, Sphere } from '@react-three/drei'

import { MaterialsRenderOne } from '../Materials/RenderOne'
import useMousePointerOnHover from '@/app/lib/hooks/useMousePointerOnHover'
import { HEIGHT, NUMBER_OF_MEDIA_2, OPACITY_NUMBER_MAX, TIME_OFFSET, TOP_OFFSET } from './consts'
import useStore from '@/app/lib/hooks/useStore'
import { ContentfulMediaType } from '@/app/lib/types/contentful.type'



export type MainRenderOneProps = {
  media: ContentfulMediaType
  x_pos: number
  y_pos: number
  isSphere?: boolean
}


const MainRenderOne: FC<MainRenderOneProps> = ({
  media,
  x_pos,
  y_pos,
  isSphere
}) => {
  const router = useRouter()
  const alpha = y_pos / NUMBER_OF_MEDIA_2
  const position2 = [
    0,
    TOP_OFFSET - alpha * HEIGHT,
    0
  ] as [number, number, number]
  const { hoveredIds } = useStore()
  const hovered = media.id === hoveredIds[0]

  const opacityNumber = x_pos * NUMBER_OF_MEDIA_2 + y_pos
  const indexAlpha = opacityNumber / OPACITY_NUMBER_MAX * 2

  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((threeState) => {
    if (!materialRef.current || materialRef.current.opacity === 1 || !meshRef.current)
      return

    const { elapsedTime } = threeState.clock
    const opacityAlpha = elapsedTime < indexAlpha ?
    0
    :
    elapsedTime < (indexAlpha + TIME_OFFSET) ?
      (elapsedTime - indexAlpha) / TIME_OFFSET
      :
      1

    materialRef.current.opacity = opacityAlpha

    const scale = (1 + (1 - opacityAlpha) * .2) * (hovered ? 1.1 : 1) / (isSphere ? 2 : 1)

    meshRef.current.scale.set(scale, scale, scale)
  })


  const mousePointerProps = useMousePointerOnHover()

  return isSphere ?
    <Sphere
      ref={meshRef}
      position={position2}
      onClick={() => router.push(`/architects`)}
      {...mousePointerProps}
    >
      <MaterialsRenderOne
        _ref={materialRef}
        material={{
          id: media.id,
          src: media.thumbnail.file.url,
          materialIndex: 0
        }}
        opacity={0}
      />
    </Sphere>
    :
    <Box
      ref={meshRef}
      position={position2}
      onClick={() => router.push(`/architects`)}
      {...mousePointerProps}
    >
      <MaterialsRenderOne
        _ref={materialRef}
        material={{
          id: media.id,
          src: media.thumbnail.file.url,
          materialIndex: 0
        }}
        opacity={0}
      />
    </Box>
}


export { MainRenderOne }
