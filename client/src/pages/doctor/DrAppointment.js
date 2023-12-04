import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { getTimeSlot } from "../../functions/Functions";

export default function DrAppointment() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const [date, setDate] = useState(formattedDate);
  const [bookedAppointment, setBookedAppointment] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookedAppointment = async () => {
      const res = await axios.get(
        `http://localhost:4000/appointment/${user.userId}`,
        {
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
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Booked Appointment</li>
        </ul>
      </div>

      <div className="container" style={{ width: "90rem", marginTop: "0px" }}>
        <div className="card height-auto">
          <div className="card-body">
            <div style={{ borderBottom: "2px solid gray" }}>
              <div
                className="col-xl-6 form-group"
                style={{ marginBottom: "40px" }}
              >
                <label>Select Appointment Date</label>
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
                  <th>Patient Name</th>
                  <th>Patient Phone</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                    {bookedAppointment && bookedAppointment.map((time, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time.patient.name}</td>
                        <td>{time.patient.phone[0]}</td>
                        <td>{getTimeSlot(time.bookedsloot)}</td>
                        <td className="btn-fill-mddd radius-30 text-light" style={{backgroundColor: 
                          time.status === 'Pending' ? '#ffae01' :
                          time.status === 'Approved' ? 'green' :
                          time.status === 'Cancelled' ? 'red' :
                          'inherit' , padding: '1px 10px'
                        }}>
                          {time.status}
                        </td>
                        <td>
                        <Link className="btn btn-xs btn-info" to={`/doctor/editappointment/${time.id}`}><i className="far fa-edit"></i></Link>
                        <Link className="btn btn-danger btn-xs" onClick={(e) => handleDelete(time.id)}><i className="fas fa-trash-alt"></i></Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
          </div>
            {/* <div className="book-appoin-date">
              {bookedAppointment &&
                bookedAppointment.map((time, index) => (
                  <button
                    className="show-date-btn"
                    key={index}
                    onClick={(e) => handleDelete(time.id)}
                  >
                    {getTimeSlot(time.bookedsloot)}
                  </button>
                ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
