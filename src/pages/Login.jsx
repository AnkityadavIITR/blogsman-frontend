import React from 'react'
import { useState, useContext } from 'react'
import {Link , Navigate} from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../main';
import { Context } from '../main';


const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {isAuthanticated ,setIsAuthanticated,loading,setLoading,user,setUser}=useContext(Context)

    const handleLogin=async(e)=>{
      e.preventDefault()
        const formdata=new FormData();
        formdata.append("email",email);
        formdata.append("password",password);

        console.log("sending the req");
        try{
          setLoading(true);
          console.log(loading);
            const {data}=await axios.post(
                `${server}/user/login`,
                formdata,
                {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                } 
            )
            console.log(data);
            if(data.success){
              setIsAuthanticated(true);
              setUser(data.user);
              toast.success(data.message);
              setLoading(false);
            }else toast.error(data.message);
        }catch(e){

          console.log(e.response.data.message);
            toast.error("can't request login");
            setLoading(false)
        }
    }

    if(isAuthanticated){
      return <Navigate to={'/'}/>
    }
  return (
<>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin} method="POST" >
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
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
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center disabled:opacity-50 rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to={'/register'}>signup</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
