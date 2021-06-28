import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { colors } from '../../constants/colors'

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
          <TapBtn active={true}>A Posts</TapBtn>
          <TapBtn active={false}>B Posts</TapBtn>
        </Tap>
        <Ul>
          <Link to="/">
            <Li>
              <h3>
                <b>1.</b> Rerum voluptatibus et doloremque.
              </h3>
              <p>
                Ut ut et omnis. Ipsam nihil suscipit. Omnis dolorum at quidem.
                Omnis sapiente beatae neque facilis ipsum suscipit aut. Id
                voluptatum iusto rerum voluptatibus. Sed commodi ea quaerat
                ipsum esse quis cum ducimus dicta. Enim quia ut velit velit
                quaerat non laudantium. Eveniet voluptates et repellendus
                aperiam et recusandae dolorum. Vel quisquam et aut sint
                cupiditate debitis sed. Delectus voluptatem et explicabo quia
                ullam sunt quos. Accusantium neque et possimus quo voluptatum. A
                voluptatem minima ut in dolor.
              </p>
            </Li>
          </Link>
          <Link to="/">
            <Li>b-posts</Li>
          </Link>
        </Ul>
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

const Tap = styled.div`
  border-bottom: 1px solid ${colors.line};
  margin-bottom: 20px;
`

const TapBtn = styled.button<{ active: boolean }>`
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
