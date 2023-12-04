import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function EditDrAppointment() {
    const { id } = useParams();
    const [status, setStatus] = useState("");
  
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   const getbyid = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:4000/appointment/${id}`);
    //       setStatus(response.data.status);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
  
    //   getbyid();
    // }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        status,
      };
  
      await axios.patch(`http://localhost:4000/appointment/${id}`, data);
      try {
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="dashboard-content-one">
        <div className="breadcrumbs-area">
          <h3>Appointments</h3>
          <ul>
            <li>
              <Link to="/doctor">Home</Link>
            </li>
            <li>Edit Appointment</li>
          </ul>
        </div>
  
        {/* Admit Form Area Start Here */}
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Edit Appointment</h3>
              </div>
            </div>
            <form className="new-added-form" onSubmit={handleSubmit}>
              <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Status *</label>
                <select
                  className="form-control form-select"
                  id="status"
                  name="status"
                  value={status}
                  autoComplete="off"
                  onChange={(e) => setStatus(e.target.value)}
                  required="required"
                >
                  <option disabled>Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Resolved">Cancelled</option>
                </select>
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
  )
}
