'use client'

import { FC, useRef } from 'react'
import * as THREE from 'three'
import { Box, Sphere, Environment, useScroll } from '@react-three/drei'

import useContentful from '@/app/lib/hooks/useContentful'
import { MainRenderOne } from './RenderOne'
import generatePath from '@/app/lib/utils/generatePath'
import { useFrame } from '@react-three/fiber'
import useAnimation from '../useAnimation'
import { ANIM_DELAY } from './consts'
import RaycasterRender from '../Render'


const envMapSource = generatePath('/three/studio_1k_bw.hdr')

const NUMBER_OF_MEDIA = 11
const NUMBER_OF_MEDIA_2 = 4
const WIDTH = 16
const LEFT_OFFSET = WIDTH / -2


const MainRender: FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const media1 = Array(NUMBER_OF_MEDIA).fill({
    photo: ''
  })
  const media2 = Array(NUMBER_OF_MEDIA_2).fill({
    photo: ''
  })

  const { data: contentful } = useContentful()

  const scroll = useScroll()
  const {
    play,
    state
  } = useAnimation<number>({
    startValue: .7,
    endValue: 1.2,
    duration: 3,
    onChange: value => {
      groupRef.current?.scale.set(value, value, value)
    }
  })
  useFrame((threeState) => {
    if (threeState.clock.elapsedTime > ANIM_DELAY && state.current === 'start') {
      play()
    }
    if (threeState.clock.elapsedTime > ANIM_DELAY + 3) {
      const groupScale = scroll.range(0, 1) + 1.2
      groupRef.current?.scale.set(groupScale, groupScale, groupScale)
    }
  })

  if (!contentful)
    return <></>

  const { medias } = contentful

  return (
    <>
      <RaycasterRender />
      <Environment files={envMapSource} />
      <ambientLight intensity={3} />
      <group
        ref={groupRef}
      >
        {media1.map((media, mediaIndex) => {
          const alpha = mediaIndex / NUMBER_OF_MEDIA
          const position = [
            LEFT_OFFSET + alpha * WIDTH,
            Math.sin(alpha * Math.PI * 4 + 1) * 1,
            0
          ] as [number, number, number]
          // const rotation = mediaIndex / NUMBER_OF_MEDIA * Math.PI * 2

          return (
            <group
              key={mediaIndex}
              position={position}
            // rotation={[0, rotation, 0]}
            >
              {media2.map((media2Entry, media2EntryIndex) => {
                const index_of_media = (mediaIndex * NUMBER_OF_MEDIA + media2EntryIndex) % medias.length
                const media = medias[index_of_media]
                return (
                  <MainRenderOne
                    key={media.id}
                    media={media}
                    x_pos={mediaIndex}
                    y_pos={media2EntryIndex}
                    isSphere={!!(index_of_media % 2)}
                  />
                )
              }
              )}
            </group>
          )
        }
        )}
      </group>
    </>
  )
}


export { MainRender }
