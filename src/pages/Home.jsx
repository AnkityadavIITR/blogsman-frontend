import React, { useEffect, useState ,useContext} from 'react'
import Navbar from '../components/Navbar'
import { server,Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Posts from '../components/Posts';
const Home = () => {
  const [posts,setPosts]=useState([]);
  const {isAuthanticated, setIsAuthanticated ,user,setUser, loading, setLoading }=useContext(Context);
  console.log(isAuthanticated);
  if(isAuthanticated){
    useEffect(()=>{
      axios.get(`${server}/posts`)
      .then((res)=>
      setPosts(res.data.post))
      .catch((e)=>{
        toast.error(e.response.data.message);
      })
    },[posts])
  }
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
