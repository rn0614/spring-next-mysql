import React, { ReactNode, useEffect } from 'react'
import { useSetRecoilByToken } from "@/hooks/useLogin";


export default function LoginProvider() {
  const setRecoilByToken =useSetRecoilByToken();
  
  useEffect(()=>{
    setRecoilByToken(undefined); // 새로고침했을때 초기에 recoil 세팅을 위한 function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <></>
  )
}
