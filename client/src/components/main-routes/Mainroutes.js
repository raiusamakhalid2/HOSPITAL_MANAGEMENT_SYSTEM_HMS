import React from 'react'
import {PatientElement,AdminElement, DoctorElement} from '../protected/Protected';
import { Navigate, Route, Routes } from 'react-router';

import VerifyUser from '../verifyuser/VerifyUser'
import Login      from '../login/Login'
import SignUp     from '../signup/SignUp'
import Home       from '../../pages/user/home/Home'
import NotFound   from '../../pages/404/404'
import AddDoctor  from '../../pages/admin/doctors/AddDoctor'
import Doctors    from '../../pages/admin/doctors/Doctors'
import EditDoctor from '../../pages/admin/doctors/EditDoctor'
import Categories from '../../pages/admin/category/Categories'
import AddCategory from '../../pages/admin/category/AddCategory'
import EditCategory from '../../pages/admin/category/EditCategory'
import CatogriesBasDoctor from '../../pages/user/categories/CatogriesBasDoctor'
import BookAppointment from '../../pages/user/bookappointment/BookAppointment'
import DrAppointment  from '../../pages/doctor/DrAppointment'
import MyAppointments from '../../pages/user/myappointments/MyAppointments'
import DoctorDetail   from '../../pages/user/doctordetail/DoctorDetail'
import EditDrAppointment from '../../pages/doctor/EditDrAppointment'
import Dashbord       from '../../pages/admin/dashbord/Dashbord'
import ProfileSetting from '../../pages/doctor/ProfileSetting'
import Forget         from '../forget/Forget'
import CreatNewPassword from '../forget/CreatNewPassword'
import Messenger      from '../../messenger/Messenger'
import VideoCall      from '../../videocall/VideoCall'

export default function Mainroutes() {
  return (
    <>
      <Routes>
          <Route path="/verify/:token" element={<VerifyUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/creatnewpassword/:token" element={<CreatNewPassword />} />
          

          <Route element={<PatientElement><Home/></PatientElement>} path="/" />  
          <Route element={<PatientElement><CatogriesBasDoctor/></PatientElement>} path="categories/:name" />
          <Route element={<PatientElement><BookAppointment/></PatientElement>} path="appointment/:id" />
          <Route element={<PatientElement><MyAppointments/></PatientElement>} path="myapointment" />
          <Route element={<PatientElement><DoctorDetail/></PatientElement>} path="detail/:id" />
          <Route element={<PatientElement><Messenger/></PatientElement>} path="messanger" />
          <Route element={<PatientElement><VideoCall/></PatientElement>} path="videocall" />


          <Route element={<DoctorElement><Messenger/></DoctorElement>} path="/doctor/messanger" />
          <Route element={<DoctorElement><VideoCall/></DoctorElement>} path="/doctor/videocall" />
          <Route element={<DoctorElement><DrAppointment/></DoctorElement>} path="/doctor" />
          <Route element={<DoctorElement><EditDrAppointment/></DoctorElement>} path="/doctor/editappointment/:id"/>
          <Route element={<DoctorElement><ProfileSetting/></DoctorElement>} path="/doctor/profile"/>


          <Route element={<AdminElement><Dashbord/></AdminElement>} path="/admin/dashboard" />
          <Route element={<AdminElement><AddDoctor/></AdminElement>} path="/admin/adddoctor" />
          <Route element={<AdminElement><Doctors/></AdminElement>} path="/admin/doctor" />
          <Route element={<AdminElement><EditDoctor/></AdminElement>} path="/admin/editdoctor/:id" />
          <Route element={<AdminElement><Categories/></AdminElement>} path="/admin/catogery" />
          <Route element={<AdminElement><AddCategory/></AdminElement>} path="/admin/addcatogery" />
          <Route element={<AdminElement><EditCategory/></AdminElement>} path="/admin/editcatogery/:id" />


          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound/>} />
      </Routes>
    </>
  )
}
