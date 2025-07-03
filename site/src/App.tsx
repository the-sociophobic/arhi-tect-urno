import { FC } from 'react'

import Scene from './components/Scene'
import QueryWrapper from './components/QueryWrapper'

import './assets/style.sass'


const App: FC = () => {
  return (
    <QueryWrapper>
      <div className='App'>
        <Scene />
      </div>
    </QueryWrapper>
  )
}


export default App
