import React from 'react'
import './slider.css'
import  slider1  from '../../images/slider/slider1.jpg'
import  slider2  from '../../images/slider/slider2.jpg'
import  slider3  from '../../images/slider/slider3.jpg'

export default function Slider() {
  return (
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner" >
    <div className="carousel-item active">
      <img src={slider1} className="d-block w-100 slider-img-size" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h4>Find and book the best doctors near you</h4>
        <p>Health Tip: Stay hydrated to support bodily function.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={slider2} className="d-block w-100 slider-img-size" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h4>Find and book the best doctors near you</h4>
        <p>Health Tip: Exercise regularly for better physical health.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={slider3} className="d-block w-100 slider-img-size" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h4>Find and book the best doctors near you</h4>
        <p>Health Tip: Maintain a balanced diet for optimal health.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}
