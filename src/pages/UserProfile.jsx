import React, { useEffect, useState } from 'react'
import { Context, server } from '../main'
import { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Posts from '../components/Posts'
import { MailFilled } from '@ant-design/icons'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom'


const UserProfile = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}=useContext(Context);
  const[posts,setPosts]=useState([])

  useEffect(()=>{
    const data=JSON.parse(window.localStorage.getItem("authorized"));
    console.log(data);
    if(data?.isAuthenticated){
      setIsAuthenticated(data.isAuthenticated);
      setTimeout(() => {
        setIsAuthenticated(false);
        localStorage.clear()
      }, 60 * 60 * 1000);
    }

  },[])
  
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${server}/user/me`, {
          withCredentials: true
        });
        console.log("data",data);
        if (data.success) {
          setPosts(data.user.posts);
          window.localStorage.setItem("user_posts",JSON.stringify({posts}));
          console.log(posts);
        }else{
          console.log("server error");
        }
      } catch (e) {
        toast.error("Can't see post");
      }
    };
    const data=JSON.parse(window.localStorage.getItem("user_posts"))

    if(isAuthenticated){
      if(data && data.success){
        setPosts(data.post)
      }else{
       getPost(posts);
       console.log("called again");
      }
    }
  }, [isAuthenticated]);


  return (
    <>
     {isAuthenticated ? (
        <div className='max-w-[700px] sm:flex mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          {user? (
            <>
            <div className='flex '>
              {user.photo && user.photo?.url ? (
                <img src={user?.photo.url} alt={user.name} width={'100px'} className='rounded-full'/>
              ) : (
                <i className='pi pi-user' style={{ fontSize: '10rem' }}></i>
              )}
            </div>
              <div className='flex flex-col my-auto md:justify-start'>
                <section className='flex '>
                  <h1 className='text-lg '>{user?.name}</h1>
                </section>
                <section className='flex items-center'>
                  <MailFilled style={{ fontSize: '28px' }} className=''/>
                  <p className='text-lg p-2'>{user?.email}</p>
                </section>
                <section className='flex'>
                  <p className='text-lg '>{user?.posts?.length} Posts</p>
                </section>
                
              </div>
            </>
          ) : (
            <Loader/>
          )}
        </div>
      ) : (
        <Navigate to={"/login"}></Navigate>
      )}
      {isAuthenticated?(
        posts?.map((post)=>{
          return <Posts content={post.content} author={post.author} title={post.title} key={post._id} date={post.date}></Posts>
        })
      ):(
        <div className='max-w-[800px] sm:flex mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          <p>Login first</p>
        </div>
      )
      }
    </>
  )
}

export default UserProfile
