import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { server, Context } from '../main'
import { useState, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from './Loader'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { TiMessages } from "react-icons/ti";



const Navbar = () => {
    const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
    const [nav,setNav]=useState(false);

    const navClick=()=>{
        setNav(!nav);
    }
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
    <div className='h-[70px] text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 items-center z-10'>
      <div className='flex px-4 sm:px-8 justify-between items-center w-full h-full'>
        <Link to={"/"} className='flex  text-[#00df9a] text-[25px] font-bold border-2 border-[#00df9a] rounded-md p-1' > Blogman. </Link>
        <div className='hidden md:flex'>
            <Link to={'/'} className='px-3 my-auto text-2xl'><CiHome/></Link>
            {
                isAuthenticated?(
                 <Link to={'/me'} className='px-3 text-2xl'><CiUser/></Link>
                ):null
            }
            {
                isAuthenticated?(
                    <button type="submit" className='px-2'><span className='text-2xl'><TiMessages/></span></button>
                ):null
            }
            {
                isAuthenticated?(
                    <button type="submit" onClick={handleLogout} disabled={loading} className='px-2 text-lg'>  
                        {loading?<Loader className='text-white'/>:(<span className='text-2xl'><IoIosLogOut/></span> )}
                    </button>
                ):(<Link to='/login' className='border-2 rounded-[10px]  px-5 text-lg'>SignIn</Link>)
            }

            
        </div>
        <div className=' md:hidden' onClick={navClick}>
            {
                !nav ? (<MenuOutlined/>):<CloseOutlined/>
            }
            
        </div>
    </div>
        <div className={!nav ?'hidden':'absolute px-8 pb-2 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500'} >
            <Link to={'/'} className='block mt-3 text-md border-b-2 border-white text-center'>Home</Link>
            {
                isAuthenticated?(
                 <Link to={'/me'} className='block mt-3 text-md border-b-2 border-white text-center'>Profile</Link>
                ):null
            }
            {
                isAuthenticated?(
                    <button type="submit" onClick={handleLogout} disabled={loading} className=''>  
                        {loading?<Loader className='block text-white text-md  mt-3 border-white border-2 rounded-md p-2 text-center'/>:
                        (<p className='block border-white text-md border-2 rounded-md p-2 text-center '>Logout</p>)}
                    </button>
                ):(<Link to='/login' className='block border-b-2  text-md mt-3 border-white border-2 rounded-md p-2 text-center'>SignIn</Link>)
            }

        </div>

    </div>
  )
}

export default Navbar
