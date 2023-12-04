import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getbyid = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/category/${id}`);
        setName(response.data.name);
      } catch (err) {
        console.error(err);
      }
    };

    getbyid();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
    };

    await axios.patch(`http://localhost:4000/category/${id}`, data);
    try {
      navigate("/admin/catogery");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Categories</h3>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>Edit Category</li>
        </ul>
      </div>

      {/* Admit Form Area Start Here */}
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Edit Category</h3>
            </div>
          </div>
          <form className="new-added-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label> Category Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Category Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12 form-group mg-t-8">
                <button
                  className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
                  type="submit"
                >
                  Save
                </button>
                <button
                  type="reset"
                  className="btn-fill-lg bg-blue btn-hover-yellow"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;