import React ,{useState}from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";


export default function ChatInput({handleSendMsg}){
    const[showEmojiPicker,setShowEmojiPicker] = useState(false);
    
    const [msg,setMsg] = useState("");
     // l function hedhi juste amalneha bch ki thel l emijo yo5ojlk l picker li howa chnouwa theb thot emijiyet 
    const handleEmoji = () =>{
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handle = ( event ,emojii) =>{
        let message = msg;
        message += emojii.emoji;
        setMsg(message);
    }
 
   const sendChat = (event)=>{
    
       event.preventDefault();
       if(msg.length > 0){
        handleSendMsg(msg);
        setMsg('')
       }
   } 


  return (
    //l imoji heka dima yekhdmou efhemm logic mtahaa
   // ken tnehi kal condition showEmojiPicker twali l picker dima mawjouda
   // fazet l.target.value manetha ay input bch yjini ml value manetha li bch tektbou enti hottou f setstate mta3 l msg
  <Container>
       <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmoji} />
            {
                showEmojiPicker && <Picker onEmojiClick={handle}/>
            }
        </div>
       </div>
       <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder="type your msg here"  value={msg} onChange={(e)=>setMsg(e.target.value)} />
        <button className="submit">
            <IoMdSend />
        </button>
       </form>
  </Container>
    )
 

}
//l thumb fl css heya mtaa scroll bar men dekhel li tenzel aleha
// l box shadow manetha ml fok shadow 0 w li alimin 5 w lota 10 lkouwa mtaaou 
// l border none fl input manetha kal khat li yo5rej automatique fl input nehiih w kal outline none manetha ki tenzel aleha kal cadre li yo5rej nehiih
const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items:center;
background-color: #080420;
padding: 0 2rem;
padding-bottom: 0.3rem;
.button-container {
    display: flex;
    align-items: center;
    color:white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg {
            font-size: 1.5rem;
            color: yellow;
            cursor: pointer;
        }
        .emoji-picker-react{
            position: absolute;
            top: -350px;
            background-color: #080420;
            box-shadow: 0 5px 10px #9a86f3;
            border-color: #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
               background-color:#080420 ;
               width: 5px;
               &-thumb {
                background-color: purple;
               }
            }
            .emoji-categories {
                button {
                    filter : contrast(0);
                }
            }
            .emoji-search {
                background-color: transparent;
                border-color: #9186f3;
            }
            .emoji-group:before {
                background-color:  #080420 ;
            }
        }
    }
}
.input-container {
height:100%;
border-radius: 2rem;
display: flex;
align-content: center;
gap:2rem;
background-color:#ffffff34;
input{
    width:90%;
    background-color: transparent;
    color: white;border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    &::selection {
    background-color: #9a86f3;
    }
    &:focus {
    outline:none;
    }
}
button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    svg {
        font-size: 2rem;
        color: white;
        cursor: pointer;
    }
}
}

`;