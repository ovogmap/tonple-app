import React from 'react'
import styled from 'styled-components'

export type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
