import { FC } from 'react'

import { Environment, ScrollControls } from '@react-three/drei'

import ScrolledScene from './ScrolledScene'
import { CameraControls } from './CameraControls'
import generatePath from '../utils/generatePath'
import envMapSource from '../utils/envMapSource'
import sections from '../components/Header/sections'
import Cards from './Cards'
import ScrollHandler from './ScrollHandler'
import GlossySphere from './GlossySphere'
import SkewCards from './SkewCards/index'
import useContentful from '../hooks/useContentful'


const SceneObjects: FC = () => {
  const { data: contentful } = useContentful()

  return (
    <ScrollControls pages={sections.length}>
      <Environment files={generatePath(envMapSource)} />
      {/* <rectAreaLight position={[0, 15, 0]} intensity={1000} width={10} height={10} /> */}
      <pointLight position={[5, 5, 5]} intensity={5} color={'#FFFFFF'}/>
      <pointLight position={[-5, -5, 5]} intensity={10} color={'#FFFFFF'}/>
      {/* <ambientLight intensity={3} /> */}
      {/* <UniformsState /> */}
      {/* <ScrolledScene /> */}
      <CameraControls />
      {/* <Cards /> */}
      <GlossySphere />
      {contentful && <SkewCards contentful={contentful} />}
      <ScrollHandler />
    </ScrollControls>
  )
}


export default SceneObjects
