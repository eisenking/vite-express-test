import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmptyProduct = () => {
  return (
    <Card className='my-3'>
      <Link to={`/catalog`}>
        <Card.Img
         src='/sorry.jpg'
         variant='top'
         height="300px"
         style={{ objectFit: "contain" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/catalog`}>
          <Card.Title as='div' className='product-title text-center'>
            <strong>Здесь пока пусто!</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3' className='text-center'>...Но мы скоро наполним каждый раздел нашими тортиками</Card.Text>
        <Card.Text className='text-center'>Мы всегда готовы сделать для Вас торт Вашей мечты по индивидуальному заказу!</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EmptyProduct;