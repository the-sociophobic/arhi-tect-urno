import { FC } from 'react'

import { Environment, ScrollControls } from '@react-three/drei'

import ScrolledScene from './ScrolledScene'
import { CameraControls } from './CameraControls'
import generatePath from '../utils/generatePath'
import envMapSource from '../utils/envMapSource'
import sections from '../components/Header/sections'
import Cards from './Cards'
import ScrollHandler from './ScrollHandler'


const SceneObjects: FC = () => {
  return (
    <ScrollControls pages={sections.length}>
      <Environment files={generatePath(envMapSource)} />
      {/* <rectAreaLight position={[0, 15, -15]} intensity={100} width={10} height={10} /> */}
      <ambientLight intensity={3} />
      {/* <UniformsState /> */}
      <ScrolledScene />
      <CameraControls />
      <Cards />
      <ScrollHandler />
    </ScrollControls>
  )
}


export default SceneObjects
