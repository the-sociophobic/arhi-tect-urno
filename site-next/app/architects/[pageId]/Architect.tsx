'use client'

import { PageProps } from '@/app/lib/types/default.type'
import architects from '../list'
import ImageCropped from '@/app/lib/components/ImageCropped'
import useContentful from '@/app/lib/hooks/useContentful'
import { FC } from 'react'


export type ArchitectProps = {
  pageId: string
}


const Architect: FC<ArchitectProps> = ({ pageId }) => {
  const { data: contentful } = useContentful()

  if (!contentful)
    return <></>

  const { architects } = contentful

  const currentArchitect = architects.find(architect => architect.url === pageId)

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <ImageCropped
            src={currentArchitect!.avatar?.file?.url}
            className=''
          />
          <div className=''>
            {currentArchitect!.name}
          </div>
          <div className=''>
            {currentArchitect!.company}
          </div>
          <div className=''>
            {currentArchitect!.description}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Architect
