import React, { useEffect, useState ,useContext} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { server,Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Posts from '../components/Posts';
import { PlusOutlined  } from '@ant-design/icons'
import Posttry from './Post';
import Hero from '../components/Hero';
import Card from '../components/Postcard';

const Home = () => {

  const {isAuthenticated,setIsAuthenticated ,user,setUser, loading, setLoading}=useContext(Context);
  //for all posts
  const [posts,setPosts]=useState([])

  useEffect(() => {
    console.log("is",isAuthenticated);
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
          <Link to={'/addpost'} className=" flex max-w-[700px] mx-2 sm:mx-auto items-center bg-slate-200 border-2 border-slate-700 rounded-[10px] p-5 mt-5"><PlusOutlined  style={{fontSize: '50px',}} className='text-center'/> </Link>
          {
            posts?(
              <div className="flex flex-wrap max-w-screen-xl mx-auto mt-8">
              {posts.map((post) => (
                <div key={post._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 2xl:w-1/4 p-4 ">
                  <Link to={"/post/" + post._id} onClick={()=>{
                    window.localStorage.setItem("click_post",JSON.stringify({user:post.user,post}));
                  }}>
                    <Card
                      title={post.title}
                      postImg={post?.photo?.url}
                      content={post.content}
                      author={post.user.name}
                      image={post.user.photo.url}
                      userId={post.user._id}
                      date={post.date}
                    />
                  </Link>
                  <Link to={"/user/"+post.user._id}>
                   <section className='flex p-1'>
                    <img src={post.user.photo.url} alt=""  className='w-[40px] aspect-[1/1] object-cover rounded-full mr-4'/>
                    <p className='my-auto text-md'>{post.user.name}</p>
                   </section>
                  </Link>
                </div>
              ))}
            </div>
              )
            :<p>No post available</p>
          }
        </>
      ):(
      <>
      <Hero/>
      </>
      )
    }
    </>
  )
}

export default Home
