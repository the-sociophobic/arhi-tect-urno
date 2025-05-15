import { FC, ReactNode } from 'react'

import Header from './Header'
import { StoreProvider } from '../hooks/useStore/StoreProvider'
// import { FooterCSR } from './Footer'
// import LoaderSelfHandled from './LoaderSelfHandled'


export type AppLayoutProps = {
  children: ReactNode
}


const AppLayout: FC<AppLayoutProps> = ({
  children
}) => {
  return (
    <StoreProvider>
      <div className='App'>
        <div
          className='content'
        >
          <Header />
          {children}
          {/* <FooterCSR /> */}
        </div>
        {/* <LoaderSelfHandled /> */}
      </div>
    </StoreProvider>
  )
}


export default AppLayout
