import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './catbasedoc.css'

export default function CatogriesBasDoctor() {
  const { name } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  const [showNearbyDoctors, setShowNearbyDoctors] = useState(false);




  const handleButtonClick = () => {
    setShowNearbyDoctors(!showNearbyDoctors);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

            const nearbyDoctors = doctors.filter((doctor) => {
            const doctorLocation = parseLatLngString(doctor.location);
            if (doctorLocation) {
              const distance = calculateDistance(userLat, userLng, doctorLocation.lat, doctorLocation.lng);
              return distance <= 100; // 2km radius
            }
            return false;
          });

          setNearbyDoctors(nearbyDoctors);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const parseLatLngString = (latLngString) => {
    const match = latLngString.match(/LatLng\(([^,]+),\s([^)]+)\)/);
    if (match) {
      return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }
    return null;
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };


  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get(`http://localhost:4000/doctor/category/${name}`);
      try {
        setDoctors(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, [name]);


return (
  <div className="dashboard-content-one" style={{ minHeight: '71.2vh' }}>
    <div className="breadcrumbs-area">
      <h3>{name}</h3>

    </div>

    <div>
    <button  onClick={handleButtonClick} className={showNearbyDoctors? "btn-fill-md radius-30 text-light bg-blue" :"btn-fill-md radius-30 text-light bg-orange-peel"}>Near Me<i className="fa-solid fa-location-dot" style={{marginLeft:'10px'}}></i></button>
      {showNearbyDoctors ? (
        <>
      { nearbyDoctors && nearbyDoctors.map((doctor,index) => (
          <div className="container" key={index}>
            <div className="card height-auto">
              <div className="card-body">
                <div className="doctor-imge">
                  <img src={`http://localhost:4000/doctor/doctorimage/${doctor.imageUrl}`} alt=""></img>
                  <div className="doctor-detail">
                    <h4>Dr.{doctor.name}</h4>
                    <p>{doctor.category.name}</p>
                    <p>{doctor.education} ({doctor.category.name})</p>
                    <div style={{display:"flex"}}>
                    <div style={{width:"200px"}}>
                    <h5 className="experence-detail">Under 15 Min<p>Wait Time</p></h5>
                    </div>
                    <div className="inside-div-class">
                    <h5 className="experence-detail">{doctor.experience} years<p>Experience</p></h5>
                    </div>
                    <div>
                    <h5 className="experence-detail">100%<p>Satisfaction</p></h5>
                    </div>
                    </div>
                  </div>
                  <div className="doc-cat-btn">
                  <Link to={`/detail/${doctor.id}`} className="btn-fill-lg text-blue border-dodger-blue ">View Profile</Link>
                  <Link to={`/appointment/${doctor.id}`} className="btn-fill-lg btn-gradient-yellow btn-hover-yellow">Book Appointment</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
        </>
      ) : (

        doctors && doctors.map((doctor,index) => (
          <div className="container" key={index}>
            <div className="card height-auto">
              <div className="card-body">
                <div className="doctor-imge">
                  <img src={`http://localhost:4000/doctor/doctorimage/${doctor.imageUrl}`} alt=""></img>
                  <div className="doctor-detail">
                    <h4>Dr.{doctor.name}</h4>
                    <p>{doctor.category.name}</p>
                    <p>{doctor.education} ({doctor.category.name})</p>
                    <div style={{display:"flex"}}>
                    <div style={{width:"200px"}}>
                    <h5 className="experence-detail">Under 15 Min<p>Wait Time</p></h5>
                    </div>
                    <div className="inside-div-class">
                    <h5 className="experence-detail">{doctor.experience} years<p>Experience</p></h5>
                    </div>
                    <div>
                    <h5 className="experence-detail">100%<p>Satisfaction</p></h5>
                    </div>
                    </div>
                  </div>
                  <div className="doc-cat-btn">
                  <Link to={`/detail/${doctor.id}`} className="btn-fill-lg text-blue border-dodger-blue ">View Profile</Link>
                  <Link to={`/appointment/${doctor.id}`} className="btn-fill-lg btn-gradient-yellow btn-hover-yellow">Book Appointment</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
      )}
    </div>
  </div>
);
}