import React, { useEffect, useState } from 'react'
import SideBar from '../sidebar/AdminSideBar'
import Topbar from '../topbar/Topbar'
import Mainroutes from '../main-routes/Mainroutes'
import { useLocation, useNavigate } from 'react-router';
import { USER_TYPES } from '../protected/Protected';
import { decodeToken } from 'react-jwt';
import AuthContext from '../../context/AuthContext';

export default function AdminLayout() {

    
  
    const location      = useLocation();
    const isLoginPage   = location.pathname === '/login';
    const isSignpage    = location.pathname === '/signup'
    const PageNotFound  = location.pathname === '/404'
    const isVerified    = location.pathname.startsWith('/verify/') 
  
  return (


    <div className='mycontainer'>
    {isLoginPage || isVerified || isSignpage || PageNotFound ? null : <SideBar />}
    <div className='pagecontainer'>
    {isLoginPage || isVerified || isSignpage || PageNotFound ? null : <Topbar />}

        <Mainroutes/>
        
        </div>
        </div>
  )
}
