import { FC, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../components/Store/StoreContext'
import sections from '../components/Header/sections'


const ScrollHandler: FC = observer(() => {
  const scroll = useScroll()
  const { store } = useContext(StoreContext)
  const { sectionIndex, setSectionIndex } = store

  useFrame(threeState => {
    const newSectionIndex = Math.min(Math.round(scroll.range(0, .99999) * sections.length), sections.length - 1)

    if (newSectionIndex !== sectionIndex)
      setSectionIndex(newSectionIndex)
  })

  return (
    <></>
  )
})


export default ScrollHandler
