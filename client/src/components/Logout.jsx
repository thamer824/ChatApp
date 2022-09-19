import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {BiPowerOff} from "react-icons/bi";

// l hundleclick ken thotha hundleclick() ghadi mehiich bch te5dem bel behy 
export default function Logout(){
    const navigate = useNavigate();
    const hundleClick = async ()=>{
        localStorage.clear();
        navigate("/");
    };

    return (
    
    <Button onClick={hundleClick}>
        <BiPowerOff />
    </Button>
    
    )




}

const Button = styled.button`
display : flex;
justify-content : center;
align-items : center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #9a86f3;
border: none;
cursor: pointer;
svg{
    font-size: 1.3rem;
    color: #ebe7ff;
}



`