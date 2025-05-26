'use client'

import { useState } from 'react'

import architects from '../architects/list'
import ImageCropped from '../lib/components/ImageCropped'
import ThreeScene from '../lib/components/Three/ThreeScene'
import Clock from '../lib/components/Three/Clock'
import { ScrollControls } from '@react-three/drei'


const Page = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(-1)
  const currentEvent = architects[currentEventIndex]

  return (
    <div className='About h-100'>
      <div className={`About__background ${currentEventIndex === -1 && 'About__background--hidden'}`}>
        {/* {currentEvent &&
          <ImageCropped
            src={currentEvent.photo}
            className='abs-cover'
          />
        } */}
      </div>
      <ThreeScene
        className='abs-cover'
        orthographic={false}
      >
        <ScrollControls pages={5}>
          <Clock
            currentEventIndex={currentEventIndex}
            setCurrentEventIndex={setCurrentEventIndex}
          />
        </ScrollControls>
      </ThreeScene>
    </div>
  )
}


export default Page
