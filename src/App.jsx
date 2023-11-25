import React, { useContext} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from "./pages/Home";
import AdminProfile from "./pages/AdminProfile";
import { Toaster } from 'react-hot-toast'
import { Context } from './main'
import Addpost from "./pages/Addpost";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Footer from "./components/Footer";



function App() {

  const {isAuthenticated}=useContext(Context);
  return (
    <Router>

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/me" element={<AdminProfile/>}></Route>
        <Route path="/addpost" element={<Addpost/>}></Route>
        <Route path="/post/:id" element={<Post/>}></Route>
        <Route path="/user/:id" element={<Profile/>}></Route>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
  )
}

export default App
