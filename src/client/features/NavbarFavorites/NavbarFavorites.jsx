import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Offcanvas, Stack } from "react-bootstrap"
import FavoritesItem from './FavoritesItem';
import './NavbarFavorites.css';

const NavbarFavorites = ( {isOpen, closeFavorites }) => {
  const favorites = useSelector((state) => state.cart);
  const { cartItems } = favorites;

  return (
    <Offcanvas show={isOpen} onHide={closeFavorites} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Вам понравились:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length > 0 ?
          <Stack gap={3}>
            {cartItems.map(item => (
              <FavoritesItem key={item._id} {...item} closeFavs={closeFavorites}/>
            ))}
          </Stack>
        :
          <div className='text-center p-3'>
            Здесь вы можете сохранять понравившиеся Вам тортики из нашего <Link to={`/catalog/`} className='navbar-favorites--link' onClick={closeFavorites}>каталога</Link> и быстро перемещаться между ними.
          </div>
        }
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default NavbarFavorites