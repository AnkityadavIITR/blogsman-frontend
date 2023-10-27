import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'primeicons/primeicons.css';
        
import { createContext,useState } from 'react'

export const server='https://blogsman-nodejsapp.onrender.com'

export const Context=createContext();
const Appwraper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [loading,setLoading]=useState(false);
  const [user,setUser]=useState({});
  const [posts,setPosts]=useState([]);

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
    console.log("user",user);
    const userdata=JSON.parse(window.localStorage.getItem("user_data"));
    if(userdata && userdata?.photo && userdata?.photo?.url){
       setUser(userdata);
    }

  },[isAuthenticated])
  return(
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser,posts,setPosts}}>
      <App/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwraper/>
  </React.StrictMode>,
)
