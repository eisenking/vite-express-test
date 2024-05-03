import { useDispatch } from "react-redux";
import { Button, Stack } from "react-bootstrap"
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../slices/cartSlice';
import Xicon from '../../../../public/assets/icons/Xicon';
import './FavoritesItem.css';

const FavoritesItem = ( { _id, name, imgUrl, imgAlt, price, decorPrice, closeFavs } ) => {

  const dispatch = useDispatch();

  const removeFromFavoritesHandler = async (id) => {
    dispatch(removeFromCart(id))
  }
  
  return (
    <>
      <Stack direction="horizontal" gap={3} className="navbar-favorites d-flex align-items-center">
        <Link to={`/product/${_id}`} onClick={closeFavs} className="normal-text">
          <img
            src={imgUrl}
            alt={imgAlt}
            style={{ width: "125px", height: "75px", objectFit: "contain" }}
          />
        </Link>
        <Link to={`/product/${_id}`} onClick={closeFavs} className="normal-text">
          <div className="me-auto">
            <div className="navbar-favorites__name">
              {name}
            </div>
            <div className="text-muted" style={{ fontSize: ".75rem" }}>
              {price} руб/кг 
              {decorPrice ? 
              ` + Декор ${decorPrice} руб.` 
              :
                null
              }
            </div>
          </div>
        </Link>
        <Button
          variant=""
          size="sm"
          onClick={ () => removeFromFavoritesHandler(_id)}
        >
          <Xicon />
        </Button>
      </Stack>
    </>
  )
}

export default FavoritesItem