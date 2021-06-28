import React from 'react'
import { useHistory } from 'react-router'

export default function Detail() {
  const history = useHistory()
  return (
    <div>
      Detaul
      <button onClick={() => history.push('/')}>back</button>
    </div>
  )
}
