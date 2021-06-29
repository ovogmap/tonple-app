import { Dispatch } from 'react'
import PostType from './interface/post.interface'

export type State = {
  posts: PostType[]
  keyword: string
  page: number
  type: string
}

export const initial_state: State = {
  posts: [],
  keyword: '',
  page: 0,
  type: 'a',
}

export type Actions =
  | { type: 'RESER' }
  | { type: 'SET_POSTS'; payload: PostType[] }
  | { type: 'ADDITIONAL_POSTS'; payload: PostType[] }
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'INCREASE_PAGE' }
  | { type: 'RESET_PAGE' }
  | { type: 'SET_TYPE'; payload: string }

export type DispatchType = Dispatch<Actions>

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'RESER':
      return initial_state

    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      }

    case 'ADDITIONAL_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      }

    case 'SET_KEYWORD':
      return {
        ...state,
        keyword: action.payload,
      }

    case 'INCREASE_PAGE':
      return {
        ...state,
        page: state.page + 1,
      }

    case 'RESET_PAGE':
      return {
        ...state,
        page: 0,
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
