import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState()

useEffect(() => {
    const myDoctor = async()=> {
      const res = await axios.get("http://localhost:4000/category");
      setCategories(res.data)
    }
    myDoctor()
},[])

const handleDelete = async (id) => {
    await axios.delete('http://localhost:4000/category/' + id)
      .then(res => {
        setCategories((prevDoctors) => prevDoctors.filter((item) => item.id !== id));
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="dashboard-content-one">
      {/* Breadcubs Area Start Here */}
      <div className="breadcrumbs-area">
        <h3>Doctors</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>All Categories</li>
        </ul>
      </div>
      {/* Breadcubs Area End Here */}
      {/* Teacher Table Area Start Here */}
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>All Categories</h3>
            </div>
          </div>
          <form className="mg-b-20">
            <div className="row gutters-8" >
              <div className="col-3-xxxl col-xl-3 col-lg-3 col-12 form-group">
                <input type="text" placeholder="Search by Name ..." className="form-control" />
              </div>
              <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
                <button className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">SERCH</button>
	          </div>
              <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
                <Link className="btn-fill-lg bg-blue btn-hover-yellow" to="/admin/addcatogery" style={{marginLeft:"50px"}}><i className="fas fa-user-plus"></i></Link>
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                    {categories && categories.map((category, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td>
                        <Link className="btn btn-xs btn-info" to={`/admin/editcatogery/${category.id}`}><i className="far fa-edit"></i></Link>
                        <Link className="btn btn-danger btn-xs" onClick={(e) => handleDelete(category.id)}><i className="fas fa-trash-alt"></i></Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
