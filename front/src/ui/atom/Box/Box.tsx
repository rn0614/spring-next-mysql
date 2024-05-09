import React, { ReactNode } from 'react'

type BoxProps ={
  children:ReactNode;
  gap?:string;
}

export default function Box({children, gap="10px"}:BoxProps) {
  return (
    <div style={{gap:gap}}>{children}</div>
  )
}
