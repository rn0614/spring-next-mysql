import {useGetBoard}  from '@/hooks/useBoard'
import React from 'react'

export default function TestPage() {
  const response = useGetBoard('1');
  console.log('albums',response)
  return (
    <div></div>
  )
}
