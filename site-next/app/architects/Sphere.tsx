'use client'

import { FC, useEffect, useState } from 'react'
import MagicSphere from '../lib/components/Three/MagicSphere'
import ThreeScene from '../lib/components/Three/ThreeScene'
import generatePath from '../lib/utils/generatePath'


const Sphere: FC<{
  randomVideoURL: string
  customVideoURL?: string
}> = ({
  randomVideoURL,
  customVideoURL
}) => {
  useEffect(() => {
    const video = document.getElementById('video');
    (video as HTMLVideoElement)?.play?.()
  }, [])

  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <>
      <video
        className='d-none'
        id='video'
        loop
        muted
        playsInline
        crossOrigin='anonymous'
        onPlay={e => setVideoLoaded(true)}
      >
        <source
          src={customVideoURL || generatePath(randomVideoURL)}
          // resource=''
        />
      </video>

      <div className='row'>
        <div className='col mb-5'>
          <div className='Architects__Three-container'>
            {videoLoaded &&
              <ThreeScene className='Architects__Three'>
                <MagicSphere />
              </ThreeScene>
            }
          </div>
        </div>
      </div>
    </>
  )
}


export default Sphere
