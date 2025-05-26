'use client'

import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
import * as THREE from 'three'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Box, Sphere, Environment } from '@react-three/drei'

import useMousePointerOnHover from '../../hooks/useMousePointerOnHover'
import generatePath from '../../utils/generatePath'

const envMapSource = generatePath('/three/studio_1k_bw.hdr')
const texturePath = generatePath('/three/architect_main.png')

const NUMBER_OF_MEDIA = 11
const NUMBER_OF_MEDIA_2 = 4
const WIDTH = 16
const LEFT_OFFSET = WIDTH / -2
const HEIGHT = 5.5
const TOP_OFFSET = HEIGHT / 2 - .75
const OPACITY_NUMBER_MAX = NUMBER_OF_MEDIA * NUMBER_OF_MEDIA_2
const TIME_OFFSET = .7


const Main: FC = () => {
  const router = useRouter()
  
  const groupRef = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, texturePath)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.5, 1.5)
  texture.offset.set(-.015, .5)

  const envMap = useLoader(RGBELoader, envMapSource)
  const [time, setTime] = useState(0)

  useFrame(threeState => {
    setTime(threeState.clock.elapsedTime)

    if (groupRef.current) {
      // const scaledTime = threeState.clock.elapsedTime / 50
      // const alpha = scaledTime - Math.floor(scaledTime)
      // groupRef.current.rotation.set(
      //   0,
      //   alpha * Math.PI * 2,
      //   0
      // )
    }
  })

  const media = Array(NUMBER_OF_MEDIA).fill({
    photo: ''
  })
  const media2 = Array(NUMBER_OF_MEDIA_2).fill({
    photo: ''
  })

  // const router = useRouter()
  const [currentHovered, setCurrentHovered] = useState('')

  const mousePointerProps = useMousePointerOnHover()

  // const { clock } = useThree()
  // const data = useScroll()

  return (
    <>
      <Environment files={envMapSource} />
      <ambientLight intensity={3} />
      <group
      // scale={[.7, .7, .7]}
      // rotation={[.3, 0, -.3]}
      >
        <group
          ref={groupRef}
        >
          {media.map((mediaEntry, mediaEntryIndex) => {
            const alpha = mediaEntryIndex / NUMBER_OF_MEDIA
            const position = [
              LEFT_OFFSET + alpha * WIDTH,
              Math.sin(alpha * Math.PI * 4 + 1) * 1,
              0
            ] as [number, number, number]
            // const rotation = mediaEntryIndex / NUMBER_OF_MEDIA * Math.PI * 2

            return (
              <group
                key={mediaEntryIndex}
                position={position}
              // rotation={[0, rotation, 0]}
              >
                {media2.map((media2Entry, media2EntryIndex) => {
                  const alpha = media2EntryIndex / NUMBER_OF_MEDIA_2
                  const position2 = [
                    0,
                    TOP_OFFSET - alpha * HEIGHT,
                    0
                  ] as [number, number, number]
                  const key = `${mediaEntryIndex}_${media2EntryIndex}`
                  const hovered = key === currentHovered

                  const opacityNumber = mediaEntryIndex * NUMBER_OF_MEDIA_2 + media2EntryIndex
                  const indexAlpha = opacityNumber / OPACITY_NUMBER_MAX * 2
                  const opacityAlpha = time < indexAlpha ?
                    0
                    :
                    time < (indexAlpha + TIME_OFFSET) ?
                      (time - indexAlpha) / TIME_OFFSET
                      :
                      1

                  const scale = (1 + (1 - opacityAlpha) * .2) * (hovered ? 1.1 : 1)

                  return media2EntryIndex % 2 ? (
                    <Box
                      key={key}
                      scale={[scale, scale, scale]}
                      position={position2}
                      onClick={() => router.push(`/architects`)}
                      onPointerEnter={() => setCurrentHovered(key)}
                      onPointerLeave={() => setCurrentHovered('')}
                      {...mousePointerProps}
                    >
                      <meshStandardMaterial
                        transparent={true}
                        opacity={opacityAlpha}
                        map={texture}
                        envMap={envMap}
                      // reflectivity={.5}
                      // refractionRatio={0.95}
                      />
                    </Box>
                  ) : (
                    <Sphere
                      key={key}
                      scale={[scale / 2, scale / 2, scale / 2]}
                      position={position2}
                      onClick={() => router.push(`/architects`)}
                      onPointerEnter={() => setCurrentHovered(key)}
                      onPointerLeave={() => setCurrentHovered('')}
                      {...mousePointerProps}
                    >
                      <meshStandardMaterial
                        transparent={true}
                        opacity={opacityAlpha}
                        map={texture}
                        envMap={envMap}
                      // reflectivity={.5}
                      // refractionRatio={0.95}
                      />
                    </Sphere>
                  )
                }
                )}
              </group>
            )
          }
          )}
        </group>
      </group>
    </>
  )
}


export default Main
