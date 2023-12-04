import "./conversation.css";
import { useState, useEffect } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [name, setname] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    function getNameBasedOnAccessType(conversation, accessType) {
      if (accessType === "Patient") {
        setname(conversation.doctor.name);
        setImg(conversation.doctor.imageUrl);
      } else if (accessType === "Doctor") {
        setname(conversation.patient.name);
        setImg()
      } else {
        setname("Unknown");
      }
    }
    getNameBasedOnAccessType(conversation, currentUser.Access_Type);
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={`http://localhost:4000/doctor/doctorimage/${img}`}
        alt=""
      />
      <span className="converationName">{name}</span>
    </div>
  );
}
