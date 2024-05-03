import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';
import {
  useGetProductDetailsQuery
} from '../../slices/productsApiSlice';

import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

import Heart from '../../assets/icons/Heart.jsx';

import ImageModal from './ui/ImageModal/ImageModal.jsx';
import CustomButton from '../../components/CustomButton/CustomButtom.jsx';
import './ProductScreen.css';
import LeftArrow from '../../../../public/assets/icons/LeftArrow.jsx';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {state} = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  
  const qty = 1;
  const [cartProductIds, setCartProductIds] = useState([]);
  const favorites = useSelector((state) => state.cart);
  const { cartItems } = favorites;
  const isInFavorites = product && cartItems.some((item) => item._id === product._id);

  const addToFavoritesHandler = () => {
    if (!isInFavorites) {
      dispatch(addToCart({ ...product, qty }));
      setCartProductIds([...cartProductIds, product._id]);
    } else {
      dispatch(removeFromCart(product._id));
      setCartProductIds(cartProductIds.filter(id => id !== product._id));
    }
  };

  const OrderHandler = () => {
    navigate(`/product/${productId}/order`);
  };

  // <--- Окно с картинкой продукта --->

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <section>
          {state ? (
          <div className='product-screen__nav-row m-3'>
            <div className='product-screen__nav-row--back-button'>
              <Link className='btn' to={`/catalog/page/${state.currentPage}?`}  state={{ currentPage: state.currentPage}} >
                <LeftArrow />
              </Link>
            </div>
            <div className='product-screen__nav-row--title'>
              <h4>
                &quot;{product.name}&quot;
              </h4>
            </div>
          </div>
          ) :
          <div className='product-screen__nav-row mt-3'>
            <div className='product-screen__nav-row--back-button'>
              <Link className='btn' to={`/catalog/`} >
                <LeftArrow />
              </Link>
            </div>
            <div className='product-screen__nav-row--title'>
              <h4>
                &quot;{product.name}&quot;
              </h4>
            </div>
          </div>
          }
          <Row className='justify-content-evenly m-3'>
            <Col md={4}>
              <Image className='product-screen__image' src={product.imgUrl} alt={product.imgAlt} onClick={() => setModalShow(true)} fluid />
            </Col>
            <Col md={4} className='text-center'>
              <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item className='p-3'>
                  <span>
                    {product.mainCategory}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className='p-3'>
                  <span>
                    {product.description}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className='p-3'>
                  <span>
                    Декор - {product.decorType}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className='p-3'>
                  <span>
                    Вес торта на фото - {product.weightOnPhoto} кг.
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className='p-3'>
                  <span>
                    Покрытие - {product.mainCover}
                  </span>
                </ListGroup.Item>
              </ListGroup>
              </Card>
            </Col>
            <Col md={4} className='text-center'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='p-3'>
                    <span>
                      Цена за кг. - {product.price} руб.
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className='p-3'>
                    {product.decorPrice > 0 ?
                      <span>
                        Декор - {product.decorPrice} руб.
                      </span>
                    :
                    <span>
                      Декор включен в стоимость.
                    </span>
                    }
                  </ListGroup.Item>
                  <ListGroup.Item className='text-center p3' >
                      <Button
                        className='product-screen__favorites-button text-center'
                        type='button'
                        variant=""
                        onClick={addToFavoritesHandler}
                      >
                        <Heart fillColor={isInFavorites ? 'red' : 'black'} />
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item className='p-3'>
                      <CustomButton
                        onClick={OrderHandler}
                      >
                        Заказать
                      </CustomButton>
                    </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </section>
      )}
      <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={product?.name}
        image={product?.imgUrl}
        imageAlt={product?.imgAlt}
        weightOnPhoto={product?.weightOnPhoto}
      />
    </>
  );
};

export default ProductScreen;