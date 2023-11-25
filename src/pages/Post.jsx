import React from 'react'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import { useContext } from 'react';
import { Context } from '../main';
import { Navigate ,Link} from 'react-router-dom';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
const Post = () => {

  const {user,isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context); 
  const [postdata,setpostdata]=useState([]);
  const [profile,setprofile]=useState([]);

  useEffect(()=>{
    console.log(isAuthenticated);
    const data=JSON.parse(window.localStorage.getItem("click_post"));
    console.log(data);
    setpostdata(data.post);
    setprofile(data.user);
  },[])

  if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }
  const handleLike=()=>{

  }
  return (
    <>
    {
    isAuthenticated?(
    <div className="w-full px-5 py-24 mx-auto max-w-[1200px] lg:px-32">
    <div className="flex flex-col lg:flex-row lg:space-x-12">
      <div className="order-last w-full max-w-screen-sm m-auto mt-12 lg:w-1/4 lg:order-first">
        <div className="p-4 transition duration-500 ease-in-out transform bg-white border rounded-lg">
          <div className="flex py-2 mb-4">
            <img
              src={profile?.photo?.url}
              className="w-16 h-16 rounded-full"
              alt="Avatar"
              />
            <div className="ml-4 my-auto">
              <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            </div>
          </div>
          <div>

            <Link to={"/user/"+profile._id} className='flex items-center px-6 py-2 mt-auto text-lg text-white transition duration-500 ease-in-out transform 
            bg-blue-600 border border-current rounded hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2' >
              View profile
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full px-4 mt-12 prose lg:px-0 lg:w-3/4">
        <div className="mb-5 border-b border-gray-200">
          <div className="flex flex-wrap items-baseline -mt-2">
            <h5>{postdata.date}</h5>
            <p className="mt-1 ml-2">Transitions</p>
          </div>
        </div>
        <h1 className='text-[30px] font-bold'>{postdata.title}</h1>
        <p>{postdata.content}</p>
      <div className='p-2'>
        {
          postdata.likes?.includes(user._id)?(
          <LikeFilled className='text-[20px] text-red-400 mr-3'/>
          ):(
            <button type="submit" onClick={handleLike}>
              <LikeOutlined className='text-[20px] text-red-400 mr-3' />
            </button>
            )
        }
      <span className='my-auto text-[20px]'>{postdata.likes?.length}</span>
       </div>
      </div>
    </div>
  </div>
    ):(
      setTimeout(()=>{
        if(!isAuthenticated){
          <Navigate to={"/"}/>
        }else return(<Loader/>)
      },2*1000))
    }
  </>
    
  )
}

export default Post
