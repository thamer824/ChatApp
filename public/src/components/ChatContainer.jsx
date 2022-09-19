import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { sendMessageRoute, getUsers } from '../utils/APIRoutes';
import {v4 as uuid} from "uuid";
export default function ChatContainer({ currentchat, currentUser , socket}) {

  const [messages, setMessages] = useState([]);
  const [arrival, setArrival] = useState(null);
  const scrollRef = useRef();
 
  // we wat this whenever wee change the currentchat we need to fetch the current user chat
  useEffect( () => {

 
    async function fetchData() {
    if(currentchat){
      const response = await axios.post(getUsers, {
        from: currentUser._id,
        to: currentchat._id
      });
      setMessages(response.data);
    }
      
    }
    fetchData();
    

  }, [currentchat])




  //will do a magic here
  const handlesendmsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentchat._id,
      message: msg,

    });
    // lena whenever we send msg nzidou nsendiw b socket fl backedn 
    socket.current.emit("send-msg",{
      to:currentchat._id,
      from: currentUser._id,
      message: msg,
    })

    const msgs = [...messages];
    msgs.push({fromSelf: true, message:msg})
    setMessages(msgs);
  }


  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-receive",(msg)=>{
             setArrival({fromSelf:false, message:msg})
      })
    }
  })

  useEffect(() => {
    arrival && setMessages((prev)=>[...prev,arrival]);
  },[arrival])
 

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  },[messages])
 

  // ki yabda l clasname heka manetha rahou dynamic yetbadel {className={``}}
  // kena bch naamlou condition khater men gherha mouch bch yakra l avatr image dont nkolou saaa li fama currentchat khtaer ken mankolouch mouch bch yaaref li fama wahda selectdd 
  return (<>{currentchat &&
    (

      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentchat.avatarImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h3>{currentchat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {
            messages.map((msg) => {
              return (
                <div ref={scrollRef} key={uuid()}>
                  <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                    <div className="content">
                      <p>
                        {msg.message}
                      </p>

                    </div>

                  </div>

                </div>


              )
            })
          }

        </div>
        <ChatInput handleSendMsg={handlesendmsg} />

      </Container>)}</>)

}
// awel style taamlou houwa tebaa l container
const Container = styled.div`
padding-top: 2rem;
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width:720px) and (max-width: 1080px)
{
  grid-template-rows: 15% 70%  15%;
}
.chat-header {
display:flex;
justify-content: space-between;
align-items: center;
padding:0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {img {
        height: 3rem;
    }}
    .username {
        color: white;

    }
  }
}
.chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
    .message{
      display: flex;
      align-items: center;
       .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        border-radius: 4rem;
        background-color: green ;
       }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color:#2F4F4F;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #8FBC8F;
      }
    }
}



`;