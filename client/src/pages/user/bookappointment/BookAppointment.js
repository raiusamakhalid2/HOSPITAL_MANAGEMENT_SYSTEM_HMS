import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "../categories/catbasedoc.css";
import { getTimeSlot } from "../../../functions/Functions";
import AuthContext from "../../../context/AuthContext";

export default function BookAppointment() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [date, setDate] = useState(formattedDate)
  const [bookedAppointment, setBookedAppointment] = useState([])
  const { user } = useContext(AuthContext);

  const handleButtonClick = (timeSlotId) => {
    setSelectedTimeSlot(timeSlotId);
  };


  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await axios.get(`http://localhost:4000/doctor/${id}`);
      setDoctor(res.data);
    };
    fetchDoctor();
  }, [id]);

  useEffect(() => {
    const fetchBookedAppointment = async () => {
      const res = await axios.get(`http://localhost:4000/appointment/${id}`, {
        params: {
          date: date,
        },
      });
      try {
        setBookedAppointment(res.data);
      } catch (error) {
        console.error(error)
      }
    };
    
    fetchBookedAppointment();
  }, [date,id]);
  

  const handleOnBookAppointment = async () => {
    const data={
      bookedsloot:selectedTimeSlot,
      bookingdate:date,
      doctor:doctor.id,
      patient:user.userId

    }
    
    await axios.post(`http://localhost:4000/appointment`,data)
      try {
        window.location.reload();
        // navigate('/myapointment')
        
      } catch (error) {
        console.error(error)
      }

    }

    function isTimeBooked(time) {
      return bookedAppointment.some(item => item.bookedsloot === parseInt(time));
    }

    
  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <ul>
          <li>Book Appointment</li>
        </ul>
      </div>

      <div className="container" style={{ width: "90rem" }}>
        <div className="card height-auto">
          <div className="card-body">
            <div className="doctor-imge">
              {doctor &&
              <img src={`http://localhost:4000/doctor/doctorimage/${doctor.imageUrl}`} alt=""></img>
                }
              <div className="doctor-detail">
                <h4>Dr.{doctor.name}</h4>
                <p>{doctor.address}</p>
                <p>Fee: Rs. {doctor.fee}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ width: "90rem", marginTop: "0px" }}>
        <div className="card height-auto">
          <div className="card-body">
            <div style={{ borderBottom: "2px solid gray" }}>
              <div className="col-xl-6 form-group" style={{ marginBottom: "40px" }}>
                <label>Select Appointment Date</label>
                <input type="date" className="form-control air-datepicker" 
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={formattedDate}
                />
              </div>
            </div>
            <div className="book-appoin-date">
              {doctor && doctor.timeslot && doctor.timeslot.map((time,index) =>(
              <button className={`${isTimeBooked(time)?'show-date-btn book':'show-date-btn' }`} disabled={isTimeBooked(time)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" key={index} id = {time}
              onClick={() => handleButtonClick(time)}
              >{getTimeSlot(time)}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Book Appointment</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        {selectedTimeSlot && (
                <>
                  You appointment is with <span style={{ fontWeight: "bold" }}>Dr.{doctor.name}</span> at {date} : {getTimeSlot(selectedTimeSlot)}
                </>
              )}        
              </div>
        <div className="modal-footer">
        <button className="btn btn-primary" onClick={handleOnBookAppointment}>Confirm</button>
        </div>
      </div>
    </div>
  </div>

    </div>
  );
}
