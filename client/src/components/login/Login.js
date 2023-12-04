import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import Alert from "../alert/Alert";

export default function Login() {
  const [password, setpassword] = useState();
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
    password: {
      required: "Password cannot be empty",
      minLength: {
        value: 4,
        message: "Password must be at least 10 characters",
      },
    },
  };

  const location = useLocation();

  const Submit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/login", data);

      if (response.data.status === 404) {
        console.log(response.data.response.error)
        localStorage.setItem("emailVerifictation", JSON.stringify(response.data.response.error))
        showError(response.data.message, "danger");
      } else {
        const mylogintoken = response.data;
        localStorage.setItem("mylogintoken", JSON.stringify(mylogintoken));
        window.location.reload();
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
                <label>Username</label>
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
              <div className="form-group d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember-me"
                  />
                  {/* <label htmlFor="remember-me" className="form-check-label">
                    Remember Me
                  </label> */}
                </div>
                <Link to="/forget" className="forgot-btn">
                  Forgot Password?
                </Link>
              </div>
              <div className="form-group">
                <button className="login-btn">Login</button>
              </div>
            </form>
            <div className="login-social">
        
            </div>
          </div>
          <div className="sign-up">
            Don't have an account ? <Link to="/signup">Signup now!</Link>
          </div>
        </div>
      </div>
    </>
  );
}
