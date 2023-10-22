import React, { useEffect, useState } from 'react'
import { Context, server } from '../main'
import { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Posts from '../components/Posts'
import { MailFilled } from '@ant-design/icons'


const UserProfile = () => {
  const {isAuthanticated ,setIsAuthanticated,loading,setLoading,user,setUser}=useContext(Context);
  const [posts,setPosts]=useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${server}/user/me`, {
          withCredentials: true
        });
        if (data.success) {
          setPosts(data.user.posts);
          console.log(posts);
        }
      } catch (e) {
        toast.error("Can't get the posts");
      }
    };

    getPost(posts);

  }, [isAuthanticated]);

  return (
    <>
     {isAuthanticated ? (
        <div className='max-w-[800px] sm:flex mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          {user ? (
            <>
            <div className='flex '>
              {user.photo[0]?.url ? (
                <img src={user.photo[0].url} alt={user.name} width={'250px'}/>
              ) : (
                <i className='pi pi-user' style={{ fontSize: '10rem' }}></i>
              )}
            </div>
              <div className='flex flex-col my-auto md:justify-start'>
                <section className='flex '>
                  <h1 className='text-lg '>{user.name}</h1>
                </section>
                <section className='flex items-center'>
                  <MailFilled style={{ fontSize: '28px' }} className=''/>
                  {/* <label htmlFor="email" className='text-lg'>Email : </label> */}
                  <p className='text-lg p-2'>{user.email}</p>
                </section>
                <section className='flex'>
                  <p className='text-lg '>{user.posts.length} Posts</p>
                </section>
                
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      ) : (
        <p>Login first</p>
      )}
      {
        posts.map((post)=>{
          return <Posts post={post} key={post._id}></Posts>
        })
      }
    </>
  )
}

export default UserProfile
