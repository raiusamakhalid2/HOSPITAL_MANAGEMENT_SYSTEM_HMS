import { useContext, useEffect, useState } from "react"
import "./chatonline.css"
import AuthContext from "../../context/AuthContext"
import axios from 'axios'

export default function ChatOnline({ onlineUsers}) {
    const [user, setUser] = useState()
    useEffect(() =>{
        const user  = async () => {
            const response = await axios.get(`http://localhost:4000/conversation/online/${onlineUsers.userId}`);
            setUser(response.data)
        }
        user()
    },[])
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={`http://localhost:4000/doctor/doctorimage/${user?.imageUrl}`} alt="" />
                    <div className="chatonlineBadge"></div>
                </div>
                <span className="chatOnlineName">{user?.name}</span>
            </div>

        </div>
    )
}
