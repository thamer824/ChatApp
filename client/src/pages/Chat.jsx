import React, { useState, useEffect , useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";
function Chat() {
    const socket = useRef(); // hedhi manetha nheb norbet l socket b input mo3ayen kahaw
    
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isloaded, setIsloaded] = useState(false);

    // l useEfefct is compiled in the sequence u putted in 
  

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate('/');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
            setIsloaded(true);
        }
    }, []);
   // establish the cnx of the socket w te5edh l current user w thotou fl map global li amlneha fl bacckend 
    useEffect(() => {
        if(currentUser){
            socket.current = io(host);
            socket.current.emit("add-user",currentUser._id);
        }

    },[currentUser]);


    useEffect(() => {
        async function getiUsers() {
            try {
                if (currentUser) {
                    if (currentUser.isAvatarImageSet) {
                        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        setContacts(data.data);
                        console.log(contacts);

                    } else {
                        navigate("/setavatar");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } getiUsers();
    }, [currentUser]);// we call it just once when the component is created

    const hundleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    // lena amalna connditioning rendering fl chatcontainer
    // lena fazet l undefined l error khater ki trelodi l page mouch bech yakra l currentUser.username khater mizel mayarfheech adaka alech lezm naamlou fazet l load 
    // !!!!!!!! bi ma3n akher l welcome page ki bch tetrendi mouch bch ynajem yakra l current user khater yakra feha kbl l useeffect donc ahna amalna condition true keni true waktha yrendreha 
    return (
        <Container>
            <div className="container">

                <Contacts contacts={contacts} currentUser={currentUser} changeChat={hundleChatChange} />

                {
                   isloaded && currentChat === undefined ? 
                    (<Welcome  currentUser = {currentUser} />) : 
                    (<ChatContainer currentchat= {currentChat}  currentUser={currentUser} socket={socket}/>)
                
                }


            </div>

        </Container>
    )
}
// fazet l media li amaleha lel tablet mode manetha ki thel l app b tablet jawek behy ama betelifoun les valeur lezem yetbadlou
//The CSS §§§§§§§§  Grid   §§§§§ Layout Module offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.
//grid-template-columns amaleha manetha kasamna l grid 25% isar  25%ymin
const Container = styled.div`
   height:100vh;
   width:100vw;
   display:flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
   gap:2rem;
   background-color:#131324;
   .container{
       height:85vh;
       width:85vw;
       background-color:#00000076;
       display:grid;
       grid-template-columns:25% 75%;
       @media screen and (min-width:720px) and (max-width: 1080px)
        {grid-template-columns: 35% 65%;}

   }
    
  
 
 
 `;



export default Chat;