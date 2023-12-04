import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "../login/login.css";
import Alert from "../alert/Alert";

export default function Forget() {
  const [email, setemail] = useState();
  const [Error, setError] = useState();

  const showError = (message, colour) => {
    setError({ message, colour });
    setTimeout(() => {
      setError(null);
    }, 1500);
  };

  useEffect(() => {
    setError("");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    email: {
      required: "Email cannot be empty",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address format",
      },
    },
  };

  const location = useLocation();

  const Submit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/login/forget",data);

      if (response.data.status === 404) {
        showError(response.data.message, "danger");
        console.log(Error);
      } else {
        console.log("Success", response);
        const forgetpasswordToken = response.data
        localStorage.setItem("forgetpasswordToken", JSON.stringify(forgetpasswordToken));
        showError("Check your email for Password", "success");

        // window.location.reload();
      }
    } catch (err) {
      console.error(err);
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
            <form
              action=""
              className="login-form"
              onSubmit={handleSubmit(Submit)}
              method="post"
            >
              <div className="form-group">
                <label>Enter Email</label>
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
                  {errors?.email && errors.email.message}
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
