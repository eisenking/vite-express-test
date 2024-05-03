import { Button, Image, Row } from 'react-bootstrap';
import './WhatsAppSection.css';

const WhatsAppSection = () => {
  return (
    <section className='whats-app-section'>
      <div className='whats-app-section__container'>
        <div className='strawberry-image-container'>
          <Image src='/assets/icons/strawberry-icon.svg' alt='Strawberry' className='strawberry-image' />
        </div>
        <div className='d-flex flex-column align-items-center text-center whats-app-section__info'>
          <Row className='whats-app-section__info-title'>
            <h2>напишите нам в whatsapp</h2>
          </Row>
          <Row className='whats-app-section__info-text'>
            <span>Мы быстро ответим на все Ваши вопросы и поможем с оформлением заказа</span>
          </Row>
          <Button className='whats-app-section__info-button'>
            <a href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
              <span className='p-3'>
                Перейти в чат
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
