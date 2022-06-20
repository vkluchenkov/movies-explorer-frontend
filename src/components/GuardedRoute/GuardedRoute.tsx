import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { GuardedRouteProps } from './GuarderRoute.types';

export const GuardedRoute: React.FC<GuardedRouteProps> = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser?.isLoggedIn ? children : <Navigate to='/signin' />;
};
