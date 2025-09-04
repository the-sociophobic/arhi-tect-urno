import { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../Store/StoreContext'
import sections from '../Header/sections'
import { isMobile } from 'react-device-detect'
import useContentful from '../../hooks/useContentful'


const Footer: FC = observer(() => {
  const { store } = useContext(StoreContext)
  const {
    sectionIndex
  } = store
  const { data: contentful } = useContentful()
  const section = sections[sectionIndex]
  const sectionData = contentful?.pages.find(page => page.url === section.contentfulKey)

  return (
    <div className='Footer'>
      <div className='container'>
        <div className='row'>
          <div className='col px-3 px-md-0 col-md-3'>
            {/* <h1 className={`${isMobile ? 'h2 mb-5' : 'h1'} text-center text-uppercase`}>
              {section.label}
            </h1> */}
            <div className='Footer__title'>
              {sectionData?.title || 'Заголовок'}
            </div>
            <div className='Footer__description'>
              {sectionData?.description || 'Добро пожаловать в «Архитектурно» — медиа-платформу, выросшую на пересечении строительного бизнеса, искусства и глубоких человеческих разговоров. Далее вы увидите навигатор,  который поможет найти нужный выпуск или открыть для себя нового героя.'}
            </div>
            <a href={sectionData?.tildaUrl || 'https://kiss-graph.com'} style={{ textDecoration: 'none' }}>
              <div className='Footer__button'>
                Продолжить
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})


export default Footer
