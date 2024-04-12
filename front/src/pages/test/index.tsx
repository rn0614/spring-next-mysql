import { useBoard } from '@/hooks/useBoard'
import React from 'react'

export default function TestPage() {
  const response = useBoard('1');
  console.log('albums',response)
  return (
    <div></div>
  )
}
