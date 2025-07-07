export interface IStore {
  readonly sectionIndex: number
  setSectionIndex: (sectionIndex: number) => void
  setScroll: (sectionIndex: number) => void
}
