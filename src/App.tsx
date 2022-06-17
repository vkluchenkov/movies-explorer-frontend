import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/AuthForms/Login/Login';
import { Signup } from './components/AuthForms/Signup/Signup';
import { Landing } from './components/Landing/Landing';
import { NotFound } from './components/NotFound/NotFound';
import { LoginPayload, SignupPayload } from './types/payloads';

function App() {
  const handleLogin = (payload: LoginPayload) => {
    console.log(payload);
  };

  const handleSignup = (payload: SignupPayload) => {
    console.log(payload);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signin' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<Signup onSignup={handleSignup} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
