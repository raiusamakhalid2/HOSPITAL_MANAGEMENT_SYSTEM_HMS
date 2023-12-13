import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nevbar.css'
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

export default function Navbar() {
  const [categories, setCategories] = useState()
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:4000/category");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handlelogout = ()=> {
      localStorage.clear();
      setUser(false);
      navigate('/login')
  }

  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light navbarexpandlg">
  <div className="container-fluid">
    <Link className="navbar-brand nevbar-logo" to="/"><i className="fa-solid fa-truck-medical"></i> GLORIUM</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item margin-nev">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/messanger">Messages</Link>
        </li>
        <NavDropdown title="Doctors" id="basic-nav-dropdown">
        {categories && categories.map((category,index) => (
              <li key={index}>
                <Link className="dropdown-item" to={`/categories/${category.name}`}>{category.name}</Link>
                </li>
            ))}
        </NavDropdown>
        <li className="nav-item">
          <Link className="nav-link" to="/myapointment">My Appointments</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/videocall">videocall</Link>
        </li>

      </ul>
      <form className="d-flex">
        <a onClick={handlelogout} className="btn btn-outline-primary">LogOut<i className="fa-solid fa-right-from-bracket" style={{padding:"8px"}}></i></a>
      </form>
    </div>
  </div>
</nav>
</>
  )
}
