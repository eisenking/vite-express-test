import { Row, Col } from 'react-bootstrap'
import './ProsList.css';

const ProsList = () => {
  return (
    <section className='pros-list-section'>
      <Row className='justify-content-around g-3'>
        <Col xs={12} sm={6} md={3} className='text-center'>
          <Col>
          <img src='/assets/icons/navbar-gift-icon.svg' width='60px' height='60px' />
          </Col>
          <Col>
            <span>Скидки, подарки и программа лояльности с первого заказа!</span>
          </Col>
        </Col>
        <Col xs={12} sm={6} md={3} className='text-center'>
          <Col>
            <img src='/assets/icons/photo-camera-icon.svg' width='60px' height='60px' />
          </Col>
          <Col>
            <span>Сделаем фото Вашего тортика для Вас заранее!</span>
          </Col>
        </Col>
        <Col xs={12} sm={6} md={3} className='text-center'>
          <Col>
            <img src='/assets/icons/delivery-icon.svg' width='60px' height='60px' />
          </Col>
          <Col>
            <span>Опытная, аккуратная и пунктуальная доставка с кондиционером!</span>
          </Col>
        </Col>
      </Row>
    </section>
  );
}

export default ProsList;