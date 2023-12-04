import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from './conversation/Conversation'
import Message from './message/Message'
import ChatOnline from './chatonline/ChatOnline'
import MessageTop from './message/MessageTop'
import { io } from 'socket.io-client'
import axios from 'axios'
import "./messenger.css"
import SendIcon from '@mui/icons-material/Send';
import AuthContext from '../context/AuthContext'


export default function Messanger() {

  const { user } = useContext(AuthContext);
  const [conversation, setconversation] = useState()
  const [currentChat, setCurrentChat] = useState()
  const [message, setMessage] = useState([])
  const [newMessage, setnewMessage] = useState()
  const [arrivalMessage, setArrivalMessage] = useState()
  const [onlineUsers, setOnlineUsers] = useState()
  const [page, setPage] = useState(1)
  const socket = useRef()
  const containerRef = useRef()
  const scrollend = useRef()
  const prevChatId = useRef();


 

  const handleScroll = () => {
    const container = containerRef.current;

    if (container && container.scrollTop === 0) {
      setPage(prevPage => prevPage + 1);
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
  }, [containerRef.current]);

  useEffect(() => {
    scrollend.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat, message]);

  // <------------------Socket IO code Start ------------------------>
  //connection
  useEffect(() => {
    socket.current = io("ws://localhost:5000");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, []);


  //authentication to send message to right person
  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat &&
      ((arrivalMessage.sender === currentChat.doctor.email) ||
        (arrivalMessage.sender === currentChat.patient.email))
    ) {
      setMessage((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);
 

  //add users
  useEffect(() => {
    socket.current.emit("addUser", user?.email); // send event to server
    socket.current.on("getUsers", Users => {     // get evet from server
      const friend = Users.filter(users => users.userId !== user.email)
      setOnlineUsers(friend);
    })
  }, [user, message,currentChat]);

  // <------------------Socket IO code Ended ------------------------>

  //Conversation
  useEffect(() => {
    if(user && user.userId){
    const getConversation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/conversation/${user?.Access_Type}/${user?.userId}`);
        setconversation(response.data)
      } catch (error) {
        console.log("Conversation not found", error)
      }
    };
    getConversation();
  }
  }, [user?.userId]);

  //keydown
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(event);
    }
  };


  //Messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/messages/${currentChat?.id}?page=${page}`);
        if (currentChat?.id !== prevChatId.current) {
          setMessage([...response.data.reverse()]);
        } else {
          setMessage(prev => [...response.data.reverse(), ...prev]);
        }

        prevChatId.current = currentChat?.id;

      } catch (error) {
        console.log(error)
      }
    }
    if (currentChat && page !== undefined) {
      getMessage();
    }
  }, [currentChat, page]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const messagedata = {
      sender: user?.email,
      text: newMessage,
      conversation: currentChat.id,
    };
    // <------------------Socket IO code Start ------------------------>


    function getNameBasedOnAccessType(currentChat, accessType) {
      if (accessType === 'Patient') {
        const friendId = currentChat.doctor.email

        socket.current.emit("sendMessage", {
          senderId: user?.email,
          receiverId: friendId,
          text: newMessage,
        })
    
      } else if (accessType === 'Doctor') {
        const friendId = currentChat.patient.email

        socket.current.emit("sendMessage", {
          senderId: user?.email,
          receiverId: friendId,
          text: newMessage,
        })
    
      }
      }

    getNameBasedOnAccessType(currentChat, user?.Access_Type)

    // <------------------Socket IO code Ended ------------------------>

    try {
      const respounse = await axios.post("http://localhost:4000/messages", messagedata)
      setMessage([...message, respounse.data]);
      setnewMessage('')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='container' style={{marginTop:"0px"}}>
      <div className="row">
        {/* Menu */}
        <div className="col-6 col-sm-3" style={{backgroundColor:"white", minHeight:'92vh'}}>
          <input type="email" className="serchInput" placeholder="Serch for a friend" />
          {conversation ? (
            conversation.map((c,index) => (
              <div key={index} onClick={() => {
                setCurrentChat(c);
                setPage(1);
              }}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))
          ) : (
            <p>No User Found</p>
          )}

        </div>


        <div className="col-6 col-sm-6">
          {
            currentChat ?
           
              <>
                <div className='chatBoxTop'>
                  <MessageTop currentChat={currentChat} onlineUsers={onlineUsers}  />
                </div>
                <div className="chatBox pe-3" ref={containerRef} style={{ height: "74vh", overflowY: "scroll" }}>
                  {message.length > 0 ? (
                    message.map((m, index) => (
                      <div key={index} ref={index === message.length - 1 ? scrollend : null}>
                        <Message message={m} own={m.sender === user.email} />
                      </div>
                    ))
                  ) : (
                    <span>There is no message yet.</span>
                  )}
                </div>

                 <div className="chatBoxTextarea">
                  <textarea
                    className="fieldTextarea"
                    placeholder='Enter message here'
                    onChange={(e) => setnewMessage(e.target.value)}
                    value={newMessage}
                    onKeyDown={(e) => handleKeyDown(e)}
                  ></textarea>

                  <button
                    className="messageSendButton"
                    onClick={handleSubmit}
                    disabled={!newMessage} >
                    <SendIcon className="send-icon" />
                  </button>
                </div>
              </> : <span className='noChatopen'>Open a conversation to start chat</span>}
        </div>
        <div className="col-6 col-sm-3" style={{backgroundColor:"white"}}>
          {onlineUsers && onlineUsers.map((users,index) =>
          <span key={index}>
          <ChatOnline  onlineUsers={users}/>
          </span>
        )}
        </div>
      </div>
    </div>
  )
}
