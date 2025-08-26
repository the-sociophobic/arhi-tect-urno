'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'

import MagicSphere from '../lib/components/Three/MagicSphere'
import ThreeScene from '../lib/components/Three/ThreeScene'
import generatePath from '../lib/utils/generatePath'

import playSvgSrc from '../lib/assets/images/play.svg'


const Sphere: FC<{
  randomVideoURL: string
  customVideoURL?: string
  customEmpty?: string
}> = ({
  randomVideoURL,
  customVideoURL,
  customEmpty
}) => {
    const [showPlay, setShowPlay] = useState(false)

    useEffect(() => {
      const video = document.getElementById('video');
      try {
        (video as HTMLVideoElement)?.play?.()
      } catch (err) {
        console.log('video error')
        console.log(err)
        setShowPlay(true)
      }
    }, [])

    const [videoLoaded, setVideoLoaded] = useState(false)

    const play = () => {
      const video = document.getElementById('video');
      (video as HTMLVideoElement)?.play?.()
      setShowPlay(false)
    }

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
              {/* {videoLoaded && */}
              <ThreeScene className='Architects__Three'>
                <MagicSphere
                  loaded={videoLoaded}
                  play={play}
                  emptyTexturePath={`/hints/empty${customEmpty || 1}.jpg`}
                />
              </ThreeScene>
              {/* } */}
            </div>
          </div>
        </div>
        {/* {showPlay &&
          <div
            className='position-fixed'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          >
            <Image
              src={playSvgSrc}
              alt='logo'
            />
          </div>
        } */}
      </>
    )
  }


export default Sphere
