import React from "react";
import Slider from "../../../components/slider/Slider";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <>
      <Slider />
      <div className="container">
        <h2>Find doctors by health concern</h2>
        <div className="row" style={{marginTop:"50px"}}>
          <Link className="col-6 col-sm-3 myconsern-item" to={`/categories/Gynecologist`}><i className="fa-solid fa-person-pregnant"></i>
          <p>Gynecologist</p></Link>
          <Link className="col-6 col-sm-3 myconsern-item" to={`/categories/Child Specialist`}><i className="fa-solid fa-child"></i>
          <p>Child Specialist</p></Link>
          <Link className="col-6 col-sm-3 myconsern-item" to={`/categories/Eye Specialist`}><i className="fa-regular fa-eye"></i>
          <p>Eye Specialist</p></Link>
          <Link className="col-6 col-sm-3 myconsern-item" to={`/categories/Orthopedic Surgeon`}><i className="fa-solid fa-bone"></i>
          <p>Orthopedic Surgeon</p></Link>
          <Link className="col-6 col-sm-3 myconsern-item" to={`/categories/Dermatologists`}><i className="fa-solid fa-hand-dots"></i>
          <p>Dermatologists</p></Link>
          <Link className="col-6 col-sm-3 myconsern-item" to={`/categories/Cardiologists`}><i className ="fa-solid fa-heart-pulse"></i>
          <p>Cardiologists</p></Link>
        </div>
      </div>
    </>
  );
}
