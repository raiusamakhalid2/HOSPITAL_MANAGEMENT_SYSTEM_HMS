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


const DoctorSideBar = () => {
  const [activeLink, setActiveLink] = useState('/doctor'); 

  const handleNavLinkClick = (link) => {
    console.log('Clicked link:', link); 
    setActiveLink(link);
  };


  return (
    <div className='hader-main-div'>
     
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#4761C2">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/doctor" className="text-decoration-none logodig">
              <i className="fa-solid fa-truck-medical"></i>
              GLORIUM
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                to="/doctor"
                className={activeLink === '/doctor' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/doctor')}
              >
                <CDBSidebarMenuItem icon="columns">Appointments</CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/doctor/messanger"
                className={activeLink === '/doctor/messanger' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/doctor/messanger')}
              >
                <CDBSidebarMenuItem icon="table">Message</CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/doctor/profile"
                className={activeLink === '/doctor/profile' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/doctor/profile')}
              >
                <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/doctor/videocall"
                className={activeLink === '/doctor/videocall' ? 'activeClicked' : ''}
                onClick={() => handleNavLinkClick('/doctor/videocall')}
              >
                <CDBSidebarMenuItem icon="user">Video Call</CDBSidebarMenuItem>
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

export default DoctorSideBar;
