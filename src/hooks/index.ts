import { useEffect, useRef, useState } from 'react'

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

export function useTestDe(callback: any, delay: number) {
  // function func(callback: any, delay: number ) {

  // }

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const func = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setTimeout(() => {
      callback()
    }, delay)
  }
}
