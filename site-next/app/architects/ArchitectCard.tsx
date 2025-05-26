import Link from 'next/link'
import { FC } from 'react'

import ImageCropped from '../lib/components/ImageCropped'
import { ContentfulArchitectType } from '../lib/types/contentful.type'


const ArchitectCard: FC<ContentfulArchitectType> = ({
  id,
  name,
  avatar,
  url,
  company
}) => {
  return (
    <div className='col-2'>
      <Link href={`/architects/${url}`}>
        <div className='ArchitectCard'>
          <div className='ArchitectCard__Image-container'>
            <ImageCropped
              src={avatar?.file?.url}
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
