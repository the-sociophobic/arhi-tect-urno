import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'

import { ArchitectType } from '../lib/types/default.types'
import ImageCropped from '../lib/components/ImageCropped'


const ArchitectCard: FC<ArchitectType> = ({
  id,
  name,
  photo,
  href,
  company
}) => {
  return (
    <div className='col-2'>
      <Link href={`/architects/${href}`}>
        <div className='ArchitectCard'>
          <div className='ArchitectCard__Image-container'>
            <ImageCropped
              src={photo}
              className='ArchitectCard__Image'
            />
          </div>
          <div className='ArchitectCard__id'>
            {id}
          </div>
          <div className='ArchitectCard__name'>
            {name}
          </div>
          <div className='ArchitectCard__company'>
            {company}
          </div>
        </div>
      </Link>
    </div>
  )
}


export default ArchitectCard
