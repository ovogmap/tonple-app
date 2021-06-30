import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from '../../constants/colors'
import PostType from '../../interface/post.interface'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'

type SectionProps = {
  isFocus: boolean
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  type: string
  input: string
  aPosts: PostType[]
  bPosts: PostType[]
  inputFocus: () => void
  onFocus: () => void
  onBlur: () => void
  handleTypeChange: (currentType: string) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const tabList = [
  {
    title: 'A Posts',
    value: 'a',
  },
  {
    title: 'B Posts',
    value: 'b',
  },
]

function Section({
  isFocus,
  inputRef,
  input,
  type,
  aPosts,
  bPosts,
  inputFocus,
  onFocus,
  onBlur,
  handleTypeChange,
  onChange,
}: SectionProps) {
  const aTypePost = useMemo(() => aPosts, [aPosts])
  const bTypePost = useMemo(() => bPosts, [bPosts])

  return (
    <Main>
      <article>
        <Form id="form" onClick={inputFocus} isFocus={isFocus}>
          <SearchIconBox />
          <CustomInput
            ref={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={input}
            onChange={onChange}
            type="text"
            placeholder="검색어를 입력하세요"
          />
        </Form>
      </article>
      <article>
        <Tab>
          {tabList.map((tab) => (
            <TabBtn
              key={tab.value}
              onClick={() => handleTypeChange(tab.value)}
              active={tab.value === type}
            >
              {tab.title}
            </TabBtn>
          ))}
        </Tab>
        <Ul>
          {type === 'a'
            ? aTypePost?.map((post, i) => (
                <Link to={`/detail/${post.type}?id=${post.id}`} key={post.id}>
                  <Li>
                    <h3>
                      <b>{post.id}.</b> {post.title}
                    </h3>
                    <p>{post.content}</p>
                  </Li>
                </Link>
              ))
            : bTypePost?.map((post, i) => (
                <Link to={`/detail/${post.type}?id=${post.id}`} key={post.id}>
                  <Li>
                    <h3>
                      <b>{post.id}.</b> {post.title}
                    </h3>
                    <p>{post.content}</p>
                  </Li>
                </Link>
              ))}
        </Ul>
      </article>
    </Main>
  )
}

export default React.memo(Section)

const Main = styled.main`
  width: 100%;

  article {
    width: 100%;

    &:first-child {
      margin-bottom: 35px;
    }
  }
`

const Ul = styled.ul`
  padding: 20px;
  border: 1px solid ${colors.line};
  border-radius: 5px;
  box-shadow: inset 3px 3px 3px 0px rgb(243, 243, 243, 0.6),
    2px 2px 3px rgb(241, 241, 241, 0.6);
`

const Li = styled.li`
  padding: 15px;

  h3 {
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 10px;
    color: #000;
  }

  b {
    color: ${colors.main};
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* ellipsis line */
    -webkit-box-orient: vertical;

    line-height: 1.2em;
    height: 3.6em;
  }

  &:hover {
    background: ${colors.hoverBg};
  }
`

const Tab = styled.div`
  border-bottom: 1px solid ${colors.line};
  margin-bottom: 20px;
`

const TabBtn = styled.button<{ active: boolean }>`
  padding: 15px 15px;
  border-radius: 5px;
  color: ${(props) => (props.active ? colors.main : colors.default)};
  font-weight: 800;

  &:hover {
    color: rgba(59, 131, 246, 0.6);
    background: ${colors.hoverBg};
  }
`

const Form = styled.div<{ isFocus: boolean }>`
  margin: 0 auto;
  width: 336px;
  height: 51px;
  border: ${(props) =>
    props.isFocus ? ' 1px solid' + colors.main : '1px solid' + colors.line};
  border-radius: 3px;
  padding: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  transition: all 0.2s;

  &:hover {
    border: 1px solid ${colors.main};
  }
`

const SearchIconBox = styled(SearchIcon)`
  width: 14px;
  height: 14px;
  margin-right: 14px;
  color: #969696;
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
