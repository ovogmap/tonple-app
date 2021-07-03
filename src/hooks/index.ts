import React, { useState } from 'react'

export function useDebouncing() {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const func = (callback: any, delay: number) => {
    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      callback()
    }, delay)

    setTimer(newTimer)
  }

  return func
}
