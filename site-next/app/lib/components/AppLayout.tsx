'use client'

import { FC, ReactNode } from 'react'

import Header from './Header'
import isProd from '../utils/isProd'
// import { FooterCSR } from './Footer'
// import LoaderSelfHandled from './LoaderSelfHandled'


export type AppLayoutProps = {
  children: ReactNode
}


const AppLayout: FC<AppLayoutProps> = ({
  children
}) => {
  return (
    <div className='App'>
      <div
        className='content'
      >
        {!isProd() && <Header />}
        {children}
        {/* <FooterCSR /> */}
      </div>
      {/* <LoaderSelfHandled /> */}
    </div>
  )
}


export default AppLayout
