import React, { useContext} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { Toaster } from 'react-hot-toast'
import { Context } from './main'



function App() {

  const {isAuthanticted}=useContext(Context);
  return (
    <Router>
      {/* {
        isAuthanticted?<Navbar/>:null
      } */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/me" element={<UserProfile/>}></Route>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
