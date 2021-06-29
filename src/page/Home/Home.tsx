import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

import { Section, Header } from '../../components/Home'
import fetchPosts from '../../api/fetchPosts'
import PostType from '../../interface/post.interface'
import fetchSearchPost from '../../api/fetchSearchPost'

import { useDispatchContext, useStateContext } from '../../App.Context'

export default function Home(): React.ReactElement {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  console.log(state)

  const [isFocus, setIsFocus] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleTypeChange = (value: string) => {
    dispatch({ type: 'SET_TYPE', payload: value })
  }

  const search = async (value: string) => {
    const res = await fetchSearchPost(state.type, value).then((v) => v.data)
    dispatch({ type: 'SET_POSTS', payload: res })
  }

  const onChange = (e: any) => {
    const { value } = e.target
    dispatch({ type: 'SET_KEYWORD', payload: value })
    search(value)
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

  const handleFetchPosts = useCallback(async () => {
    if (state.page > 9) return
    const res = await fetchPosts(state.type, state.page).then((v) => v.data)
    dispatch({ type: 'ADDITIONAL_POSTS', payload: res })
  }, [dispatch, state.page, state.type])

  const scrollEvent = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      handleFetchPosts()
      dispatch({ type: 'INCREASE_PAGE' })
    }
  }

  useEffect(() => {
    dispatch({ type: 'SET_POSTS', payload: [] })
    handleFetchPosts()
  }, [handleFetchPosts, dispatch])

  // TODO: 윈도우 이벤트에 하면 안되겠는데 ??

  // useEffect(() => {
  //   // window.removeEventListener('scroll', () => scrollEvent())
  //   window.addEventListener('scroll', () => scrollEvent())

  //   return () => window.removeEventListener('scroll', () => scrollEvent())
  // }, [])

  return (
    <Container onScroll={() => console.log('ok')}>
      <Header title="게시물을 검색해보세요" />
      <Section
        isFocus={isFocus}
        inputRef={inputRef}
        inputFocus={inputFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        posts={state.posts}
        input={state.keyword}
        onChange={onChange}
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
