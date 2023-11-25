import React, { useEffect, useState } from 'react'
import { Context, server } from '../main'
import { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Posts from '../components/Posts'
import { MailFilled } from '@ant-design/icons'
import Loader from '../components/Loader'
import { Navigate, Link } from 'react-router-dom'
import Card from '../components/Postcard'
import MoreVertIcon from '@mui/icons-material/MoreVert';



const UserProfile = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}=useContext(Context);
  const[posts,setPosts]=useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [togglemenu,setTogglemenu]=useState(false);

  const handletoggle=()=>{
    console.log('Toggle menu clicked');
    setTogglemenu(!togglemenu); 
   }
  
  console.log(togglemenu);
  useEffect(()=>{
    const data=JSON.parse(window.localStorage.getItem("authorized"));
    // console.log("user is",data);
    if(data?.isAuthenticated){
      setIsAuthenticated(data.isAuthenticated);
    }else{
      <Navigate to={"/"}/>
    }
  },[isAuthenticated])
  
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${server}/user/me`, {
          withCredentials: true
        });
        if (data.success) {
          setPosts(data.user.posts);
          window.localStorage.setItem("admin_posts",JSON.stringify(data.user.posts));
          console.log(posts);
          toast.success("welcome to user panel")
        }else{
          console.log("server error");
        }
      } catch (e) {
        toast.error("Can't see post");
      }
    };

    if (isAuthenticated) {
      const data = JSON.parse(window.localStorage.getItem("admin_posts"));
      // console.log("datafetch",dataFetched);
      if (data && !dataFetched) { 
        console.log("fetch from local-storage");
        setPosts(data);
        setDataFetched(true); 
        // Update the dataFetched state
      } else if(!data && !dataFetched){
        getPost();
        console.log("called again");
      }
    }
  }, [isAuthenticated, dataFetched]);
  



  return (
    <>
     {
     isAuthenticated ? (
        <div className='max-w-[700px] sm:flex mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          {user? (
            <>
            <div className='flex '>
              {user.photo && user.photo?.url ? (
                <img src={user?.photo.url} alt={user.name} width={'100px'} className='rounded-full aspect-[1/1] object-cover'/>
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
          <Navigate to={"/"}/>
      )}

      
       <h2 className=' text-center mx-auto text-[40px] font-bold border-b-2 border-slate-500 max-w-[500px] mt-4'>Your Blogs</h2>
      

      {isAuthenticated?(
        <div className="flex flex-wrap max-w-screen-xl mx-auto">

        {
            posts?(
              <div className="flex flex-wrap max-w-screen-xl mx-auto mt-8">
              {posts?.map((post) => (
                <div key={post._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 2xl:w-1/4 p-4 border-2  ">
                  <Link to={"/user/"+user._id}>
                    <div className='flex justify-between'>
                      <section className='flex p-1'>
                       <img src={user.photo.url} alt=""  className='w-[40px] aspect-[1/1] object-cover rounded-full mr-4'/>
                       <p className='my-auto text-md'>{user.name}</p>
                      </section>
                      <div className='my-auto' onClick={handletoggle}>
                       <MoreVertIcon />
                      </div>

                      
                    </div>
                    <div className={!togglemenu?'hidden':'absolute flex-col border-2 border-slate-500 bg-slate-300 w-auto z-10'}>
                     <button className='flex p-1 hover:bg-white px-3 w-full'>Edit</button>
                     <button className='flex p-1 hover:bg-white px-3 w-full'>delete</button>
                    </div>
                  </Link>
                  <Link to={"/post/" + post._id} onClick={()=>{
                    window.localStorage.setItem("click_post",JSON.stringify({user:user,post}));
                  }}>
                    <Card
                      title={post.title}
                      postImg={post?.photo?.url}
                      content={post.content}
                      date={post.date}
                    />
                  </Link>
                </div>
              ))}
            </div>
              )
            :<p>No post available</p>
        }

      </div>
      ):(
        <Navigate to={"/"}/>
      )
      }
    </>
  )
}

export default UserProfile
