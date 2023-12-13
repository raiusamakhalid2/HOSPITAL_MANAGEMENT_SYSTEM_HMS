import { useEffect, useContext, useState } from "react";
import "./message.css";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function MessageTop({currentChat, onlineUsers}) {
    const {user} = useContext(AuthContext)
    const [name, setName] = useState()
    const [img, setImg] = useState();

    const videoCallPath = user.Access_Type === 'Doctor' ? '/doctor/videocall' : '/videocall';

    const userOnline = onlineUsers && onlineUsers.find((user) => user.userId === (currentChat && 
    currentChat.doctor.email) || (currentChat && currentChat.patient.email))


    useEffect(() =>{  
         if(user.Access_Type === 'Doctor'){
            setName(currentChat.patient.name)
            setImg()
        } else if(user.Access_Type === 'Patient'){
            setName(currentChat.doctor.name)
            setImg(currentChat.doctor.imageUrl);
        }
    
    },[currentChat])
    
    return (
        <div className="messageHader">
                <div className="messageHaderImgContainer">
                    <img className="messageHaderImg" src={`http://localhost:4000/doctor/doctorimage/${img}`} alt=""/>
                    <div className={userOnline?"messageHaderBadge":null}></div>
                </div>
                <span className="messageHaderName">{name}</span>
                {userOnline ?
                <Link to={videoCallPath} state={{ onlineuser:userOnline.userId }} className='videocallButton'><i className="fa-solid fa-video"></i></Link>
                : <span className='videocallButton offline'><i className="fa-solid fa-video"></i></span>}
        </div>
    )
}
