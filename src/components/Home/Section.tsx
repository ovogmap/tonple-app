import React from 'react'
import styled from 'styled-components'

type SectionProps = {
  isFocus: boolean
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  inputFocus: () => void
  onFocus: () => void
  onBlur: () => void
}

export default function Section({
  isFocus,
  inputRef,
  inputFocus,
  onFocus,
  onBlur,
}: SectionProps) {
  return (
    <Main>
      <article>
        <Form id="form" onClick={inputFocus} isFocus={isFocus}>
          <SearchIcon />
          <CustomInput
            ref={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            type="text"
            placeholder="검색어를 입력하세요"
          />
        </Form>
      </article>
      <article>
        <Tap>
          <button>A-posts</button>
          <button>B-posts</button>
        </Tap>
        <ul>
          <li>a-posts</li>
          <li>b-posts</li>
        </ul>
      </article>
    </Main>
  )
}

const Main = styled.main`
  width: 100%;

  article {
    width: 100%;

    &:first-child {
      margin-bottom: 35px;
    }
  }
`

const Tap = styled.div`
  border-bottom: 1px solid #c0c0c0;

  button {
    padding: 15px 10px;
    border-radius: 5px;

    &:hover {
      background: #ededed;
    }
  }
`

const Form = styled.div<{ isFocus: boolean }>`
  margin: 0 auto;
  width: 336px;
  height: 51px;
  border: ${(props) =>
    props.isFocus ? ' 1px solid #3b82f6' : '1px solid #c0c0c0'};
  border-radius: 3px;
  padding: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  transition: all 0.2s;

  &:hover {
    border: 1px solid #3b82f6;
  }
`

const SearchIcon = styled.div`
  width: 14px;
  height: 14px;
  background: #333;
  margin-right: 14px;
`

const CustomInput = styled.input`
  flex: 1;
  border: none;
  background: initial;
  outline: none;

  &::placeholder {
    color: #969696;
  }
`
