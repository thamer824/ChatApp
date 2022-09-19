import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

//lena passena l props manetha ml parent l child component wl changeChat hiya fucntion paseneha ka props zeda 
export default function Contacts({ contacts, currentUser ,changeChat }) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    


    useEffect(() => { 
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);  // lena ret alech jebna l props mahou hahahah wlh tawa ween fhemtha baed kedech men am yezahi
    // donc lena nheb l useEffect te5dem whenever the user is changed 

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);// hedhi manetha t7ott l current chat houwa wahed menhom choufha fel html part lota mantha ay wahed tselectih houwa ela bch yo5rojlk fl contacts amalneha heka khater lezem nalkawha fi state
      
    }


    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>Taymour</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={()=>{changeCurrentChat(index,contact)}}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                          
                        </div>

                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>

                    </Container>
                )

            }
        </>

    )
}
// . contact huya kol wahda makle map function l css mta7a berasmi wlh taalem barcha hedi efhemha beelbehi
// lena bl overflow hidden nkhabiw chwaya ml contact page maw amalneha f chat kal container kasamneha w hatena fi westha l contact
//With the hidden value, the overflow is clipped, and the rest of the content is hidden:
const Container = styled.div`
display:grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color:#080420;
.brand {
    display: flex;
    align-items:center;
    justify-content: center;
    gap:1rem;
    img {
     height: 2rem;
    }
    h3 {
        color:white;
        text-transform: uppercase;
    }

}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto; 
  gap:0.8rem;
  &::-webkit-scrollbar{
    width: 0.2rem; 
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 2rem;
    }
    
  }
  .contact {
    background-color:#ffffff39;
    min-height: 5rem;
    width: 90%;
    cursor:pointer;
    border-radius: 0.2rem;
    padding : 0.4rem;
    gap: 1rem;
    align-items: center;
    display: flex;
    transition: 0.5s ease-in-out;
   
    .avatar {
     img {
        height: 3rem; 
        }
    }

.username{
    h3 {
        color:white;
    }
}


    

  } 
.selected {
    background-color: #9186f3;
}


}
.current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
       img {
         height: 4rem;
         max-inline-size: 100%;
        }
    }
    .username {
       // hedi bch tjareb ken tnaha l username manetha te5dem jawha behy mouch l mochkla menha display: none; 
        h2{
            color: white ; 
        }
    }
    @media screen and (min-width:720px) and (max-width: 1080px)
        {
            grid-template-columns: 35% 65%;
            gap: 0.5rem;
            .username{
                h2{
                    fonst-size: 1rem;
                }
            }
            
        }

}



`;