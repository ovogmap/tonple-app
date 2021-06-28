import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

import { Section, Header } from '../../components/Home'
import fetchPosts from '../../api/fetchPosts'
import PostType from '../../interface/post.interface'

export type HomeProps = {}

export default function Home({}: HomeProps): React.ReactElement {
  const [posts, setPosts] = useState<PostType[]>([])
  const [isFocus, setIsFocus] = useState(false)
  const [type, setType] = useState('a-posts')

  const pageRef = useRef<number>(0)

  const inputRef = useRef<HTMLInputElement | null>(null)

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

  const asyncFetchData = useCallback(async (type: string, page: number) => {
    const res = await fetchPosts(type, page).then((v) => v.data)
    setPosts((posts) => [...posts, ...res])
    pageRef.current = pageRef.current + 1
  }, [])

  const onClick = async () => {
    await asyncFetchData(type, pageRef.current)
  }

  useEffect(() => {
    asyncFetchData(type, 0)
  }, [asyncFetchData, type])

  useEffect(() => {
    let timer: NodeJS.Timeout | null
    window.addEventListener('scroll', () => {
      if (!timer) {
        timer = setTimeout(function () {
          timer = null
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
          ) {
            console.log('test')
            asyncFetchData(type, pageRef.current)
          }
        }, 1000)
      }
    })

    return window.removeEventListener('scroll', () => {})
  }, [asyncFetchData, type])

  useEffect(() => {
    console.log(pageRef.current)
  }, [pageRef])
  // const { scrollHeight } = e.currentTarget
  // 	const { scrollTop } = e.currentTarget
  // 	const { clientHeight } = e.currentTarget

  // 	// 데이터 요청
  // 	if (scrollTop + clientHeight >= scrollHeight) {
  // 		fetchAdditionalLocations(inputData.input, page)
  // 	}

  return (
    <Container>
      <button onClick={onClick}>test</button>
      <Header title="게시물을 검색해보세요" />
      <Section
        isFocus={isFocus}
        inputRef={inputRef}
        inputFocus={inputFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        posts={posts}
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
