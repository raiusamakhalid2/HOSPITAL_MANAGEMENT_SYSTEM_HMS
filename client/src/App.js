import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import AuthContext from "./context/AuthContext";
import { USER_TYPES } from "./components/protected/Protected";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import DoctorLayout from "./components/layout/DoctorLayout";
import UserLayout from "./components/layout/UserLayout";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const myuser = async () => {
      const storedValue = localStorage.getItem("mylogintoken");

      if (storedValue) {
        const decodeduser = await decodeToken(storedValue);
        setUser(decodeduser);
        switch (decodeduser.Access_Type) {
          case USER_TYPES.ADMIN:
            navigate("/admin/dashboard");
            break;
          case USER_TYPES.DOCTOR:
            navigate("/doctor");
            break;
          case USER_TYPES.PATIENT:
            navigate("/");
            break;
          default:
            navigate("/404");
            console.log("unknown user type");
            break;
        }
      } 
    };

    myuser();
  }, []);



  const location = useLocation().pathname.split("/")[1];

  let layoutComponent;

  switch (location) {
    case "admin":
      layoutComponent = <AdminLayout />;
      break;
    case "doctor":
      layoutComponent = <DoctorLayout />;
      break;
    default:
      layoutComponent = <UserLayout />;
  }

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>

        {layoutComponent}

      </AuthContext.Provider>
    </>
  );
}

export default App;
