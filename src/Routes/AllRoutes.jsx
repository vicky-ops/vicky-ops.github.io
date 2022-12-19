import React from 'react'
import { Routes,Route } from 'react-router-dom'
import PageNotFound from '../components/PageNotFound'
import Home from './Home'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
  )
}

export default AllRoutes