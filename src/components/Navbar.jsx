import React from 'react'
import { Link } from 'react-router-dom'
import { server, Context } from '../main'
import { useState, useContext } from 'react'




const Navbar = () => {
    const {isAuthanticated, setIsAuthanticated}=useContext(Context);
    const handleLogout=async()=>{

    }

  return (
    <div className='flex mx-auto px-8 pt-3 pb-2 text-white bg-slate-800 items-center justify-between'>
        <h1 className='flex  text-[#00df9a] text-2xl Font-extrabold'>Blogman. </h1>
        <div className='flex'>
            {
                isAuthanticated?(
                 <Link to={'/me'} className='px-5 text-lg'>Profile</Link>
                ):null
            }
            {
                isAuthanticated?(
                    <button type="submit" onClick={handleLogout} className='px-5 text-lg' >Logout</button>
                ):(<Link to='/login' className='max-px-5 text-lg'>SignIn</Link>)
            }
            
        </div>

    </div>
  )
}

export default Navbar
