import './Student.css';
import studentPic from '../../images/student.jpg';

export const Student: React.FC = () => (
  <>
    <section className='student' id='student'>
      <h2 className='student__title'>Студент</h2>
      <img src={studentPic} alt='Владимир' className='student__image' />
      <div className='student__info'>
        <h3 className='student__subtitle'>Владимир</h3>
        <p className='student__subheader'>Фронтенд-разработчик, 38 лет</p>
        <p className='student__text'>
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я
          люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
          компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <div className='student__links'>
          <a
            className='student__link'
            href='https://facebook.com/vkluchenkov'
            target='_blank'
            rel='noreferrer'
          >
            Facebook
          </a>
          <a
            className='student__link'
            href='https://github.com/vkluchenkov'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </section>
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__link'>
          <a href='https://github.com/vkluchenkov' target='_blank' rel='noreferrer'>
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__link'>
          <a href='https://github.com/vkluchenkov' target='_blank' rel='noreferrer'>
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__link'>
          <a href='https://github.com/vkluchenkov' target='_blank' rel='noreferrer'>
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  </>
);
