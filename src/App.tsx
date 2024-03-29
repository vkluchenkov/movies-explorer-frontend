import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './components/AuthForms/Login/Login';
import { Signup } from './components/AuthForms/Signup/Signup';
import { GuardedRoute } from './components/GuardedRoute/GuardedRoute';
import { Landing } from './components/Landing/Landing';
import { Movies } from './components/Movies/Movies';
import { NotFound } from './components/NotFound/NotFound';
import Preloader from './components/Preloader/Preloader';
import { Profile } from './components/Profile/Profile';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { CurrentUser } from './types/CurrentUser';
import { LoginPayload, SignupPayload, UpdateMePayload } from './types/payloads';
import { mainApi } from './utils/MainApi';

function App() {
  const navigate = useNavigate();
  const [authchecked, setAuthChecked] = useState(false);

  // States
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    isLoggedIn: false,
    name: '',
    email: '',
  });

  // Check if returning visitor is logged in
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await mainApi.getMe();
        if (res) setCurrentUser({ ...res, isLoggedIn: true });
      } catch (error: any) {
      } finally {
        setAuthChecked(true);
      }
    };
    fetchMe();
  }, []);

  // Handlers
  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      const res = await mainApi.signin(payload);
      if (res) {
        setCurrentUser({ ...res, isLoggedIn: true });
        navigate('/movies');
      }
    },
    [navigate]
  );

  const handleSignup = useCallback(
    async (payload: SignupPayload) => {
      const res = await mainApi.signup(payload);
      if (res) {
        setCurrentUser({ ...res, isLoggedIn: true });
        navigate('/movies');
      }
    },
    [navigate]
  );

  const handleUpdateMe = useCallback(async (payload: UpdateMePayload) => {
    const res = await mainApi.patchMe(payload);
    if (res) {
      setCurrentUser((prev) => ({ ...prev, ...res }));
    }
  }, []);

  const handleLogout = useCallback(async () => {
    const localStorage = window.localStorage;
    try {
      setCurrentUser({ isLoggedIn: false, email: '', name: '' });
      localStorage.clear();
      mainApi.signout();
      navigate('/');
    } catch (error) {}
  }, [navigate]);

  if (!authchecked)
    return (
      <section className='app__preloader'>
        <Preloader />
      </section>
    );
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
              <Profile onLogout={handleLogout} onSubmit={handleUpdateMe} />
            </GuardedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
