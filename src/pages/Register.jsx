import React from 'react'
import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server, Context } from '../main';
import Loader from '../components/Loader';

const Register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [file,setFile]=useState();

  const {isAuthanticated, setIsAuthanticated ,user,setUser, loading, setLoading }=useContext(Context)

  const handleRegister=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("name",name)
    formdata.append("email",email);
    formdata.append("password",password);
    formdata.append("file",file);
    console.log(formdata.file);
    console.log(file);
    console.log(loading);
    try{
      setLoading(true);
      const {data}=await axios.post(
        `${server}/user/register`,
        formdata,
        {
          headers:{
            'Content-Type':'multipart/form-data'
          },withCredentials:true
        }
      )
      console.log(data);
      if(data.success=="true"){
        setIsAuthanticated(true);
        toast.success(data.message);
        setLoading(false);
      }
    }catch(e){
      toast.error(e.response.data.message);
      console.log(e);
      setLoading(false);
    }

  }
  if(isAuthanticated){
    return <Navigate to={'/'}/>
  }
  return (
<>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='text-[#00df9a] text-[20px] font-bold text-center'>Blogman.</h1>
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register here !
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister} method="POST" >
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading?<Loader/> :<p>Register</p>}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member ?
            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to='/login' > login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
