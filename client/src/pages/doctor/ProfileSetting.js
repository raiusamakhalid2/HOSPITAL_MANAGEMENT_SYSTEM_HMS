import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { TimeSlots } from "../../functions/Functions";
import Map from "../../components/autolocation/AutoLocation";


export default function ProfileSetting() {
    const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [dbcategory, setDbCategory] = useState([]);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState();
  const [exp, setExp] = useState();
  const [description, setDescription] = useState();
  const [fee, setFee] = useState();
  const [education, setEducation] = useState();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const navigate = useNavigate();
  const id = user.userId

  const handlePostion = (pos)=>{
    setLocation(pos)
  }

  useEffect(() => {
    const getbyid = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/doctor/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setGender(response.data.gender);
        setExp(response.data.experience);
        setImg(response.data.image);
        setCategory(response.data.category);
        setFee(response.data.fee);
        setEducation(response.data.education);
        setDescription(response.data.description);
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

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("experience", exp);
    formData.append("category", category);
    formData.append("address", address);
    formData.append("location", location);
    formData.append("description", description)
    formData.append("fee", fee);
    formData.append("image", img);
    formData.append("education", education);
    formData.append("timeslot", selectedTimeSlots);

    console.log('before submit',formData);
    await axios.patch(`http://localhost:4000/doctor/${id}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    try {
      navigate("/doctor");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-content-one">
      <div className="breadcrumbs-area">
        <h3>Profile</h3>
        <ul>
          <li>
            <Link to="/doctor">Home</Link>
          </li>
          <li>Edit Profile</li>
        </ul>
      </div>

      {/* Admit Form Area Start Here */}
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Edit Profile</h3>
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
                <label>Checkup Fee *</label>
                <input
                  type="number"
                  placeholder="Enter Fee"
                  className="form-control"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  required="required"
                />
              </div>

              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Education *</label>
                <input
                  type="text"
                  placeholder="Enter Education"
                  className="form-control"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
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
                  required
                  value={category}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue !== "") {
                      setCategory(selectedValue);
                    }
                  }}
                >
                  <option value="">Select Category</option>
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
                <input type="file" className="form-control-file"
                onChange={(e)=> setImg(e.target.files[0])}
                required="required"/>
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

              <div className="col-xl-4 col-lg-8 col-12 form-group">
                <label>Description</label>
                <textarea
                  className="textarea form-control"
                  name="description"
                  id="form-address"
                  cols="6"
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

              <div className="col-xl-6 col-lg-6 col-12 form-group">
                <Map setPostion={handlePostion}/>
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
