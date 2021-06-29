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

  const [posts, setPosts] = useState<PostType[]>([])
  const [isFocus, setIsFocus] = useState(false)
  const [type, setType] = useState('a-posts')
  const [input, setinput] = useState('')

  const pageRef = useRef<number>(0)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleTypeChange = (value: string) => {
    setType(value)
  }

  const search = async (value: string) => {
    const res = await fetchSearchPost(type, value).then((v) => v.data)
    setPosts(res)
  }

  const onChange = (e: any) => {
    const { value } = e.target
    setinput(value)
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

  const asyncFetchData = async (type: string, page: number) => {
    if (page > 9) return
    const res = await fetchPosts(type, page).then((v) => v.data)
    setPosts((posts) => [...posts, ...res])
    dispatch({ type: 'SET_POSTS', payload: res })
    pageRef.current += 1
  }

  const fetchDataList = useCallback(async (type: string, page: number) => {
    const res = await fetchPosts(type, page).then((v) => v.data)
    setPosts(res)
    dispatch({ type: 'SET_POSTS', payload: res })
    pageRef.current += 1
  }, [])

  const scrollEvent = useCallback((currtype: string) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      asyncFetchData(currtype, pageRef.current)
    }
  }, [])

  useEffect(() => {
    if (state.posts.length) return
    fetchDataList(type, 0)
    pageRef.current = 0
  }, [fetchDataList, type, state.posts.length])

  // TODO: 윈도우 이벤트에 하면 안되겠는데 ??

  useEffect(() => {
    window.addEventListener('scroll', () => scrollEvent(type))

    return () => window.removeEventListener('scroll', () => scrollEvent(type))
  }, [type, scrollEvent])

  useEffect(() => {
    console.log(pageRef.current)
  }, [pageRef])

  return (
    <Container>
      <Header title="게시물을 검색해보세요" />
      <Section
        isFocus={isFocus}
        inputRef={inputRef}
        inputFocus={inputFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        posts={state.posts}
        input={input}
        onChange={onChange}
        type={type}
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
