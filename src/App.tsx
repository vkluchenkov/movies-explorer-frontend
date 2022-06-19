import React, { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/AuthForms/Login/Login';
import { Signup } from './components/AuthForms/Signup/Signup';
import { Landing } from './components/Landing/Landing';
import { Movies } from './components/Movies/Movies';
import { NotFound } from './components/NotFound/NotFound';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { CurrentUser } from './types/CurrentUser';
import { LoginPayload, SignupPayload } from './types/payloads';

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    isLoggedIn: true,
    name: '',
    email: '',
  });

  const handleLogin = useCallback((payload: LoginPayload) => {
    setCurrentUser((prev) => ({
      ...prev,
      isLoggedIn: true,
      email: payload.email,
      name: 'Василий', // Поставить имя из ответа сервера
    }));
    console.log(payload);
  }, []);

  const handleSignup = useCallback((payload: SignupPayload) => {
    console.log(payload);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup onSignup={handleSignup} />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
