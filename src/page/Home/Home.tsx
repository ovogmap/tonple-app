import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

import { Section, Header } from '../../components/Home'

export type HomeProps = {}

export default function Home({}: HomeProps): React.ReactElement {
  const [isFocus, setIsFocus] = useState(false)
  const [type, setType] = useState('a-posts')

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

  return (
    <Container>
      <Header title="게시물을 검색해보세요" />
      <Section
        isFocus={isFocus}
        inputRef={inputRef}
        inputFocus={inputFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
