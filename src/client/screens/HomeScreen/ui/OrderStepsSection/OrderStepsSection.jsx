import { Row, Col, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './OrderStepsSection.css'

const OrderStepsSection = () => {
  return (
    <section className='order-steps-section' id='order-steps-section'>
      <Row className='order-steps-section__title p-1' >
        <h3 className='order-steps__title'>
          Всего 4 простых шага чтобы заказать торт!
        </h3>
      </Row>
      <Row className='order-steps-section__info'>
        <Col className='order-steps-section__steps'>
          <div>
            <div className='order-steps__step'> 
              <p className='order-steps__step--number'> 1 </p>
              <span className='order-steps__step--text'>
                Выберите торт в <Link to="/catalog">каталоге</Link> или расскажите нам о торте Вашей мечты, мы с радостью сделаем его для Вас!
              </span>
            </div>
          </div>
          <div className='order-steps__link'>
            <a href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
              Написать нам в WhatsApp
            </a>
          </div>
          <div>
            <div className='order-steps__step'> 
              <p className='order-steps__step--number'> 2 </p>
              <span className='order-steps__step--text'>
                Выберите <Link to="/tastings">начинки</Link>, каждый ярус торта может быть с разной начинкой - не ограничевайте себя!
              </span>
            </div>
          </div>
          <div className='order-steps__link'>
            <Link to="/tastings">
              Подробнее о начинках
            </Link>
          </div>
          <div>
            <div className='order-steps__step'> 
              <p className='order-steps__step--number'> 3 </p>
              <span className='order-steps__step--text'>
                Определиться что Вам удобнее: доставка или самовывоз?
              </span>
            </div>
          </div>
          <div className='order-steps__link'>
            <Link to="/aboutdelivery">О доставке</Link>
          </div>
          <div>
            <div className='order-steps__step'> 
              <p className='order-steps__step--number'> 4 </p>
              <span className='order-steps__step--text'>
                Просто и быстро оформите заказ в <Link to='/catalog'>каталоге</Link>  или пишите сразу в <a href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>WhatsApp</a> - мы вам поможем!</span>
            </div>
          </div>
        </Col>
        <Col>
          <Carousel className='carousel' data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/boho-cake.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Первый шаг</h3>
                <p>
                  Подобрать подходящую картинку для каждого шага.
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
                <h3>Второй шаг</h3>
                <p>
                  Подобрать подходящую картинку для каждого шага.
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
                <h3>Третий шаг</h3>
                <p>
                  Подобрать подходящую картинку для каждого шага.
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
                <h3>Четвертый шаг</h3>
                <p>
                  Подобрать подходящую картинку для каждого шага.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </section>
  )
}

export default OrderStepsSection;