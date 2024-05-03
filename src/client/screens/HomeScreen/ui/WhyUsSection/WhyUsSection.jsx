import { Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './WhyUsSection.css'

const WhyUsSection = () => {
  return (
    <section className='why-us-section' id='why-us-section'>
      <Row className='why-us-section__title py-3' >
        <h3 className='why-us-section__title--text'>Почему стоит выбрать именно нас?</h3>
      </Row>
      <Row className='why-us-section__info'> 
        <Col>
          <Carousel className='carousel' data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/boho-cake.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Первая причина</h3>
                <p>
                  Подобрать подходящую картинку для каждой причины
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/boho-cake.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Вторая причина</h3>
                <p>
                  Подобрать подходящую картинку для каждой причины
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/boho-cake.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Третья причина</h3>
                <p>
                  Подобрать подходящую картинку для каждой причины
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className='why-us-section__steps'>
          <div>
            <div className='why-us-section__step pb-3'> 
              <p className='why-us-section__step--number'> 1 </p>
              <span className='why-us-section__step--text'>Мы работаем только на <Link to='/tastings' className='why-us-section__step--link'>качественных, натуральных, свежих </Link> и проверенных ингредиентах.</span>
            </div>
            <div className='why-us-section__step pb-3'> 
              <p className='why-us-section__step--number'> 2 </p>
              <span className='why-us-section__step--text'>У нас работаю профи скульптинга и мастера по разным техникам оформления - нам под силу сделать <Link to='/catalog' className='why-us-section__step--link'>любой</Link> торт!</span>
            </div>
            <div className='why-us-section__step pb-3'> 
              <p className='why-us-section__step--number'> 3 </p>
              <span className='why-us-section__step--text'>В <a className='why-us-section__step--link' href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>WhatsApp</a> ответим на любые вопросы, пришлем фото Вашего тортика заранее, мы всегда на связи</span>
            </div>
            <div className='why-us-section__step'> 
              <p className='why-us-section__step--number'> 4 </p>
              <span className='why-us-section__step--text'>Множество хороших <a className='why-us-section__step--link' href='https://yandex.ru/maps/-/CDerIOYM' target='blank'>отзывов</a>, сертификатов.</span>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default WhyUsSection;