'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere } from '@react-three/drei'

import { MaterialsRenderOne } from '../Materials/RenderOne'
import useMousePointerOnHover from '@/app/lib/hooks/useMousePointerOnHover'
import { ANIM_DELAY, HEIGHT, NUMBER_OF_MEDIA_2, OPACITY_NUMBER_MAX, TIME_OFFSET, TOP_OFFSET } from './consts'
import useStore from '@/app/lib/hooks/useStore'
import { ContentfulMediaType } from '@/app/lib/types/contentful.type'
import useAnimation from '../useAnimation'



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
  const id = media.id + x_pos + '_' + y_pos
  const router = useRouter()
  const alpha = y_pos / NUMBER_OF_MEDIA_2
  const position2 = [
    0,
    TOP_OFFSET - alpha * HEIGHT,
    0
  ] as [number, number, number]
  const { hoveredIds } = useStore()
  const hovered = id === hoveredIds[0]

  const opacityNumber = x_pos * NUMBER_OF_MEDIA_2 + y_pos
  const indexAlpha = ANIM_DELAY + opacityNumber / OPACITY_NUMBER_MAX * 2

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

    if (opacityAlpha < 1) {
      const scale = (1 + (1 - opacityAlpha) * .1) / (isSphere ? 2 : 1)

      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  const {
    play,
    playBackward
  } = useAnimation<number>({
    startValue: 1,
    endValue: 1.09,
    duration: .11,
    onChange: value => {
      if (meshRef.current) {
        const scale = isSphere ? value / 2 : value
        meshRef.current.scale.set(scale, scale, scale)
      }
    }
  })

  useEffect(() => {
    if (hovered)
      play()
    else
      playBackward()
  }, [hovered])

  const mousePointerProps = useMousePointerOnHover()

  return isSphere ?
    <Sphere
      ref={meshRef}
      position={position2}
      onClick={() => router.push(`/architects`)}
      {...mousePointerProps}
      userData={{ id }}
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
      userData={{ id }}
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
