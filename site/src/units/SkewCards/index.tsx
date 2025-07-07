import { FC, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import generatePath from '../../utils/generatePath'
import envMapSource from '../../utils/envMapSource'
import PlaneMaterial from '../PlaneMaterial'
import { ContentfulDataType } from '../../types/contentful.type'
import sections from '../../components/Header/sections'
import SkewCardsRenderOne from './RenderOne'
import { useScroll } from '@react-three/drei'


export type SkewCardsProps = {
  contentful: ContentfulDataType
}


const SkewCards: FC<SkewCardsProps> = ({
  contentful
}) => {
  // const envMap = useLoader(RGBELoader, generatePath(envMapSource))
  // envMap.mapping = THREE.EquirectangularReflectionMapping
  // console.log(contentful)
  const pic = contentful.architects[1].avatar.file.url
  const cards = sections.flatMap(section => [pic, pic, pic, pic])
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()

  useFrame(threeState => {
    const group = groupRef.current

    if (!group)
      return

    const scrollPos = scroll.range(0, 1)

    group.position.setY(scrollPos * 3 - 10)
    group.rotation.set(
      group.rotation.x,
      scrollPos * cards.length / 4 * Math.PI * 2,
      group.rotation.z
    )
  })

  return (
    <group ref={groupRef}>
      {cards.map((cardImg, cardIndex) => {
        const rotationY = Math.PI / 2 * cardIndex + Math.PI / 2

        return (
          <group
            rotation={[0, rotationY, 0]}
          >
            <group
              position={[0, cardIndex, 4.5]}
            >
              <SkewCardsRenderOne pic={cardImg} />
            </group>
          </group>
        )
      }
      )}
    </group>
  )
}


export default SkewCards
