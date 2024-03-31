import React, { ReactNode } from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import styles from './style.module.scss'

type LayoutProps = {
  children:ReactNode;
}

export default function MainLayout({children}:LayoutProps) {
  return (
    <main id={styles["grid"]}>
      <Header/>
      {children}
      <Footer />
    </main>
  )
}
