import { makeAutoObservable } from 'mobx'

import { IStore } from './store.interface'
import getScrolledDiv from '../../utils/getScrolledDiv'


export class Store implements IStore {
  constructor() {
    makeAutoObservable(this)
    this.sectionIndex = 0
  }

  // @observable accessor sectionIndex: number;
  sectionIndex: number
  // @action setSectionIndex = (sectionIndex: number) => {
  setSectionIndex = (sectionIndex: number) => {
    this.sectionIndex = sectionIndex
  }
  setScroll = (sectionIndex: number) => {
    const scrolledDiv = getScrolledDiv()

    if (scrolledDiv) {
      scrolledDiv.scrollTop = scrolledDiv.clientHeight * sectionIndex
    }
  }
}
