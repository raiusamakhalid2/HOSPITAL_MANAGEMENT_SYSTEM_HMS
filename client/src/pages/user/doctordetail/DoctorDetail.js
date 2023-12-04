import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getTimeSlot } from '../../../functions/Functions';


export default function DoctorDetail() {

    const [doctor, setDoctors] = useState()
    const { id } = useParams();

    useEffect(() => {
        const fetchDoctors = async () => {
          const res = await axios.get(`http://localhost:4000/doctor/${id}`);
          try {
            setDoctors(res.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchDoctors();
      }, [id]);

  return (
<div className= "dashboard-content-one">
<div className= "breadcrumbs-area">
<p></p>
</div>


<div className= "card height-auto">
<div className= "card-body">
<div className= "heading-layout1">
<div className= "item-title">
<h3>About Dr.{doctor?.name}</h3>
</div>
</div>

<div className= "single-info-details">
<div className= "item-img">
    {doctor &&
<img src={`http://localhost:4000/doctor/doctorimage/${doctor?.imageUrl}`} alt="teacher"/>
}
</div>
<div className= "item-content">
<div className= "header-inline item-header">
	<h3 className= "text-dark-medium font-medium">Dr.{doctor?.name}</h3>
</div>
<p>{doctor?.description}</p>

<div className= "info-table table-responsive">
<table className= "table text-nowrap">
<tbody>
	<tr>
		<td>Name:</td>
		<td className= "font-medium text-dark-medium">{doctor?.name}</td>
	</tr>
	<tr>
		<td>Gender:</td>
		<td className= "font-medium text-dark-medium">{doctor?.gender}</td>
	</tr>
    <tr>
		<td>Experience:</td>
		<td className= "font-medium text-dark-medium">{doctor?.experience} years</td>
	</tr>
	<tr>
		<td>Email:</td>
		<td className= "font-medium text-dark-medium">{doctor?.email}</td>
	</tr>
    <tr>
		<td>Fee</td>
		<td className= "font-medium text-dark-medium">{doctor?.fee}</td>
	</tr>
	<tr>
		<td>Education:</td>
		<td className= "font-medium text-dark-medium">{doctor?.education}</td>
	</tr>
	<tr>
		<td>Address:</td>
		<td className= "font-medium text-dark-medium">{doctor?.address}</td>
	</tr>
	<tr>
		<td>Phone:</td>
		<td className= "font-medium text-dark-medium">{doctor?.phone}</td>
	</tr>
    <tr>
		<td>Time:</td>
		<td className= "font-medium text-dark-medium">
        {doctor && doctor.timeslot && doctor.timeslot.map((time, index) => (
            <React.Fragment key={index}>
            {getTimeSlot(time)}
            {index < doctor.timeslot.length - 1 && ","}
            </React.Fragment>
        ))}
        </td>

	</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
      
    </div>
  )
}
