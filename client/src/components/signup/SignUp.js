import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";
import "./signup.css";
import Alert from "../alert/Alert";

export default function SignUp() {
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const [name, setname] = useState();
  const [Emailexist, setEmailexist] = useState();
  const [Error, setError] = useState();

  const showError = (message, colour) => {
    setError({ message, colour });
    setTimeout(() => {
      setError(null);
    }, 1500);
  };

  const {register,handleSubmit,formState: { errors },} = useForm();

  const registerOptions = {
    email: {
      required: "Email cannot be empty",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address format",
      },
    },
    password: {
      required: "Password cannot be empty",
      minLength: {
        value: 5,
        message: "Password must be at least 5 characters",
      },
    },
    name: {
      required: "Name cannot be empty",
    }

  };
  const navigate = useNavigate();
  const Submit = async (data) => {
    console.log("this is data:",name);
    const hashedPassword = bcrypt.hash(await data.password, 10);
    const formData = {
      email: data.email,
      name: data.name,
      password: await hashedPassword,
      phone: phoneNumbers,
    };
    try {
      const response = await axios.post("http://localhost:4000/patient",formData);
      if (response.data.status === 404) {
        setEmailexist(response.data.message);
      } else {
        const emailVerifictation = response.data;
        localStorage.setItem("emailVerifictation", JSON.stringify(emailVerifictation));
        showError("Sucessfully signup go to email to verify", "success");
        window.location.reload();
        window.location.href = '/login';
      }
    } catch (err) {
      console.error(err);
    }
  };

  // <--------------handlePhoneNumber Start------------------->
  const addField = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const removeField = (index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleChange = (value, index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  // <--------------handlePhoneNumber End------------------->

  return (
    <>
      <div className="login-page-wrap">
        <div className="login-page-content">
          <div style={{height:'50px', marginBottom:'10px'}}>{Error&&<Alert alert={Error}/>}</div>
          <div className="login-box">
            <div className="logsign-logo">
              <i className="fa-solid fa-truck-medical"></i> GLORIUM
            </div>
            <form className="login-form" onSubmit={handleSubmit(Submit)} method="post">
            <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Name"
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                  {...register("name", registerOptions.name)}
                />
                <i className="fa-solid fa-user"></i>
                <small className="text-danger">
                  {errors?.name && errors.name.message}
                </small>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  {...register("email", registerOptions.email)}
                />
                <i className="far fa-envelope"></i>
                <small className="text-danger">
                  {(errors?.email && errors.email.message) || Emailexist}
                </small>
              </div>

              <div className="form-group">
                <label>Phone</label>
                {phoneNumbers.map((phoneNumber, index) => (
                  <div key={index} className="phonenofield">
                    <input
                      type="text"
                      value={phoneNumber}
                      placeholder="Enter Phone no."
                      className="form-control"
                      onChange={(e) => handleChange(e.target.value, index)}
                    />
                    {index === 0 && phoneNumbers.length < 3 && (
                      <button className="btn btn-primary" onClick={addField}>
                        +
                      </button>
                    )}
                    {index > 0 && (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => removeField(index)}
                        >
                          -
                        </button>
                        {index === 0 && phoneNumbers.length < 3 && (
                          <button
                            className="btn btn-primary"
                            onClick={addField}
                          >
                            +
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  className="form-control"
                  onChange={(e) => setpassword(e.target.value)}
                  {...register("password", registerOptions.password)}
                />
                <i className="fas fa-lock"></i>
                <small className="text-danger">
                  {errors?.password && errors.password.message}
                </small>
              </div>
              <div className="form-group">
                <button className="login-btn">Sign Up</button>
              </div>
            </form>
          </div>
          <div className="sign-up">
            Already have an account ? <Link to="/login">Login now!</Link>
          </div>
        </div>
      </div>
    </>
  );
}
