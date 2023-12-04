import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "../login/login.css";
import Alert from "../alert/Alert";
import { decodeToken } from "react-jwt";


export default function CreatNewPassword() {
    const { token } = useParams();
    const [Error, setError] = useState();
    const storedToken = localStorage.getItem("forgetpasswordToken");
    const navigate = useNavigate()

  const showError = (message, colour) => {
    setError({ message, colour });
    setTimeout(() => {
      setError(null);
    }, 1500);
  };

  useEffect(() => {
    const mytoken =  JSON.parse(storedToken)
    if (mytoken !== token) {
      navigate('/404')
    }

  }, []);

  const {register,handleSubmit,formState: { errors }} = useForm();

  const registerOptions = {
    password: {
      required: "Password cannot be empty",
      minLength: {
        value: 5,
        message: "Password must be at least 10 characters",
      },
    },
    confirm_Password: {
      required: "Confirm Password cannot be empty",
      validate: (value, { password }) => {
        if (value === password) {
          return true;
        } else {
          return "Passwords do not match";
        }
      },
    },
  };
  

 

  const location = useLocation();
  const Submit = async (data) => {

    const { password, confirm_Password } = data;
    const user = decodeToken(token);
    if (password === confirm_Password) {
        const formData = {
          password,
        };
    try {

      const response = await axios.patch(`http://localhost:4000/updatepass/${user.accesstype}/${user.userId}`,formData);

      if (response.data.status === 404) {
        showError(response.data.message, "danger");
        console.log(Error);
      } else {
        console.log("Success", response);
        showError("Your Password is successfully updated", "success");
        localStorage.clear();
        window.location.reload();
        window.location.href = '/login';

      }
    } catch (err) {
      console.error(err);
    }
}
  };

  return (
    <>
      <div className="login-page-wrap">
        <div className="login-page-content">
          <div style={{ height: "50px", marginBottom: "10px" }}>
            {Error && <Alert alert={Error} />}
          </div>
          <div className="login-box">
            <div className="logsign-logo">
              <i className="fa-solid fa-truck-medical"></i> GLORIUM
            </div>
            <div className="logsign-logo" style={{marginLeft:"35px"}}>
               Creat New Password
            </div>
            <form className="login-form" onSubmit={handleSubmit(Submit)} method="post" >
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="form-control"
                  {...register("password", registerOptions.password)}
                />
                <i className="fas fa-lock"></i>
                <small className="text-danger">
                  {errors?.password && errors.password.message}
                </small>
              </div>

              <div className="form-group">
              <label>Confirm Password</label>
                <input
                  type="password"
                  id="confirm_Password"
                  name="confirm_Password"
                  placeholder="Confirm password"
                  className="form-control"
                  {...register("confirm_Password", registerOptions.confirm_Password)}
                />
                <i className="fas fa-lock"></i>
                <small className="text-danger">
                  {errors?.confirm_Password && errors.confirm_Password.message}
                </small>
              </div>


              <div className="form-group">
                <button className="login-btn">Submit</button>
              </div>
            </form>

            <div className="sign-up" style={{color:"#4761C2 "}}>
              Go to Login page <Link style={{color:"#ff9d01"}} to="/login">click now!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
