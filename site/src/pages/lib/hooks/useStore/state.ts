export type StateType = {

}


export type initializerFnType = (
  partial: StateType | Partial<StateType> | ((state: StateType) => StateType | Partial<StateType>),
  replace?: false | undefined
) => void


export const initializer = (set: initializerFnType) => ({

})
