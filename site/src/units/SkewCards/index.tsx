import { FC, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import generatePath from '../../utils/generatePath'
import envMapSource from '../../utils/envMapSource'
import PlaneMaterial from '../PlaneMaterial'
import { ContentfulDataType, ContentfulFile } from '../../types/contentful.type'
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
  const emptyCard = {
    url: '/',
    img: contentful.architects[1].avatar.file.url
  }
  const emptyCards4 = [emptyCard, emptyCard, emptyCard, emptyCard]
  const cards = sections.flatMap(section => {
    if (!section.contentfulKey)
      return emptyCards4
    const sectionData = contentful?.pages.find(page => page.url === section.contentfulKey)
    // const entries = contentful[section.contentfulKey as 'materials' | 'medias' | 'architects']
    const entries = sectionData?.cards || []
    const imageKey = section.contentfulKey === 'medias' ? 'thumbnail' : 'avatar'
    const cards = entries.slice(0, 4).map(entry => ({
      url: entry.url,
      img: ((entry as any)[imageKey] as ContentfulFile)?.file.url || contentful.architects[1].avatar.file.url
    }))
    const cards4 = [
      ...cards,
      ...emptyCards4.slice(-cards.length),
    ]

    return cards4
  })
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()
  // const scrollPosRef = useRef(0)

  useFrame(threeState => {
    const group = groupRef.current

    if (!group)
      return

    // const scrollPos = scroll.range(0, 1)
    const scrollPos = (scroll.range(0, 1) - .5 / sections.length) * (sections.length + 1) / sections.length
    // scrollPosRef.current = scrollPos

    group.position.setY(scrollPos * 96 - 93.5)
    group.rotation.set(
      group.rotation.x,
      scrollPos * cards.length / 4 * Math.PI * 2,
      group.rotation.z
    )
  })

  return (
    <group ref={groupRef}>
      {cards.map((card, cardIndex) => {
        const rotationY = Math.PI / 2 * cardIndex + Math.PI / 2
        // const opacity = Math.abs(scrollPosRef.current * cards.length - cardIndex) / cards.length  / cards.length * 4
        const opacity = 1

        return (
          <group
            key={cardIndex}
            rotation={[0, rotationY, 0]}
          >
            <group
              position={[0, cardIndex * 2, 4.5]}
            >
              <SkewCardsRenderOne
                {...card}
                opacity={opacity}
              />
            </group>
          </group>
        )
      }
      )}
    </group>
  )
}


export default SkewCards
