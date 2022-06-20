import './Footer.css';

export const Footer: React.FC = () => (
  <footer className='footer'>
    <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
    <div className='footer__info'>
      <ul className='footer__links'>
        <li className='footer__link'>
          <a href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>
            Яндекс.Практикум
          </a>
        </li>
        <li className='footer__link'>
          <a href='https://github.com/vkluchenkov' target='_blank' rel='noreferrer'>
            Github
          </a>
        </li>
        <li className='footer__link'>
          <a href='https://facebook.com/vkluchenkov' target='_blank' rel='noreferrer'>
            Facebook
          </a>
        </li>
      </ul>
      <p className='footer__copyright'>©2022</p>
    </div>
  </footer>
);
