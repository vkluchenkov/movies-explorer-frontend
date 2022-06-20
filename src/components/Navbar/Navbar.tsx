import './Navbar.css';

export const Navbar: React.FC = () => (
  <nav className='nav'>
    <ul className='navlinks'>
      <li className='navlink'>
        <a href='#about'>О проекте</a>
      </li>
      <li className='navlink'>
        <a href='#tech'>Технологии</a>
      </li>
      <li className='navlink'>
        <a href='#student'>Студент</a>
      </li>
    </ul>
  </nav>
);
