import './Button.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button className='button'>{text}</button>;
};
