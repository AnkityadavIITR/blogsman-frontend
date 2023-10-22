import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'primeicons/primeicons.css';
        
import { createContext,useState } from 'react'

export const server='https://blogsman-nodejsapp.onrender.com'

export const Context=createContext();
const Appwraper=()=>{
  const [isAuthanticated,setIsAuthanticated]=useState(false);
  const [loading,setLoading]=useState(false);
  const [user,setUser]=useState({});

  return(
    <Context.Provider value={{isAuthanticated,setIsAuthanticated,loading,setLoading,user,setUser}}>
      <App/>
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwraper/>
  </React.StrictMode>,
)
