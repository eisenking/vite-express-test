import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='footer text-center text-lg-start text-muted'>
      <section className='footer-section'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="cake" className="me-3" />
                Кондитерская &quot;Клубничка&quot;
              </h6>
              <p className='text-center'>
                Профессионально занимаемся изготовлением тортов на заказ с 1997 года!
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Торты</h6>
              <p className='footer__info-links'>
                <Link to='/catalog' className='text-reset'>
                  Каталог
                </Link>
              </p>
              <p className='footer__info-links'>
                <Link to='/tastings' className='text-reset'>
                  Начинки
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Информация</h6>
              <p className='footer__info-links'>
                <Link to='/bonus' className='text-reset'>
                  Акции и бонусы
                </Link>
              </p>
              <p className='footer__info-links'>
                <Link to='/pricing' className='text-reset'>
                  Цены и оплата
                </Link>
              </p>
              <p className='footer__info-links'>
                <Link to='/aboutdelivery' className='text-reset'>
                  Доставка
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Контакты</h6>
              <p className='footer__contacts-links'>
                <a
                  className='footer__contacts-links--address'
                  href='https://yandex.ru/maps/org/klubnichka_tort/1193311499/?ll=37.684336%2C55.595959&mode=search&sll=37.632926%2C55.592509&source=serp_navig&sspn=0.104971%2C0.034267&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9F%D0%BE%D0%B4%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D1%85%20%D0%9A%D1%83%D1%80%D1%81%D0%B0%D0%BD%D1%82%D0%BE%D0%B2%2C%20%D0%B4%D0%BE%D0%BC%2026%2C%20%D1%81%D1%82%D1%80%201%2C%20%D0%9A%D0%BB%D1%83%D0%B1%D0%BD%D0%B8%D1%87%D0%BA%D0%B0&z=13'
                  rel='noreferrer' target='_blank'
                >
                  <MDBIcon icon="home" className="me-2" />
                  Москва, ул. Подольских Курсантов, дом 26, стр 1, тц &quot;Зельгросс&quot;
                </a>
              </p>
              <p className='footer__contacts-links'>
                <a className='footer__contacts-links--mail' href='mailto:klubnichka-tort@mail.ru'>
                <MDBIcon icon="envelope" className="me-3" />
                  klubnichka-tort@mail.ru
                </a>
              </p>
              <p className='footer__contacts-links'>
                <a className='footer__contacts-links--phone' href='tel:+74956498871'>
                <MDBIcon icon="phone" className="me-3" />
                  +7 (495) 649-88-71
                </a>
              </p>
              <p className='footer__contacts-links'>
                <a className='footer__contacts-links--whatsapp' href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
                  <span  className="fab fa-lg fa-whatsapp me-3"></span> 
                  Whats App
                </a>
              </p>
              <p className='footer__contacts-links'>
                  <Link className='footer__contacts-links--policy' to='/policy'>
                    Политика конфиденциальности
                  </Link>
              </p>            
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 
        {/* <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a> */}
      </div>
    </MDBFooter>
  );
};
export default Footer;