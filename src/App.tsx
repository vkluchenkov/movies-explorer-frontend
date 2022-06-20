import React, { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './components/AuthForms/Login/Login';
import { Signup } from './components/AuthForms/Signup/Signup';
import { GuardedRoute } from './components/GuardedRoute/GuardedRoute';
import { Landing } from './components/Landing/Landing';
import { Movies } from './components/Movies/Movies';
import { NotFound } from './components/NotFound/NotFound';
import { Profile } from './components/Profile/Profile';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { CurrentUser } from './types/CurrentUser';
import { LoginPayload, SignupPayload, UpdatePayload } from './types/payloads';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    isLoggedIn: false,
    name: '',
    email: '',
  });

  const handleLogin = useCallback(
    (payload: LoginPayload) => {
      setCurrentUser((prev) => ({
        ...prev,
        isLoggedIn: true,
        email: payload.email,
        name: 'Василий',
      }));
      console.log(payload);
      navigate('/movies');
    },
    [navigate]
  );

  const handleSignup = useCallback(
    (payload: SignupPayload) => {
      setCurrentUser((prev) => ({
        ...prev,
        isLoggedIn: true,
        email: payload.email,
        name: 'Василий',
      }));
      console.log(payload);
      navigate('/movies');
    },
    [navigate]
  );

  const handleUpdate = useCallback((payload: UpdatePayload) => {
    setCurrentUser((prev) => ({
      ...prev,
      email: payload.email,
      name: payload.name,
    }));
    console.log(payload);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser({
      isLoggedIn: false,
      email: '',
      name: '',
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signin' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<Signup onSignup={handleSignup} />} />
        <Route
          path='/movies'
          element={
            <GuardedRoute>
              <Movies />
            </GuardedRoute>
          }
        />
        <Route
          path='/saved-movies'
          element={
            <GuardedRoute>
              <Movies isSavedView />
            </GuardedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <GuardedRoute>
              <Profile onLogout={handleLogout} onSubmit={handleUpdate} />
            </GuardedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
