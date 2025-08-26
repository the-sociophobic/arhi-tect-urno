import { FC } from 'react'
import { connection } from 'next/server'

import Sphere from './Sphere'


export type PageProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>
}

const Page: FC<PageProps> = async ({
  searchParams
}) => {
  await connection()
  const customVideoURL = (await searchParams)?.video
  const customEmpty = (await searchParams)?.empty
  const randomVideoURL = `/three/video/${1 + Math.round(Math.random() * 2)}.mp4`

  return <Sphere
    customVideoURL={customVideoURL as string | undefined}
    randomVideoURL={randomVideoURL}
    customEmpty={(customEmpty as string | undefined) || '1'}
  />
}


export default Page
