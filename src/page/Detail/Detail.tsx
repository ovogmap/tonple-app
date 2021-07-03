import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { colors } from '../../constants/colors'
import { useLocation, useRouteMatch } from 'react-router-dom'
import queryString, { ParsedQuery } from 'query-string'

import fetchPostOne from '../../api/fetchPostOne'

export default function Detail() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const history = useHistory()
  const type = useRouteMatch<{ type: string }>().params.type
  const location = useLocation()
  const id: ParsedQuery<string> = queryString.parse(location.search)

  const fetchPostOneData = async (type: string, id: string) => {
    const res = await fetchPostOne(type, id)
    const { title, content } = res.data
    setTitle(title)
    setContent(content)
  }

  const handleGoBack = () => {
    history.goBack()
  }

  useEffect(() => {
    if (!type || !id) return
    fetchPostOneData(type, id.id as string)
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
  padding: 1.875rem;
  border: 1px solid ${colors.line};
  border-radius: 0.3125rem;
  text-align: center;
  margin-bottom: 1.25rem;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.9375rem;
  }

  p {
    font-size: 1rem;
    text-align: start;
  }
`

const BackBtn = styled.button`
  background: ${colors.main};
  padding: 0.625rem 1.25rem;
  color: #fff;
  border-radius: 0.3125rem;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    background: rgba(59, 131, 246, 0.6);
  }
`
