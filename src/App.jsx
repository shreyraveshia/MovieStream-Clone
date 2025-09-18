import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth' // "Adds an observer for changes to the user's sign-in state."
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const navigate= useNavigate();         // using this useNavigate hook, we cann re-direct the users


  // after sign-up our website should re-direct to the home-page. So we will use onAuthStateChanged method.
  useEffect( () =>{
    onAuthStateChanged(auth, async(user) =>{
      if(user){   // if user is available
        console.log("Logged In");    // when the user is available, in that case we will redirect the users on the homepage by use-Navigate hook.
        navigate('/');
      } else{    // if user is not available
        console.log(" Logged Out")
        navigate('/login');
      }
    })
  },[])

  return (
    <div> 
       <ToastContainer theme='dark' />   {/*so that we will get toast notification in dark color. */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
     
   </div>
  )
}

export default App