import React, { useEffect, useState } from 'react'
import { Context, server } from '../main'
import { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Posts from '../components/Posts'
import { MailFilled } from '@ant-design/icons'
import Loader from '../components/Loader'
import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '../components/Postcard'
import { LikeOutlined } from '@ant-design/icons'




const Profile = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  const[userData,setuserData]=useState([]);
  const [dataFetched, setDataFetched] = useState(false);



  useEffect(()=>{
    const data=JSON.parse(window.localStorage.getItem("authorized"));
    console.log(data);
    if(data?.isAuthenticated){
      setIsAuthenticated(data.isAuthenticated);
      setTimeout(() => {
        setIsAuthenticated(false);
        localStorage.clear();
      }, 60 * 60 * 1000);
    }
  },[isAuthenticated])

    if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }
  let params=useParams();
  const user=JSON.parse(window.localStorage.getItem("user_data"));
  if(user?._id===params.id){
    console.log("matched");
    return <Navigate to={"/me"}/>
  }
  useEffect(() => {
    const getdata = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/user/${params.id}`, {
          withCredentials: true
        });
        if (data.success) {
          setuserData(data.user);
          window.localStorage.setItem("click_profile",JSON.stringify(data.user))
          
        }else{
          console.log("server error");
        }
        setLoading(false)
      } catch (e) {
        toast.error("Can't see post");
        console.log(e.response);
        setLoading(false);
      }
    };
    
   
    if (isAuthenticated) {
      const data = JSON.parse(window.localStorage.getItem("click_profile"));
      if(data?._id!=params.id){
        getdata();
        console.log("user change");
      }else{
        if (data && !dataFetched) { // Check if data has been fetched from local storage
          setuserData(data);
          setDataFetched(true); // Update the dataFetched state
        } else if(!data && !dataFetched){
          getdata();
          console.log("called again");
        }
      }
    }
    
  }, [isAuthenticated, dataFetched]);

  // if(!isAuthenticated){
  //   return <Navigate to={"/"}/>
  // }
  
  

  return (
    <>
     {isAuthenticated ? (
        <div className='max-w-[700px] sm:flex mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          {userData? (
            <>
            <div className='flex '>
              {userData.photo && userData.photo?.url ? (
                <img src={userData?.photo?.url} alt={userData.name} width={'100px'} className='rounded-full aspect-[1/1] object-cover'/>
              ) : (
                <i className='pi pi-user' style={{ fontSize: '10rem' }}></i>
              )}
            </div>
            <div className='flex flex-col my-auto md:justify-start'>
                <section className='flex '>
                  <h1 className='text-lg '>{userData?.name}</h1>
                </section>
                <section className='flex items-center'>
                  <MailFilled style={{ fontSize: '28px' }} className=''/>
                  <p className='text-lg p-2'>{userData?.email}</p>
                </section>
                <section className='flex'>
                  <p className='text-lg '>{userData?.posts?.length} Posts</p>
                </section>
                
            </div>
            </>
          ) : (
            <Loader/>
          )}
        </div>
      ) : (
          setTimeout(()=>{
            if(!isAuthenticated){
              <Navigate to={"/"}/>
            }
          },2*1000)
        
      )}

      {isAuthenticated?(
        <div className="flex flex-wrap max-w-screen-xl mx-auto mt-8">
          {
          userData?.posts?.map((post)=>(
            <div key={post._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 2xl:w-1/4 p-4 mx-auto border-2">
                <section className='flex mb-4'>
                  <img src={userData?.photo.url} alt=""  className='w-[40px] aspect-[1/1] object-cover rounded-full mr-4'/>
                  <p className='my-auto text-md'>{userData?.name}</p>
                </section>

            <Link to={"/post/"+ post._id} onClick={()=>{
              window.localStorage.setItem("click_post",JSON.stringify({user:userData,post}));
            }}>
              <Card content={post.content}  postImg={post.photo?.url} title={post.title} date={post.date}></Card>
            </Link>
              <section className=''>
              <LikeOutlined className='text-[20px] text-red-400 mr-3'/>
              <span className='my-auto text-[15px]'>{post.likes.length}</span>
              </section>
            </div>
          ))
          }
        </div>
          
      ):(
        <div className='max-w-[800px] sm:flex mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          <p>Login first</p>
        </div>
      )
      }
    </>
  )
}

export default Profile
