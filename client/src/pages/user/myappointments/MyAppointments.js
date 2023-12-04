import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { getTimeSlot } from "../../../functions/Functions";
import '../../../App.css'


export default function MyAppointments() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const [date, setDate] = useState(formattedDate);
  const [bookedAppointment, setBookedAppointment] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookedAppointment = async () => {
      const res = await axios.get(`http://localhost:4000/appointment/patient/${user.userId}`,{
          params: {
            date: date,
          },
        }
      );
      try {
        setBookedAppointment(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookedAppointment();
  }, [date, user.userId]);


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`http://localhost:4000/appointment/${id}`);
        setBookedAppointment((prevAppointments) =>
          prevAppointments.filter((item) => item.id !== id)
        );
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  return (
    <div className="dashboard-content-one" style={{minHeight:'71.2vh'}}>
      <div className="breadcrumbs-area">
        <ul>
          <li>
          </li>
            </ul>
      </div>

      <div className="container" style={{ width: "90rem", marginTop: "0px" }}>
        <div className="card height-auto">
          <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>My Appointments</h3>
            </div>
          </div>
            <div style={{ borderBottom: "2px solid gray" }}>
              <div
                className="col-xl-6 form-group"
                style={{ marginBottom: "40px" }}
              >
                <label>Select Appointment Date:</label>
                <input
                  type="date"
                  className="form-control air-datepicker"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor Name</th>
                  <th>Doctor Phone</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                    {bookedAppointment && bookedAppointment.map((time, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Dr.{time.doctor.name}</td>
                        <td>{time.doctor.phone}</td>
                        <td>{getTimeSlot(time.bookedsloot)}</td>
                        <td className="btn-fill-mddd radius-30 text-light" style={{backgroundColor: 
                          time.status === 'Pending' ? '#ffae01' :
                          time.status === 'Approved' ? 'green' :
                          time.status === 'Cancelled' ? 'red' :
                          'inherit' ,padding: '1px 10px'
                        }}>
                          {time.status}
                        </td>
                        {/* <td>
                            <h1>{new Date(dbdate)}</h1>
                            {new Date(time.date) !== formattedDate && (
                            <Link className="btn btn-danger btn-xs" onClick={(e) => handleDelete(time.id)}>
                                <i className="fas fa-trash-alt"></i>
                            </Link>
                            )}
                        </td> */}
                        <td>
                        <Link className="btn btn-danger btn-xs" onClick={(e) => handleDelete(time.id)}><i className="fas fa-trash-alt"></i></Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
