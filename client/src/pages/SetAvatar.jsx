import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Buffer } from 'buffer'
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {


    const api = 'https://api.multiavatar.com/12';


    const navigate = useNavigate()

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true); //when the avatars are loading w ewant to display the loader
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastObjetct = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

   useEffect(()=>{
       if(!localStorage.getItem("chat-app-user")){
           navigate('/');
       }
   },[])

   

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
          toast.error("Please select an avatar", toastObjetct);
        } else {
          const user = await JSON.parse(
            localStorage.getItem("chat-app-user") //melekher dima heka hedi tet5dem//JSON. parse() is a crucial method for converting JSON data in string form into Javascript objects
          );
    
          const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
          });// donc lena hatina l post chkoun bch ya3malha khater lezem l user tgetih sa3a w thotou houwa bch yhot taswirtou behy w mbaed t3amer l payload li hoa chnouwa bch yhot donc hatena l image li hiya l avatars of selectedAvatars maaethaa l selected avatar houwa ela thotou
    
          if (data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem(
                "chat-app-user",
              JSON.stringify(user)
            );
            navigate("/chat");
          } else {
            toast.error("Error setting avatar. Please try again.", toastObjetct);
          }
        }
      };

    

    useEffect(() => {
        async function h() {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {  //3malna for loop khater bch nfetcchiw ml api w manajmouch naamlou foreach
                    const image = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );

                    const buffer = new Buffer(image.data);  // lena 3abena l buffer bl image.data
                    data.push(buffer.toString("base64")); // w lena pushina l data li fi west l buffer w hateneha fl tableau w hawalneha tostring khater l buffer yakra base utc bl byte b nwamer 255
                }
                setAvatars(data);
                console.log(data)
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        h();
    }, [api]);

    return (
        <>{
            isLoading ?
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container> : (


                    <Container>
                        <div className="title-container">
                            <h1>
                                Pick an Avatar as Your Profile Picture
                            </h1>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, index) => {
                                return (

                                    <div
                                        className={`avatar ${selectedAvatar === index ? "selected" : ""
                                            }`}
                                    >
                                        <img
                                            src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="avatar"
                                            key={avatar}
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <button className="submit-btn" onClick={setProfilePicture} >Set as Profile Picture</button>
                    </Container>
                )
        }
            <ToastContainer />
        </>
    )

}
//tabet mliih fl selected avatar zabouuura aekher l faza
// l padding heya li tbaed m jnebet kima fl vue
//flex direction ki 3maltha column walet l niceau mta3 l ktiba bl column 
const Container = styled.div`
display: flex;
justify-content:center;
align-items: center;
background-color:#131324;
flex-direction: column; 
gap:3rem;
height:100vh;
width:100vw;
.loader {
    max-inline-size: 100%
}
.title-container{
    h1{
        color:white;
    }
}
.avatars{
    display:flex;
    gap:2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding:0.4rem;
        border-radius:5rem;
        display:flex;
        justify-content:center;
        align-items: center;
        transition: 0.5s ease-in-out;

      
        img{
            height:6rem;
            
        }
    }
.selected{
    border: 0.3rem solid #4e0eff;
}    
}
.submit-btn{
    background-color:#997af0;
      color: white;
      padding: 1rem 2rem;
      border:none;
      font-weight: bold;
      border-radius:0.5rem;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition:0.9s ease-in-out;
      &:hover {
         background-color:#4e0eff;
      }
}



`;




// There were various reasons for using arraybuffer.
// 1) We could have used a simple xhr request to send the image data to store it into the server side, but it would be more complex and I did some reserach on the other chat apps on youtube, no one used this kind of feature, so I wanted to show my audience that there's also this type of way which is much easier and useful with the help of buffers.
// 2) When we send the image to the server there could be 2 ways to store the image,
// a) Storing the image in the server directory and serving that image.
// b) Storing the image in the database itself as the image was of less size.
// I though that it would be good to store it into the databse, and for that we had to convert the image into the buffer to store it. So the process would be from the server side and whenever the user requested it we again need to convert the base64 buffer to image and send it to the client side. This process can be simplified using the buffer.
// There are more reasons and I thought this might be a faster way becuase I was personally working on a feature on buffers and they work more efficeinty than the other approaches. Correct me if I am wrong. I am still learning these technolgies.























