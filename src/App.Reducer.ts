import { Dispatch } from 'react'
import PostType from './interface/post.interface'

interface Indexing {
  [key: string]: any
}
export interface State extends Indexing {
  aPosts: PostType[]
  bPosts: PostType[]
  sPosts: PostType[]
  aPage: number
  bPage: number
  sPage: number
  keyword: string
  type: string
}

export const initial_state: State = {
  aPosts: [],
  bPosts: [],
  sPosts: [],
  aPage: 0,
  bPage: 0,
  sPage: 0,
  keyword: '',
  type: 'a',
}

export type Actions =
  | { type: 'RESER' }
  | { type: 'SET_POSTS'; payload: { type: string; value: PostType[] } }
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'INCREASE_PAGE'; payload: string }
  | { type: 'RESET_PAGE'; payload: string }
  | { type: 'SET_TYPE'; payload: string }

export type DispatchType = Dispatch<Actions>

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'RESER':
      return initial_state

    case 'SET_POSTS':
      return {
        ...state,
        [action.payload.type]: [
          ...state[action.payload.type],
          ...action.payload.value,
        ],
      }

    case 'SET_KEYWORD':
      return {
        ...state,
        keyword: action.payload,
      }

    case 'INCREASE_PAGE':
      return {
        ...state,
        [`${action.payload}Page`]: state[`${action.payload}Page`] + 1,
      }

    case 'RESET_PAGE':
      return {
        ...state,
        [`${action.payload}Page`]: 0,
      }

    case 'SET_TYPE':
      return {
        ...state,
        type: action.payload,
      }

    default:
      return state
  }
}
