import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { TimeSlots } from "../../../functions/Functions";
import axios from "axios";

const EditDoctor = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [dbcategory, setDbCategory] = useState([]);
  const [address, setAddress] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getbyid = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/doctor/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setGender(response.data.gender);
        setAge(response.data.age);
        // setCategory(response.data.category);
        setAddress(response.data.address);
      } catch (err) {
        console.error(err);
      }
    };

    getbyid();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:4000/category");
      setDbCategory(res.data);
    };
    fetchCategories();
  }, []);


  const handleTimeSlotChange = (slotId) => {
    const updatedTimeSlots = selectedTimeSlots.includes(slotId)
      ? selectedTimeSlots.filter((id) => id !== slotId)
      : [...selectedTimeSlots, slotId];

    setSelectedTimeSlots(updatedTimeSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      password,
      gender,
      age,
      category,
      address,
      timeslot: selectedTimeSlots,
    };
    console.log('before submit',data);
    const res = await axios.patch(`http://localhost:4000/doctor/${id}`, data);
    console.log('data is',res.data)
    try {
      navigate("admin/doctor");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Doctors</h3>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>Edit Doctor</li>
        </ul>
      </div>

      {/* Admit Form Area Start Here */}
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Edit Doctor</h3>
            </div>
          </div>
          <form className="new-added-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label> Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  required="required"
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label> Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required="required"
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder=""
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Gender *</label>
                <select
                  className="form-control form-select"
                  id="gender"
                  name="gender"
                  value={gender}
                  autoComplete="off"
                  onChange={(e) => setGender(e.target.value)}
                  required="required"
                >
                  <option disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter PhoneNo"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required="required"
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Age *</label>
                <input
                  type="number"
                  placeholder="Enter Age"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required="required"
                />
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Category *</label>
                <select
                  className="form-control form-select"
                  id="category"
                  name="category"
                  autoComplete="off"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required="required"
                >
                  <option value={category.id}>
                    Select Category
                    </option>
                    {dbcategory.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
               </div>

              {/* 
			  <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label className="text-dark-medium">
                  Upload Photo (150px X 150px)
                </label>
                <input type="file" className="form-control-file" />
              </div> */}

              <div className="col-xl-4 col-lg-8 col-12 form-group">
                <label>Address</label>
                <textarea
                  className="textarea form-control"
                  name="address"
                  id="form-address"
                  cols="6"
                  rows="6"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required="required"
                ></textarea>
              </div>

              <div className="col-xl-6 col-lg-12 col-12 form-group">
                <label>TimeSlots *</label>
                <div className="row">
                  {TimeSlots.map((slot) => (
                    <div className="col-md-4" key={slot.id}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={slot.id}
                          id={`timeslot-${slot.id}`}
                          checked={selectedTimeSlots.includes(slot.id)}
                          onChange={() => handleTimeSlotChange(slot.id)}
                          required="required"
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`timeslot-${slot.id}`}
                        >
                          {slot.time}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
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

export default EditDoctor;
