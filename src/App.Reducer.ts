import { Dispatch } from 'react'

export type State = {
  posts: any[]
  Keyword: string
  page: number
}

export const initial_state: State = {
  posts: [],
  Keyword: '',
  page: 1,
}

export type Actions = { type: 'RESER' } | { type: 'SET_POSTS'; payload: any[] }

export type DispatchType = Dispatch<Actions>

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'RESER':
      return initial_state

    case 'SET_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      }

    default:
      return state
  }
}
