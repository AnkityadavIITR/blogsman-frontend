import React, { useEffect, useState ,useContext} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { server,Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Posts from '../components/Posts';
import { PlusOutlined  } from '@ant-design/icons'
import Hero from '../components/Hero';
import Card from '../components/Postcard';

const Home = () => {

  const {isAuthenticated,setIsAuthenticated ,user,setUser, loading, setLoading}=useContext(Context);
  //for all posts
  const [posts,setPosts]=useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${server}/posts/allpost`, {
          withCredentials: true
        });
        console.log(data.posts);
        if(data.success){
          setPosts(data.posts);
        }
      } catch (e) {
        console.log(e);
        toast.error("Can't get the posts");
      }
    };

    if(isAuthenticated){
      getPost();
      console.log("called for post");
    }
  }, [isAuthenticated]);

  return (
    <>
    {
      isAuthenticated?(
        <>
          <Link to={'/addpost'} className=" flex max-w-[700px] mx-auto items-center bg-slate-200 border-2 border-slate-700 rounded-[10px] p-5 mt-5"><PlusOutlined  style={{fontSize: '50px',}} className='text-center'/> </Link>
          {/* <Card/> */}
          {
            posts?(
              
              posts.map((post)=>{
                return (
                  <Link to={"/"+post._id}>
                    <Posts 
                      title={post.title} 
                      postImg={post?.photo?.url}  
                      content={post.content} 
                      author={post.user.name} 
                      image={post.user.photo.url} 
                      date={post.date}>
                      </Posts>
                  </Link>
                )
              })
            ):<p>No post available</p>
          }
        </>
      ):(
      <>
      <Hero/>
      {/* <Card/> */}
      </>
      )
    }
    </>
  )
}

export default Home
