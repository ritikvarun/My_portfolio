import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import Skills from './pages/Skills'
import Settings from './pages/Settings'
import Notes from './pages/Notes'
import Login from './pages/Login'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer } from 'react-toastify';

function App() {
  let {adminData} = useContext(adminDataContext)
  return (
    <>
      <ToastContainer />
      {!adminData ? <Login/> : 
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/certificates' element={<Certificates/>}/>
          <Route path='/skills' element={<Skills/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      }
    </>
  )
}

export default App
