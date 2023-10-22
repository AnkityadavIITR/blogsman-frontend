import React, { useEffect, useState ,useContext} from 'react'
import Navbar from '../components/Navbar'
import { server,Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Posts from './Addpost';
const Home = () => {
  const [posts,setPosts]=useState([]);
  const {isAuthanticated, setIsAuthanticated ,user,setUser, loading, setLoading }=useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${server}/posts`, {
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
    <div>
      {
        posts?(
          posts.map((post)=>{
            return <Posts key={post._id} title={post.title} content={post.content}></Posts>
          })
        ):<p>No post available</p>
      }
    </div>
  )
}

export default Home
