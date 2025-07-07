import { action, makeAutoObservable, observable } from 'mobx'

import { IStore } from './store.interface'


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
}
