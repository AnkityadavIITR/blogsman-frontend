import React, { useEffect, useState ,useContext} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { server,Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Posts from '../components/Posts';
import { PlusOutlined  } from '@ant-design/icons'

const Home = () => {

  const {isAuthenticated,setIsAuthenticated ,user,setUser, loading, setLoading}=useContext(Context);
  //for all posts
  const [posts,setPosts]=useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${server}/posts`, {
          withCredentials: true
        });
        if(data.success){
          setPosts(data.posts);
        }
      } catch (e) {
        console.log(e);
        toast.error("Can't get the posts");
      }
    };

    if(isAuthenticated){
      getPost(posts);
      console.log("called for post");
    }
  }, []);

  return (
    <>
    {
      isAuthenticated?(
        <>
          <Link to={'/addpost'} className="max-w-[700px] sm:flex mx-auto items-center bg-slate-200 border-2 border-slate-700 rounded-[10px] p-6 mt-5"><PlusOutlined  style={{fontSize: '50px',}} className='text-center'/> </Link>
          {
            posts?(
              posts?.map((post)=>{
                return <Posts key={post._id} title={post.title}  content={post.content} author={post.author} date={post.date}></Posts>
              })
            ):<p>No post available</p>
          }

        </>
      ):<Navigate to={"/login"}/> 
    }
    </>
  )
}

export default Home
