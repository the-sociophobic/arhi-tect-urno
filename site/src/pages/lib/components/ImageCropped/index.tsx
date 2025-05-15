'use client'

import Image, { StaticImageData } from 'next/image'
import { FC, useRef, useState } from 'react'

import './index.sass'


export type ImageCroppedProps = {
  className?: string
  src: string | StaticImageData
  alt?: string
}


const ImageCropped: FC<ImageCroppedProps> = ({
  className,
  src,
  alt
}) => {
  const [portrait, setPortrait] = useState<boolean | undefined>(undefined)
  const containerRef: any = useRef(null)
  const imageRef: any = useRef(null)

  const setOrientation = () => {
    const container = containerRef.current
    const image = imageRef.current
    
    if (!container || !image)
      return

    const isPortrait = container.offsetWidth / container.offsetHeight > image.width / image.height

    setPortrait(isPortrait)
  }

  return (
    <div
      ref={containerRef}
      className={`
        ImageCropped
        ${className}
        ${typeof portrait === 'undefined' && 'ImageCropped--hidden'}
      `}
    >
      <Image
        ref={imageRef}
        className={`
          ImageCropped__Image
          ImageCropped__Image--${portrait ? 'portrait' : 'landscape'}
        `}
        src={src}
        alt={alt || ''}
        onLoad={setOrientation}
      />
    </div>
  )
}


export default ImageCropped
