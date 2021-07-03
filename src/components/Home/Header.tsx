import React from 'react'
import styled from 'styled-components'

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.header`
  width: 100%;
  text-align: center;
  margin: 2.1875rem;
`

const Title = styled.h1`
  color: #696d74;
  font-size: 1.5rem;
  font-weight: normal;
`
