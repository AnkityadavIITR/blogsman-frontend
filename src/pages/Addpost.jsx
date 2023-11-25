import React, { useEffect ,useRef} from 'react'
import { useState, useContext } from 'react'
import { Context,server } from '../main';
import {StarFilled } from '@ant-design/icons'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Addpost = () => {
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [text, setText] = useState("");
  const [file,setFile]=useState();


  const textareaRef = useRef(null);

  const {isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}=useContext(Context);

  const wordLimit = 200;
  const handleInputChangeContent = (e) => {
    const inputText = e.target.value;
    if (inputText.split(' ').length <= wordLimit) {
      setText(inputText);
      setContent(inputText);
    }
  };

  const remainingWords = wordLimit - text.split(' ').length;
  const isOverLimit = remainingWords < 0;

  //handle scroll wheel
  const handleScroll = (e) => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop += e.deltaY;
    }
  };



  const handlePost=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("title",title);
    formdata.append("content",content)
    formdata.append("file",file);

    try {
      setLoading(true);
      console.log("trying to post");
      const response = await axios.post(
        `${server}/posts/new`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.data && response.data.success) {
        toast.success(response.data.message);
        setLoading(false);
        return <Navigate to={"/"}/>
      } else {
        toast.error('An unexpected error occurred.');
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        setLoading(false);
      } else {
        toast.error('An unexpected error occurred 1.')
        setLoading(false)

      }
    }

  }

  if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <>
    {
      isAuthenticated?(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Post your blog
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  method="POST" onSubmit={handlePost}>
            <div>
              <label htmlFor="title" className="block text-md font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="title"
                  type="text"
                  autoComplete="email"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                  Content
                </label>
                <p>{remainingWords}/{wordLimit} {isOverLimit && <span style={{ color: 'red' }}> - Word limit exceeded</span>}</p>
              </div>
              <div className="mt-1">
                <textarea
                    value={text}
                    onChange={handleInputChangeContent}
                    readOnly={remainingWords < 0}
                    disabled={isOverLimit} 
                    name={text}
                    onWheel={handleScroll}
                    required
                    placeholder="Type your text here..."
                   className="block w-full h-[200px] resize-none p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

              </div>
            </div>
            <div>
              <input 
                type="file"
                className='block w-full text-md text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100'
                name="file" 
                id="" 
                onChange={(e)=>
                  setFile(e.target.files[0])
                }
                />
            </div>


            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center disabled:opacity-50 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                 {loading?<Loader/>:(<p>Add new post</p>)}
              </button>
            </div>
          </form>
        </div>
      </div>
      ):(<div 
         className='max-w-[800px]  mx-auto justify-between border-2 rounded-[10px] p-6 mt-5'>
          <p>Login first..</p>
      </div>)
    }
    
    </>
  )
}

export default Addpost
