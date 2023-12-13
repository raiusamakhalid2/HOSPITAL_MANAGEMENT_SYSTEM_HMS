import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import './videocall.css'

const socket = io("ws://localhost:5000");

function VideoCall() {
  const { user} = useContext(AuthContext)
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const location = useLocation();
  const userTouser = location.state?.onlineuser;


  const userVideo = useRef();
  const myVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream)=>{
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
    
        }
      });

  
    socket.emit("addUser", user?.email);
  
 
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  
  },[]);
  
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });


    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: user.email,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      if(userVideo.current){
      userVideo.current.srcObject = stream;}
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    if(connectionRef.current){
      connectionRef.current = peer;
  }
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });


    peer.on("stream", (stream) => {
      if(userVideo.current){
      userVideo.current.srcObject = stream;
      }
    });

    if(callerSignal){
    peer.signal(callerSignal);
    connectionRef.current = peer;
  }
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container container2">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(userTouser)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
					{userTouser}
				</div>
			</div>
			<div>

        
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</>
  );
}

export default VideoCall;

