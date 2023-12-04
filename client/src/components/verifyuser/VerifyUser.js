import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./verifyuser.css";
import checkmark from "../../images/checkmark.png";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";

export default function VerifyUser() {
  const { token } = useParams();
  const storedToken = localStorage.getItem("emailVerifictation");
  const navigate = useNavigate()
  const [message, setMessage] = useState("");

  useEffect(() => {
    const mytoken =  JSON.parse(storedToken)
    if (mytoken !== token) {
      navigate('/404')
    }
    const fetchData = async () => {
      try {
        const mydecoded = decodeToken(token);
        const id = mydecoded.verifyId;
        const res = await axios.patch(`http://localhost:4000/login/${id}`);
        console.log(res.data);
        if(res.data.status === 404){
          setMessage(res.data.message);
            localStorage.clear();
        }else{
        setMessage("Congratulations your account is verfied");
          localStorage.clear();
        }
      } catch (error) {
        console.log(error);
        navigate('/404')
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
        <div className="verifyuser">
          <div className="text-center">
            <img src={checkmark} alt="" className="tick-img" />
            <h2>{message}</h2>
            <p>Click button to login</p>
            <Link to="/login" className="btn btn-info btn-lg btn-block">
              Login
            </Link>
          </div>
        </div>
    </Fragment>
  );
}
