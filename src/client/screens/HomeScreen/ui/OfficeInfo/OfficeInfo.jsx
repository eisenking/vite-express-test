import { Row } from 'react-bootstrap';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import './OfficeInfo.css';

const OfficeInfo = () => {
  return (
    <section className='office-info-section' id='office-info-section'>
      <YMaps
      query={{
        apikey: '4d37264f-ffad-4c19-b9f0-def9e7c1b0a9',
      }}
      >
      <div className='office-info__container text-center  pt-5'>
          <Row className='office-info__title px-2'>
            <h2>наш офис для консультаций, дегустации и самовывозов</h2>
          </Row>
          <div className='office-info__schedule px-2'>
            <Row>
              Будни: с 10.00 до 20.00, 
            </Row>
            <Row>
              Выходные: с 9.00 до 19.00.
            </Row>
          </div>
          <div className='office-info__text p-2'>
            <Row>
              г. Москва, 
            </Row>
            <Row>
              ул. Подольских курсантов, 
            </Row>
            <Row>
              д. 26, стр. 1, ТЦ &quot;Зельгрос&quot;
            </Row>
            <Row>
              Наш офис расположен на выходе из зоны касс.
            </Row>
          </div>
          <Row>
            <Map
              defaultState={{
                center: [55.593477, 37.630391],
                zoom: 9,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
              width='250px'
              height='250px'
            >
              <Placemark
                modules={["geoObject.addon.balloon"]}
                defaultGeometry={[55.593477, 37.630391]}
                properties={{
                  balloonContentBody:
                    "Торговый центр &quot;Зельгрос, наш офис внутри, у выхода из касс",
                }}
              />
            </Map>
          </Row>
          <div className='office-info__socials mt-5 pb-5'>
            <a 
              className='office-info__contacts--whatsapp'
              href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
              <img src="/assets/icons/whats-up.svg" width='30px' height='30px' />
            </a>
            <a 
              className='office-info__contacts--vk' 
              href='https://vk.com/klubnichkatortik' rel='noreferrer' target='_blank'>
              <img src="/assets/icons/vk.svg" width='30px' height='30px' />
            </a>
              <a 
                className='office-info__contacts--phone'
                href='tel:+74956498871'>
                  +7(495)649-88-71
            </a>
          </div>
      </div>
      </YMaps>
    </section>
  );
};

export default OfficeInfo;