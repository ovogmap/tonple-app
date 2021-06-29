import { createContext, useContext } from 'react'
import { DispatchType, initial_state, State } from './App.Reducer'

export const StateContext = createContext<State>(initial_state)
export const DispatchContext =
  createContext<DispatchType | undefined>(undefined)

export function useStateContext(): State {
  return useContext(StateContext)
}

export function useDispatchContext(): DispatchType {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) {
    throw new Error('GlobalDispatch context was not provided')
  }

  return dispatch
}
