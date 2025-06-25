'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { ContentfulMediaType } from './lib/types/contentful.type'
import Img from './lib/components/Img'


export type MainProps = {
  medias: ContentfulMediaType[]
}


const Main: FC<MainProps> = ({
  medias
}) => {
  const [appear, setAppear] = useState(false)

  useEffect(() => {
    setAppear(true)
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentScroll, setCurrentScroll] = useState(0)
  useEffect(() => {
    const scrollArea = scrollRef.current

    if (!scrollArea)
      return

    scrollArea.addEventListener('scroll', e => {
      const { scrollTop, clientHeight } = e.target as HTMLElement

      setCurrentScroll(Math.round(scrollTop / clientHeight / 2 * 1000) / 10)
    })
  }, [scrollRef])

  return (
    <div className='Main'>
      <div
        className={`Main__container ${appear && 'Main__container--appear'}`}
      >
        <div
          className='d-flex flex-row'
          style={{ transform: `scale(${1 + currentScroll / 300})` }}
        >
          <p className='Main__h1--gray no-select'>
            АРХИТЕКТУР
          </p>
          <p className='Main__h1--yellow no-select'>
            НО
          </p>
        </div>
      </div>
      <div className='abs-cover d-flex flex-row flex-wrap align-items-center'>
        {medias.map(media =>
          <Img
            crop
            className='Main__media m-1 cursor-pointer'
            key={media.id}
            src={media.thumbnail.file.url}
          />
        )}
      </div>
      <div
        ref={scrollRef}
        className='Main__scroll__container'
      >
        <div className='Main__scroll' />
      </div>
    </div>
  )
}


export default Main
