import React from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router'


const Root = () => {
  
  return (
    <>
    <Nav />
    <Outlet />
    </>
  )
}

export default Root