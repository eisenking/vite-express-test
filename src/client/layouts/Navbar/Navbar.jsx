import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Nav, Button, NavDropdown, Navbar as NavbarBs } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as ShoppingCartIcon } from "../../assets/icons/shopping-cart-icon.svg"
import { ReactComponent as Logo } from "../../assets/icons/k-tort-logo.svg"
import { ReactComponent as Heart } from "../../assets/icons/navbar-favorites-heart-icon.svg"
import { ReactComponent as GiftBox } from "../../assets/icons/navbar-gift-icon.svg"
import { ReactComponent as User } from "../../assets/icons/user-icon.svg"
import NavbarFavorites from "../../features/NavbarFavorites/NavbarFavorites";
import '../../fonts.css';
import "./Navbar.css"

export function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // <--- Heartbit animations --->
  const isCartNotEmpty = cartItems.length > 0;
  const heartBadgeClass = isCartNotEmpty ? 'heart-container-favs' : 'heart-container-empty';

  // <--- Favorites --->
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const openFavorites = () => {
    setIsFavoritesOpen(true);
  };

  const closeFavorites = () => {
    setIsFavoritesOpen(false);
  };

  // <--- User logout --->
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <nav>
      <NavbarBs collapseOnSelect expand="sm" sticky="top" className="bg-white shadow-sm navbar-opacity">
      <Container>
        <NavbarBs.Toggle aria-controls="offcanvasNavbar-expand-lg" className="menu-toggler"> 
          <Logo /> 
        </NavbarBs.Toggle>
          <NavbarBs.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header  closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Меню
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="align-items-center">
              <Nav className="justify-content-start align-items-center flex-grow-1 me-auto navbar__main-links">
              <Nav.Link to="/" as={NavLink} eventKey="1">
                <NavbarBs.Brand>
                  <img
                    alt="логотип K-tort.ru"
                    src="/assets/icons/k-tort-logo.svg"
                    width="50"
                    height="50"
                    className="d-inline-block align-center navbar-logo"
                  />{' '}
                </NavbarBs.Brand>
              </Nav.Link>
                <Nav.Link as={NavLink} to="/catalog" eventKey="2" className="navbar-link">Торты</Nav.Link>
                <Nav.Link to="/tastings" as={NavLink} eventKey="3" className="navbar-link">Начинки</Nav.Link>
              </Nav>
              <div className="navbar-user">
                {userInfo ? 
                ( 
                  <div className="navbar-user__profile">
                    <Button
                      style={{ height: "3rem", position: "relative" }}
                      variant=""
                      className="shoping-cart-button"
                      onFocus={(e) => e.target.blur()}                   
                    >
                      <User />
                      <div className="navbar-user__profile">
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>Профиль</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>
                            Выйти
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </Button>
                  </div>                   
                  ) 
                  : 
                  (
                    <div className="navbar-user-name">
                        <User className='navbar-user-icon' />
                        <div className="navbar-user__profile" style={{ pointerEvents: "auto" }}>
                          <NavDropdown title={'Гость'} id='username'>
                            <LinkContainer to='/login'>
                              <NavDropdown.Item>Войти</NavDropdown.Item>
                            </LinkContainer>
                          </NavDropdown>
                        </div>
                    </div>
                  )}
                <Button
                  style={{ height: "3rem", position: "relative" }}
                  variant=""
                  className="navbar-user__favorites-button"
                  onClick={openFavorites}
                  onFocus={(e) => e.target.blur()} 
                >
                  <Heart className='navbar-heart-icon' />
                  <div className={heartBadgeClass}>
                    <div
                      id="heart"
                      className="heart-shape d-flex justify-content-center align-items-center"
                    >
                      <div className="navbar-qty">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </div>
                    </div>
                  </div>
                </Button>
                <Nav.Link as={Link} to="/register" eventKey='4' className="navbar-user-links">
                  {userInfo ? 
                  (
                    <>
                      <Button
                        style={{ height: "3rem", position: "relative" }}
                        variant=""
                        className="shoping-cart-button"
                        onFocus={(e) => e.target.blur()}                  
                      >
                        <ShoppingCartIcon />
                        <div
                          id="heart"
                          className="heart-shape-shopping d-flex justify-content-center align-items-center"
                        >
                          <div className="navbar-qty">
                            0
                          </div>
                        </div>
                      </Button>                     
                    </>
                  ) 
                  : 
                  (
                    <Button
                      style={{ height: "3rem", position: "relative" }}
                      variant=""
                      className="navbar-user__register-button"
                      onFocus={(e) => e.target.blur()}                   
                    >
                      <GiftBox className='navbar-gift-icon' />
                      <div className="heart-container heart-container__gift-box">
                        <div
                          id="heart"
                          className="heart-shape-register d-flex justify-content-center align-items-center"
                        >
                          <div className="navbar-qty">
                            1
                          </div>
                        </div>
                      </div>
                    </Button>
                  )}
                </Nav.Link>
              </div>
            </Offcanvas.Body>
        </NavbarBs.Offcanvas>
      </Container>
    </NavbarBs>
    <NavbarFavorites isOpen={isFavoritesOpen} closeFavorites={closeFavorites} />
  </nav>
  )
}