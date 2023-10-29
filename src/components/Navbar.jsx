import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { server, Context } from '../main'
import { useState, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from './Loader'


const Navbar = () => {
    const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
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
        setLoading(true);
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
                setLoading(false);
            }else{
                toast.error(data.message)
                setLoading(false);
                
            }
        }catch(e){
            toast.error(e.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
    }
    

  return (
    <div className='flex mx-auto px-8 pt-3 pb-2 text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 items-center justify-between'>
        <Link to={"/"} className='flex  text-[#00df9a] text-[25px] font-bold border-2 border-[#00df9a] rounded-md p-1' > Blogman. </Link>
        <div className='flex'>
            <Link to={'/'} className='px-5 text-lg'>Home</Link>
            {
                isAuthenticated?(
                 <Link to={'/me'} className='px-5 text-lg'>Profile</Link>
                ):null
            }
            {
                isAuthenticated?(
                    <button type="submit" onClick={handleLogout} disabled={loading} className='px-5 text-lg border-2 border-white disabled:border-0'>  
                        {loading?<Loader className='text-white'/>:(<p>Logout</p>)}
                    </button>
                ):(<Link to='/login' className='border-2 rounded-[10px]  px-5 text-lg'>SignIn</Link>)
            }
            
        </div>

    </div>
  )
}

export default Navbar
