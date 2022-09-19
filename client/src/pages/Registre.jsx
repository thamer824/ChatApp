import React, {useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
// dima lezmek timporti l css mt3 toastify 
function Register(){
    const navigate = useNavigate();
    const [Values,SetValues]= useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });  
    const hundleSubmit =async(event)=>{
        event.preventDefault();
        //alert('form')   
        if(handleValidation()){ // donc lena naamlou if bch keni true nkalmou l api w keni false mankalmouch l api
            console.log('dddd',registerRoute);
            const {password,username,email} = Values;
            const {data}= await axios.post(registerRoute,{ // donc lena thot l path w tjib data mtaek ghadi 
                username,
                email,
                password
            });
            if(data.status === false){
              toast.error(data.msg,toastObjetct);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user)); //tsobha en format json
              }
            navigate("/chat"); 
        }; 
    };
    const toastObjetct = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark"
    };
    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){ // donc l useEffect kima fazet l mounting heya kounech wakt matrlodi l page 
        navigate("/chat");// netchekiw ken fama user fl localstorage twli dima tetredirecta l chat page 
      }
  },[]) // l tableau hada yo93eed fara8 khater nhot ghadi list of dependencies manetha tkolou echta8eli l component did mount w echte8el zeda ki nhotlk ghadi variable ki yetapdayti techte8el zeda
     const handleValidation= ()=>{
        const {password, confirmPassword,username,email} = Values;
        if(password !== confirmPassword){
            //React-Toastify allows you to add notifications to your app with ease
           toast.error("password and confirm password shoould be seen ",toastObjetct 
           );
           return false;
           
        }else if(username.length< 3){
            toast.error("username must be valid",toastObjetct);
            return false;
        }else if(password.length< 8){
            toast.error("password must contain at least 8 characters",toastObjetct);
            return false;
        }
        else if(email ===""){
            toast.error("u need to put ur email dude",toastObjetct);
            return false;
        }
        return true;
     }
    const handleChange = (event)=>{
          SetValues({...Values,[event.target.name]:event.target.value}); // hedhi maneha l values lkol khalihom kima houma ela l traget.name yetbadel w ywali li yktbou l user yetupdayta
    }; 
    return(
    <>
    <FormContainer>
        <form action="" onSubmit={(event) => hundleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
    )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem; 
  input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      } 
  }
  button{
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
  span{
      color:white;
      text-transform: uppercase; 
    a{
      color:#4e0eff;
      text-transform: uppercase;
      font-weight: bold;   
    }
  }
}
`;

export default Register;
// ttransition fl hover ease in out manetha ti tekliki w mbaed to5rej tatfa bechwaya alekher
//align-items: center; 	Items are positioned at the center of the container
// display flex trodhom flexible w tba3Ed les elemnts ala b3dhom  Displays an element as a block-level flex container yabdew mithel wakfin trodhom rakdin kima l form ken kima l bhar wla b toul w kal flex direction manetha thot ken l columns bl flex 
//lfont familly heya kifech l ktiba chaklha
// l font size heya kima li tzid w tnakes fl kobr mtaa google
// justify-content: center;  tcentri kol chay
// The gap property defines the size of the gap between the rows and columns
// l height mt3 l img bl rem edika kobr l img m jihet l kol 
// l border radius ta3mel kal takwira mtA3 l background mtee l form 
// l padding hiya  kedech 3ord w toul