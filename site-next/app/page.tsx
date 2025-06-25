'use client'

import useContentful from './lib/hooks/useContentful'
import Main from './Main'


const Page = () => {
  const { data: contentful } = useContentful()

  if (!contentful)
    return <></>

  const { medias } = contentful

  return (
    <Main medias={medias} />
  )
}


export default Page
