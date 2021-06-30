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

  const [isFocus, setIsFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // 검색 api 디바운싱
  const debouncing = useDebouncing()

  const handleTypeChange = (value: string) => {
    if (value === state.type) return
    dispatch({ type: 'SET_TYPE', payload: value })
  }

  const searchPosts = async (value: string) => {
    const res = await fetchSearchPost(state.type, value).then((v) => v.data)
    dispatch({
      type: 'SET_POSTS',
      payload: { type: `${state.type}Posts`, value: res },
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch({ type: 'SET_KEYWORD', payload: value })
    debouncing(() => searchPosts(value), 150)
  }

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

  // 최초요청 api
  const handleFetchPosts = useCallback(async () => {
    const res = await fetchPosts(state.type, state[`${state.type}Page`]).then(
      (v) => v.data
    )
    dispatch({
      type: 'SET_POSTS',
      payload: { type: `${state.type}Posts`, value: res },
    })
    dispatch({ type: 'INCREASE_PAGE', payload: state.type })
  }, [dispatch, state])

  // 추가요청 api
  const handleAdditionalFetchPosts = useCallback(async () => {
    const res = await fetchPosts(state.type, state[`${state.type}Page`]).then(
      (v) => v.data
    )
    dispatch({
      type: 'ADDITIONAL_POSTS',
      payload: { type: `${state.type}Posts`, value: res },
    })
  }, [dispatch, state])

  // 스크롤이벤트
  const scrollEvent = useCallback(async () => {
    if (state[`${state.type}Page`] > 9) return
    if (
      window.innerHeight + window.scrollY ===
      document.documentElement.scrollHeight
    ) {
      await handleAdditionalFetchPosts()
      dispatch({ type: 'INCREASE_PAGE', payload: state.type })
    }
  }, [dispatch, handleAdditionalFetchPosts, state])

  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollEvent, true)

    return () => window.removeEventListener('scroll', scrollEvent, true)
  }, [state, scrollEvent])

  useEffect(() => {
    if (
      state[`${state.type}Posts`].length > 10 ||
      state[`${state.type}Page`] > 0
    )
      return
    handleFetchPosts()
  }, [handleFetchPosts, state])

  useEffect(() => {
    console.log('state', state)
  }, [state])

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
        input={state.keyword}
        type={state.type}
        handleTypeChange={handleTypeChange}
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
