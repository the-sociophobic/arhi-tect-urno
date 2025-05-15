import { FC } from 'react'

import AppLayout from './pages/lib/components/AppLayout'

import './assets/style.sass'


const App: FC = () => {
  const path = window.location.pathname
  const page = ''
  
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}


export default App
