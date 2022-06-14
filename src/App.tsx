import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthPage } from './components/AuthForm/AuthPage';
import { NotFound } from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<AuthPage type='signin' />} />
        <Route path='/signup' element={<AuthPage type='signup' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
