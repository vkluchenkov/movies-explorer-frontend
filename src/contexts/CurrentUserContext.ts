import { createContext } from 'react';
import { CurrentUser } from '../types/CurrentUser';

export const CurrentUserContext = createContext<CurrentUser>({
  isLoggedIn: false,
  name: '',
  email: '',
});
