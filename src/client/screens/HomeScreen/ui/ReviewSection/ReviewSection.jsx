import './ReviewSection.css'
import { Row, Col } from 'react-bootstrap'
import { ReactComponent as FiveStars } from "../../../../assets/icons/5-stars-icon.svg"


const ReviewSection = () => {
  return (
    <section className='review-section__container m-5'>
      <Row className='mb-3'>
        <h3 className='review-section__title text-center'>
          Отзывы
        </h3>
      </Row>
      <Row  className='review-section__reviews justify-content-center'>
        <Col className='review-section__review'>
            <span className='review-section__review--name'>
              Илья
            </span>
            <span className='review-section__review--text'>
              <q>Свежее, вкусное, быстрое изготовление!</q>
            </span>
            <FiveStars />
        </Col>
        <Col className='review-section__review'>
            <span className='review-section__review--name'>
              Екатерина М.
            </span>
            <span className='review-section__review--text'>
              <q>Заказывали свадебный торт, всё сделали качественно, вовремя, упаковка очень надёжная и красивая! Начинку взяли медовик, очень вкусно получилось, молодожёны и гости довольны!!!!Спасибо огромное!</q>
            </span>
            <FiveStars />
        </Col>
        <Col className='review-section__review'>
            <span className='review-section__review--name'>
              Елена
            </span>
            <span className='review-section__review--text'>
              <q>Уже который год заказываю тортики на днюшки . и всегда торт супер. Отличная начинка, свежие ягоды , красиво оформлено.</q>
            </span>
            <FiveStars />
        </Col>
      </Row> 
      <Row className='mt-3'>
        <h3 className='review-section__more text-center'>
          <a href='https://yandex.ru/maps/-/CDerIOYM' target='blank'>Посмотреть более 200 отзывов о нашей кондитерской!</a>
        </h3>
      </Row>
    </section>
  )
}

export default ReviewSection