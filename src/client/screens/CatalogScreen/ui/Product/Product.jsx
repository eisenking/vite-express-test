import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Heart from '../../../../assets/icons/Heart.jsx';
import { ReactComponent as Order } from '../../../../assets/icons/order-button-icon.svg';
import { addToCart, removeFromCart } from '../../../../slices/cartSlice.js';
import './Product.css';

const Product = ({ product, currentPage }) => {
  const dispatch = useDispatch();

  const qty = 1;
  const [cartProductIds, setCartProductIds] = useState([]);
  const favorites = useSelector((state) => state.cart);
  const { cartItems } = favorites;
  const isInFavorites = cartItems.some((item) => item._id === product._id);

  const addToFavoritesHandler = () => {
    if (!isInFavorites) {
      dispatch(addToCart({ ...product, qty }));
      setCartProductIds([...cartProductIds, product._id]);
    } else {
      dispatch(removeFromCart(product._id));
      setCartProductIds(cartProductIds.filter(id => id !== product._id));
    }
  };

  return (
    <Card className='product-card my-3'>
      <Link to={`/product/${product._id}`} state={{ currentPage: currentPage}} >
        <Card.Img
         className=''
         src={product.imgUrl}
         alt={product.imgAlt}
         variant='top'
         height="300px"
         style={{ objectFit: "cover" }}
        />
      </Link>

      <Card.Body className='product-card__info'>
          <Card.Subtitle className="mb-2 text-muted">
            {product.mainCategory}
          </Card.Subtitle>
          <Link to={`/product/${product._id}`} state={{ currentPage: currentPage}} >
            <Card.Title as='h4' className='product-card__title text-center'>
            &quot;{product.name}&quot; 
            </Card.Title>
          </Link>
          <div className='product-card__price'>
            <span className='product-card__price--main'>Цена - {product.price} руб/кг.</span>
            {product.decorPrice > 0 ?
            <div className='product-card__decor-price'>
                <span className='product-card__decor-price--title'>Декор - {product.decorPrice} руб.</span>
            </div>
            :
            <span className='product-card__decor-price--title'>Декор включен в стоимость.</span>        
            }
          </div>
          <div className='product-card__controls'>
            <Button
              style={{ height: "3rem", position: "relative" }}
              variant=""
              className={'product-card__favorites-icon'}
              onClick={addToFavoritesHandler}
            >
              <Heart fillColor={isInFavorites ? 'red' : 'black'} />
            </Button>
            <Button
              style={{ height: "3rem", position: "relative" }}
              variant=""
              className='product-card__order-icon'
            >
              <Link to={`/product/${product._id}`} state={{ currentPage: currentPage}} >
                <Order />
              </Link>
            </Button>
          </div>
      </Card.Body>
    </Card>
  );
};

export default Product;