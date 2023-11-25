import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'primeicons/primeicons.css';
        
import { createContext,useState } from 'react'
import { Navigate } from 'react-router-dom';

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

      const dataFromStorage = JSON.parse(localStorage.getItem('your_key'));
      if (dataFromStorage) {
           const currentTime = new Date().getTime();

           const timeElapsed = currentTime - dataFromStorage.timestamp;
          if (timeElapsed > 60 * 60 * 1000) {
            localStorage.removeItem('your_key');
            localStorage.clear();
          } 
        }
    }
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
