import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './sidebar.css'


const AdminSideBar = () => {
  const [activeLink, setActiveLink] = useState('/admin/dashboard'); 

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };


  return (
    <div className='hader-main-div'>
     
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#4761C2">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/admin/dashboard" className="text-decoration-none logodig">
              <i className="fa-solid fa-truck-medical"></i>
              GLORIUM
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              
              <NavLink
                to="/admin/dashboard"
                className={activeLink === '/admin/dashboard' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/admin/dashboard')}
              >
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/admin/doctor"
                className={activeLink === '/admin/doctor' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/admin/doctor')}
              >
                <CDBSidebarMenuItem icon="user">Doctors</CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/admin/catogery"
                className={activeLink === '/admin/catogery' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/admin/catogery')}
              >
                <CDBSidebarMenuItem icon="table">Categories</CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
          </CDBSidebarContent>

          {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter> */}
        </CDBSidebar>
      </div>
    </div>
  );
};

export default AdminSideBar;
