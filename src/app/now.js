'use client'
 
import { startTransition, useEffect, useState } from 'react'
 
export function Now() {
  const [now, setNow] = useState(null)
  useEffect(() => {
    // Wrap in startTransition so that if any component below suspends
    // during this update, React keeps the existing UI visible instead
    // of flashing the nearest outer <Suspense> fallback.
    startTransition(() => {
      setNow(Date.now())
    })
    const id = setInterval(() => {
      startTransition(() => {
        setNow(Date.now())
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <time>{now ? new Date(now).toLocaleString() : '…'}</time>
}