import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { colors } from '../../constants/colors'
import { useLocation, useRouteMatch } from 'react-router-dom'
import queryString, { ParsedQuery } from 'query-string'

import fetchPostOne from '../../api/fetchPostOne'
import { useDispatchContext, useStateContext } from '../../App.Context'

export default function Detail() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const state = useStateContext()
  const dispatch = useDispatchContext()

  const history = useHistory()
  const type = useRouteMatch<{ type: string }>().params.type
  const location = useLocation()
  const id: ParsedQuery<string> = queryString.parse(location.search)

  const fetchData = async (type: string, id: string) => {
    const res = await fetchPostOne(type, id)
    const { title, content } = res.data
    setTitle(title)
    setContent(content)
  }

  const handleGoBack = () => {
    history.goBack()
    if (state.page === 1) {
      dispatch({ type: 'RESET_PAGE' })
    }
  }

  useEffect(() => {
    if (!type || !id) return
    fetchData(type, id.id as string)
  }, [type, id])

  if (title === '' || content === '') return null
  return (
    <Container>
      <Content>
        <h2>{title}</h2>
        <p>{content}</p>
      </Content>
      <BackBtn onClick={handleGoBack}>뒤로가기</BackBtn>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2.5rem;
  margin-top: 5rem;
`

const Content = styled.article`
  width: 100%;
  padding: 30px;
  border: 1px solid ${colors.line};
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    text-align: start;
  }
`

const BackBtn = styled.button`
  background: ${colors.main};
  padding: 10px 20px;
  color: #fff;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    background: rgba(59, 131, 246, 0.6);
  }
`
