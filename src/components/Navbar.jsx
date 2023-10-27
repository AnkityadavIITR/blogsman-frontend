import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { server, Context } from '../main'
import { useState, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'



const Navbar = () => {
    const {isAuthenticated,setIsAuthenticated}=useContext(Context);
    const [click,setclick]=useState(false);
    // useEffect(()=>{
    // console.log("NAV",isAuthenticated);
    // const data=JSON.parse(window.localStorage.getItem("authorized"));
    // console.log(data);
    // console.log(data?.isAuthenticated);
    // if(data?.isAuthenticated){
    //   setIsAuthenticated(data.isAuthenticated)
    // }
    // })

    const handleLogout=async()=>{
        try{
           const {data}= await axios.get(
                `${server}/user/logout`,
                {
                    withCredentials:true
                }
            )
            if(data.success){
                toast.success(data.message);
                setIsAuthenticated(false);
                localStorage.clear();
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.response.data.message);
            setIsAuthenticated(true);
        }
    }
    
  if(!isAuthenticated){
    <Navigate to={"/"}/>
  }

  return (
    <div className='flex mx-auto px-8 pt-3 pb-2 text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 items-center justify-between'>
        <h1 className='flex  text-[#00df9a] text-[30px] font-bold '>Blogman. </h1>
        <div className='flex'>
            <Link to={'/'} className='px-5 text-lg'>Home</Link>
            {
                isAuthenticated?(
                 <Link to={'/me'} className='px-5 text-lg'>Profile</Link>
                ):null
            }
            {
                isAuthenticated?(
                    <button type="submit" onClick={handleLogout} className='px-5 text-lg border-2 border-white' >Logout</button>
                ):(<Link to='/login' className='border-2 rounded-[10px]  px-5 text-lg'>SignIn</Link>)
            }
            
        </div>

    </div>
  )
}

export default Navbar
