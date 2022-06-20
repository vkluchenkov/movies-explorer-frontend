import './Tech.css';

export const Tech: React.FC = () => (
  <section className='tech' id='tech'>
    <h2 className='tech__title'>Технологии</h2>
    <h3 className='tech__subtitle'>7 технологий</h3>
    <p className='tech__text'>
      На курсе веб-разработки мы освоили технологии, которые применили в&nbsp;дипломном проекте.
    </p>
    <ul className='technologies'>
      <li className='technology'>HTML</li>
      <li className='technology'>CSS</li>
      <li className='technology'>JS</li>
      <li className='technology'>React</li>
      <li className='technology'>Git</li>
      <li className='technology'>Express.js</li>
      <li className='technology'>mongoDB</li>
    </ul>
  </section>
);
