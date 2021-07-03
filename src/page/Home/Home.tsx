import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

import { Section, Header } from '../../components/Home'
import fetchPosts from '../../api/fetchPosts'
import fetchSearchPost from '../../api/fetchSearchPost'

import { useDispatchContext, useStateContext } from '../../App.Context'
import { useDebouncing } from '../../hooks'

export default function Home(): React.ReactElement {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  // 디바운싱 커스텀 훅
  const debouncing = useDebouncing()

  const [isFocus, setIsFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // input focus 이벤트.
  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleBlur = () => {
    setIsFocus(false)
  }

  // 탭 클릭 이벤트
  const handleTabChange = (value: string) => {
    if (value === state.type) return
    dispatch({ type: 'SET_TYPE', payload: value })
  }

  // posts 검색 요청
  const searchPosts = useCallback(
    async (value: string, page: number) => {
      try {
        const res = await fetchSearchPost(state.type, page, value).then(
          (v) => v.data
        )
        dispatch({
          type: 'SET_POSTS',
          payload: { type: 'sPosts', value: res },
        })
        dispatch({ type: 'INCREASE_PAGE', payload: 's' })
      } catch (e) {
        console.log(e)
      }
    },
    [state, dispatch]
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch({ type: 'SET_KEYWORD', payload: value })
    dispatch({
      type: 'RESET_POSTS',
      payload: 'sPosts',
    })
    dispatch({ type: 'RESET_PAGE', payload: 's' })
    debouncing(() => searchPosts(value, 0), 150)
  }

  // post data 요청
  const handleFetchPosts = useCallback(async () => {
    try {
      const res = await fetchPosts(state.type, state[`${state.type}Page`]).then(
        (v) => v.data
      )
      dispatch({
        type: 'SET_POSTS',
        payload: { type: `${state.type}Posts`, value: res },
      })
      dispatch({ type: 'INCREASE_PAGE', payload: state.type })
    } catch (e) {
      console.log(e)
    }
  }, [dispatch, state])

  // 스크롤 이벤트
  const scrollEvent = useCallback(async () => {
    if (state[`${state.type}Page`] > 9) return
    if (
      window.innerHeight + window.scrollY ===
      document.documentElement.scrollHeight
    ) {
      if (state.keyword === '') {
        await handleFetchPosts()
      } else {
        await searchPosts(state.keyword, state.sPage)
      }
    }
  }, [handleFetchPosts, state, searchPosts])

  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollEvent, true)

    return () => window.removeEventListener('scroll', scrollEvent, true)
  }, [state, scrollEvent])

  useEffect(() => {
    if (
      state[`${state.type}Posts`].length >= 10 ||
      state[`${state.type}Page`] > 0
    )
      return

    handleFetchPosts()
  }, [handleFetchPosts, state, searchPosts])

  console.log(state)

  return (
    <Container id="home">
      <Header title="게시물을 검색해보세요" />
      <Section
        isFocus={isFocus}
        inputRef={inputRef}
        inputFocus={inputFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        aPosts={state.aPosts}
        bPosts={state.bPosts}
        sPosts={state.sPosts}
        input={state.keyword}
        type={state.type}
        handleTabChange={handleTabChange}
      />
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem;
`
