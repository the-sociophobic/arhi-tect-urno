import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import Scene from './components/Scene'
import QueryWrapper from './components/QueryWrapper'
import Background from './components/Background'
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import { Store } from './components/Store/Store'
import { StoreProvider } from './components/Store/StoreProvider'

import './assets/styles/index.sass'


const App: FC = () => {
  const store = new Store()

  return (
    <QueryWrapper>
      <StoreProvider store={store}>
        <AppInners />
      </StoreProvider>
    </QueryWrapper>
  )
}


export default App


const AppInners: FC = observer(() => {
  return (
    <div className='App'>
      <Background />
      <Header />
      {/* <Scene /> */}
      <div className='content'>
        a
      </div>
      <Footer />
    </div>
  )
})
