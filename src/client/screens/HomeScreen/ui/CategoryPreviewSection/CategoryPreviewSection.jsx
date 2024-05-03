import { Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CategoryPreviewSection.css'

const CategoryPreviewSection = () => {
  return (
    <section className='category-preview-section m-2'>
      <Row>
        <h3 className='category-preview-section__title text-center'>Подборки наших тортов для любого случая!</h3>
      </Row>
      <Row className='g-3'>
        <Col lg={3} md={4}>
          <Link to={`/catalog/page/1?category=Детские&subCategory=Все&cover=Все&searchByName=`}>
            <Card className="category-preview-section__card bg-dark text-dark">
              <Card.Img className="category-preview-section__card--image" src="/mini/children-cake-korovka-pugovka-mini.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title className='category-preview-section__card--title'>Детские</Card.Title>
                <Card.Text className='category-preview-section__card--description'>
                  Описание
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
        <Col lg={3} md={4}>   
          <Link to={`/catalog/page/1?category=Праздничные&subCategory=Все&cover=Все&searchByName=`}>
            <Card className="category-preview-section__card bg-dark text-dark">
              <Card.Img src="/mini/children-cake-piratskiy-korabl-mini.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title className='category-preview-section__card--title'>Праздничные</Card.Title>
                <Card.Text className='category-preview-section__card--description'>
                  Описание
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
        <Col lg={3} md={4}>
          <Link to={`/catalog/page/1?category=Свадебные&subCategory=Все&cover=Все&searchByName=`}>
            <Card className="category-preview-section__card bg-dark text-dark">
              <Card.Img src="/boho-cake.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title className='category-preview-section__card--title'>Свадебные</Card.Title>
                <Card.Text className='category-preview-section__card--description'>
                  Описание
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
        <Col lg={3} md={4}> 
          <Link to='/catalog'>
            <Card className="category-preview-section__card bg-dark text-dark">
              <Card.Img src="/mini/birthday-cake-aktivniy-otdih-mini.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title className='category-preview-section__card--title'>С Любой идеей!</Card.Title>
                <Card.Text className='category-preview-section__card--description'>
                  Описание
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
      </Row>
    </section>
  );
}

export default CategoryPreviewSection;