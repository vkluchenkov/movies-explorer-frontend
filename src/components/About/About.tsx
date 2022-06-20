import './About.css';

export const About: React.FC = () => (
  <section className='about' id='about'>
    <h2 className='about__title'>О проекте</h2>

    <div className='about__paragraphs'>
      <div className='about__paragraph'>
        <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
        <p className='about__text'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
          доработки.
        </p>
      </div>
      <div className='about__paragraph'>
        <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='about__text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
          защититься.
        </p>
      </div>
    </div>

    <div className='timeline'>
      <p className='timeline__active centered'>1 неделя</p>
      <p className='timeline__passive centered'>4 недели</p>
      <p className='timeline__description centered'>Back-end</p>
      <p className='timeline__description centered'>Front-end</p>
    </div>
  </section>
);
