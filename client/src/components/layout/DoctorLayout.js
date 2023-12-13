import React from 'react'
import Topbar from '../topbar/Topbar'
import Mainroutes from '../main-routes/Mainroutes'
import { useLocation } from 'react-router';
import DoctorSideBar from '../sidebar/DoctorSideBar';


export default function DoctorLayout() {

  

    

    
  
    const location      = useLocation();
    const isLoginPage   = location.pathname === '/login';
    const isSignpage    = location.pathname === '/signup'
    const PageNotFound  = location.pathname === '/404'
    const isVerified    = location.pathname.startsWith('/verify/') 
  
  return (


    <div className='mycontainer'>
    {isLoginPage || isVerified || isSignpage || PageNotFound ? null : <DoctorSideBar/>}
    <div className='pagecontainer'>
    {isLoginPage || isVerified || isSignpage || PageNotFound ? null : <Topbar />}

        <Mainroutes/>
        
        </div>
        </div>
  )
}
