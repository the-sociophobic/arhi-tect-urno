import { FC } from 'react'

import Scene from './components/Scene'
import QueryWrapper from './components/QueryWrapper'

import './assets/style.sass'
import Background from './components/Background'


const App: FC = () => {
  return (
    <QueryWrapper>
      <div className='App'>
        <Background />
        {/* <Scene /> */}
      </div>
    </QueryWrapper>
  )
}


export default App
