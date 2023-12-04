import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./topbar.css";
import AuthContext from "../../context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import  axios  from "axios";

export default function Topbar() {
  const { user, setUser } = useContext(AuthContext);
  const [image , setImage] = useState(undefined)
  const navigate = useNavigate();
  
  const username = user?.name || "Username";
  const handlelogout = () => {
    localStorage.clear();
    setUser(false);
    navigate("/login");
  };

  useEffect(()=>{
    if(user?.Access_Type === "Doctor"){
    const data = async () => {
      const res = await axios.get(`http://localhost:4000/doctor/${user.userId}`)
      try {
        setImage(res.data.imageUrl)
      } catch (error) {
       console.log(error) 
      }
    }
    data()
  }
  },[user?.Access_Type,user?.userId])

  return (
    <div className="topbar">
      <div className="topbarcontent">
      <img src={`http://localhost:4000/doctor/doctorimage/${image}`} alt="Admin" />
        <NavDropdown title={username} id="basic-nav-dropdown" style={{marginTop:'10px'}}>
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" onClick={handlelogout}>Log Out</NavDropdown.Item>
         </NavDropdown>
      </div>
    </div>
  );
}
