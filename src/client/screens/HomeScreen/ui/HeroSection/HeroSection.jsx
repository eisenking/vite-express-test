import { useState } from 'react';
import { Button, Image, Row } from 'react-bootstrap'
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowDown } from "../../../../assets/icons/arrow-down-icon.svg";
import { ReactComponent as Phone } from "../../../../assets/icons/phone-call-icon.svg";
import { ReactComponent as Map } from "../../../../assets/icons/map-location-icon.svg";
import ContactsModal from '../../../../features/ContactsModal/ContactsModal';
import './HeroSection.css';

const HeroSection = () => {

  // <--- Modal with phone & contacts --->
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  
  return (
    <section className='hero-section'>
      <Image className='hero-section__image' src='/hero-image.webp' fluid />
      <Row>
        <div className='hero-section__info'>
          <h3 className='hero-section__info--title p-1'>Идеальное украшение Ваших самых важных моментов!</h3>
          <h5 className='hero-section__info--subtitle p-1'>Торты на заказ, сладкое искусство с доставкой по всей Москве!</h5>
          <Link to='/catalog'>
            <Button className='hero-section__info--button my-2'>Выбрать</Button>
          </Link>
        </div>
      </Row>
      <Row>
        <div className='hero-section__controls'>
          <ScrollLink to='office-info-section' smooth={true} duration={500}>
            <Button className='hero-section__controls--button hero-section__scroll-down-button--transprent hero-section__controls--button-map'>
              <Map />
            </Button>
          </ScrollLink>  
          <ScrollLink to='order-steps-section' smooth={true} duration={500}>
            <Button className='hero-section__controls--button hero-section__scroll-down-button--transprent hero-section__controls--button-next'>
              <ArrowDown />
            </Button>
          </ScrollLink>
          <Button 
            className='hero-section__controls--button hero-section__scroll-down-button--transprent hero-section__controls--button-callback'
            onClick={handleShow}
          >
            <Phone />
          </Button>
        </div>
      </Row>
      <ContactsModal show={show} handleClose={handleClose} />
    </section>
  )
}

export default HeroSection;