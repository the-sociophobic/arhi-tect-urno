import { FC } from 'react'

import { Environment, ScrollControls } from '@react-three/drei'

import UniformsState from '../units/UniformsState'
import ScrolledScene from './ScrolledScene'
import { CameraControls } from './CameraControls'
import generatePath from '../utils/generatePath'
import envMapSource from '../utils/envMapSource'
import Cards from './Cards'


const SceneObjects: FC = () => {
  return (
    <ScrollControls pages={3}>
      <Environment files={generatePath(envMapSource)} />
      {/* <rectAreaLight position={[0, 15, -15]} intensity={100} width={10} height={10} /> */}
      <ambientLight intensity={3} />
      <UniformsState />
      <ScrolledScene />
      <CameraControls />
      <Cards />
    </ScrollControls>
  )
}


export default SceneObjects
