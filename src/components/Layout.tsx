import React from 'react'
import Navbar from './Navbar'
interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout justify-center items-center w-[100%]">
      <Navbar />
      {children}
      {/* React Modal Portal */}
      <div id="portal"></div>
    </div>
  )
}
