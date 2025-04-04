import { FC } from 'react'

import { Environment, ScrollControls } from '@react-three/drei'

import UniformsState from '../units/UniformsState'
import ScrolledScene from './ScrolledScene'
import { CameraControls } from './CameraControls'
import generatePath from '../utils/generatePath'


const SceneObjects: FC = () => {
  return (
    <ScrollControls pages={3}>
      <Environment files={generatePath('/hdri/envMap.hdr')} />
      <UniformsState />
      <ScrolledScene />
      <CameraControls />
    </ScrollControls>
  )
}


export default SceneObjects
