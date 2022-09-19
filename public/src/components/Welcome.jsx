import React from 'react';
import styled from "styled-components";
import Robot from "../assets/robot.gif";







export default function Welcome({ currentUser }) {


    // li fi west l span is loading before the useeeffect hook  khater fl mounting 1) constructor 2) props 3) render 4) usefeffec l heya l component did mount donc 
    // donc lena mouch bech ynajem yakra undefined ki enti taml reload lel page twali taaml ka fazet isloaded tseteha false w mbaed trodha true fl localstorage manetha mel lekheer twali mayatik dom ela mayakra l useeffect
    return (
    <Container>
      <img src={Robot} alt="Robott" />
      <h1>Welcome , <span>{currentUser.username} !</span></h1>
      <h3>Select your mates to Chat with !!</h3>


    </Container>

    );
}

//justify content yhothom fl west lkok w l itemsfl west fl west
const Container = styled.div`

display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
color:white;
img {
    height:20rem;
}
span{
    color:#4e00ff;
}

`;