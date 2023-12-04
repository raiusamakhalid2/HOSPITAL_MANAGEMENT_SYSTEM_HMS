import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TimeSlots } from "../../../functions/Functions";
import axios from "axios";
import Alert from "../../../components/alert/Alert";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [dbcategory, setDbCategory] = useState([]);
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [exp, setExp] = useState();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [Error, setError] = useState();

  const showError = (message, colour) => {
    setError({ message, colour });
    setTimeout(() => {
      setError(null);
    }, 1500);
  };


  const navigate = useNavigate();

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("experience", exp);
    formData.append("category", category);
    formData.append("address", address);
    formData.append("image", image);
    formData.append("timeslot", selectedTimeSlots);

    try {
    const res = await axios.post("http://localhost:4000/doctor", formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }); 

      console.log(res);
      if(res.data.status === 404){
        showError(res.data.message, "danger");
      }else{
        navigate("/admin/doctor");
      }
      
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
          <li>Add Doctor</li>
        </ul>
      </div>

      <div style={{ height: "50px", marginBottom: "10px" }}>
            {Error && <Alert alert={Error} />}
      </div>

      {/* Admit Form Area Start Here */}
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Add New Doctor</h3>
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
                <label>Experience *</label>
                <input
                  type="number"
                  placeholder="Enter Experience"
                  className="form-control"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
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
                  <option value="" disabled>
                    Select Category
                  </option>
                  {dbcategory.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label className="text-dark-medium">
                  Upload Photo (150px X 150px)
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required="required"
                />
              </div>

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

export default AddDoctor;
