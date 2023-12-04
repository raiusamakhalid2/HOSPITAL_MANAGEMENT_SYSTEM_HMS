import React from 'react'
import Mainroutes from '../main-routes/Mainroutes'
import { useLocation } from 'react-router';
import Navbar from '../nevbar/Navbar';
import Footer from '../footer/Footer';

export default function UserLayout() {

  

    
  
    const location      = useLocation();
    const isLoginPage   = location.pathname === '/login';
    const isSignpage    = location.pathname === '/signup'
    const messenger    = location.pathname === '/messanger'
    const videocall    = location.pathname === '/videocall'
    const PageNotFound  = location.pathname === '/404'
    const isVerified    = location.pathname.startsWith('/verify') 
  
  return (
    <>
    {isLoginPage || isVerified || isSignpage || PageNotFound ? null : <Navbar />}

        <Mainroutes/>

    {isLoginPage || isVerified || isSignpage || messenger || videocall || PageNotFound ? null : <Footer />}
        
    </>
  )
}
