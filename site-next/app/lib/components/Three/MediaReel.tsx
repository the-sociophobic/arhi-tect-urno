'use client'

import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import * as THREE from 'three'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useLoader } from '@react-three/fiber'
import { Box, Environment } from '@react-three/drei'

import useMousePointerOnHover from '../../hooks/useMousePointerOnHover'
import generatePath from '../../utils/generatePath'
import useContentful from '../../hooks/useContentful'
import { MaterialsRenderOneData } from './Materials/Types'
import { MaterialsRenderOne } from './Materials/RenderOne'

const envMapSource = generatePath('/three/studio_1k_bw.hdr')
const texturePath = generatePath('/three/architect_main.png')
const NUMBER_OF_MEDIA = 29


const MediaReel: FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, texturePath)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.5, 1.5)
  texture.offset.set(-.015, .5)

  const envMap = useLoader(RGBELoader, envMapSource)

  useFrame(threeState => {
    if (groupRef.current) {
      const scaledTime = threeState.clock.elapsedTime / 50
      const alpha = scaledTime - Math.floor(scaledTime)
      groupRef.current.rotation.set(
        0,
        alpha * Math.PI * 2,
        0
      )
    }
  })

  // const router = useRouter()
  const [currentHovered, setCurrentHovered] = useState(-1)

  const mousePointerProps = useMousePointerOnHover()

  const { data: contentful } = useContentful()

  if (!contentful)
    return <></>

  const { medias } = contentful
  const mappedMedia = medias.map(media => ({
    material: {
      id: media.id,
      src: media.thumbnail.file.url,
      materialIndex: 0
    },
    opacity: .8
  } as MaterialsRenderOneData))

  return (
    <>
      <Environment files={envMapSource} />
      <ambientLight intensity={3} />
      <group
        scale={[.7, .7, .7]}
        rotation={[.3, 0, -.3]}
      >
        <group
          ref={groupRef}
        >
          {mappedMedia.map((mediaEntry, mediaEntryIndex) => {
            const rotation = mediaEntryIndex / medias.length * Math.PI * 2

            return (
              <group
                key={mediaEntryIndex}
                rotation={[0, rotation, 0]}
              >
                <Box
                  scale={[2, 1.25, .01]}
                  position={[currentHovered ? 4.5 : 4, 0, 0]}
                  // onClick={() => router.push(`/media-${mediaEntryIndex}`)}
                  // onPointerEnter={() => setCurrentHovered(mediaEntryIndex)}
                  // onPointerLeave={() => setCurrentHovered(-1)}
                  {...mousePointerProps}
                >
                  <MaterialsRenderOne {...mediaEntry} />
                  {/* <meshStandardMaterial
                    map={texture}
                    envMap={envMap}
                  // reflectivity={.5}
                  // refractionRatio={0.95}
                  /> */}
                </Box>
              </group>
            )
          }
          )}
        </group>
      </group>
    </>
  )
}


export default MediaReel
