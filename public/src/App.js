import React from 'react';
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Registre';
import SetAvatar from './pages/SetAvatar';

export default function App() {
  return (

    <BrowserRouter>
     <Routes>
       <Route path="/register" element={<Register/>}/>
       <Route path="/" element={<Login/>}/>
       <Route path="/chat" element={<Chat/>}/>
       <Route path="/setavatar" element={<SetAvatar/>}/>
     </Routes>
    </BrowserRouter>
  );
}


