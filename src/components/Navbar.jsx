import React from 'react'
import { Link } from 'react-router-dom'
import { server, Context } from '../main'
import { useState, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'


const Navbar = () => {
    const {isAuthanticated, setIsAuthanticated}=useContext(Context);
    const handleLogout=async()=>{
        try{
           const {data}= await axios.get(
                `${server}/user/logout`,
                {
                    withCredentials:true
                }
            )
            console.log(data);
            if(data.success){
                toast.success(data.message);
                setIsAuthanticated(false);
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.response.data.message);
            setIsAuthanticated(true);
        }
    }

  return (
    <div className='flex mx-auto px-8 pt-3 pb-2 text-white bg-slate-800 items-center justify-between'>
        <h1 className='flex  text-[#00df9a] text-2xl Font-extrabold'>Blogman. </h1>
        <div className='flex'>
            <Link to={'/'} className='px-5 text-lg'>Home</Link>
            {
                isAuthanticated?(
                 <Link to={'/me'} className='px-5 text-lg'>Profile</Link>
                ):null
            }
            {
                isAuthanticated?(
                    <button type="submit" onClick={handleLogout} className='px-5 text-lg' >Logout</button>
                ):(<Link to='/login' className='px-5 text-lg'>SignIn</Link>)
            }
            
        </div>

    </div>
  )
}

export default Navbar
