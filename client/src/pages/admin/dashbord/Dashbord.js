import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Dashbord() {
    const [dashboardData , setDashboardData] = useState()

    useEffect(() => {
        const dashboarddata = async()=>{
            try {
            const res = await axios.get(`http://localhost:4000/updatepass/appointment`) 
            setDashboardData(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        dashboarddata()
    },[])

  return (
    <div className="dashboard-content-one">
    {/* <!-- Breadcubs Area Start Here --> */}
    <div className="breadcrumbs-area">
        <h3>Admin Dashboard</h3>
        <ul>
            <li>
                <a href="index.php">Home</a>
            </li>
            <li>Admin</li>
        </ul>
    </div>
    {/* <!-- Breadcubs Area End Here -->
    <!-- Dashboard summery Start Here --> */}
    <div className="row gutters-20">
        <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="item-icon bg-light-green ">
                            <i className="fa-solid fa-user-doctor text-green"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="item-content">
                            <div className="item-title">Doctors</div>
                            <div className="item-number"><span className="counter" >{dashboardData?.totaldoctors}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="item-icon bg-light-blue">
                            <i className="fa-solid fa-bed-pulse text-blue"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="item-content">
                            <div className="item-title">Patients</div>
                            <div className="item-number"><span className="counter" >{dashboardData?.totalpatient}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="item-icon bg-light-yellow">
                            <i className="fa-regular fa-calendar-check text-orange"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="item-content">
                            <div className="item-title">Total Appointments</div>
                            <div className="item-number"><span className="counter" >{dashboardData?.totalappointments}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="item-icon bg-light-red">
                            <i className="fa-solid fa-calendar-check text-red"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="item-content">
                            <div className="item-title">Today Appointments</div>
                            <div className="item-number"><span className="counter" >{dashboardData?.todayappointments}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
</div>

  )
}
