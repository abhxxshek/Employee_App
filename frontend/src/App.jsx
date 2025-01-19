import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Add_employee from './components/Add_employee'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Main from './components/Main'
import PrivateRoutes from './components/PrivateRoutes'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route element={<PrivateRoutes/>}>
        <Route path='/home' element={<Main child={<Home/>}/>}></Route>
        <Route path='/add-emp' element={<Main child={<Add_employee/>}/>}></Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App