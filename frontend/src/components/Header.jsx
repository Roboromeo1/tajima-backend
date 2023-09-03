import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaPhone, FaUserCircle, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo1.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='ProShop' height="40px"/>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {/* Search bar */}
              <SearchBox />
            </Nav>
            <Nav>
              <Nav.Link className="call-now">
                <FaPhone /> <span>Call us now 1300 283 460</span>
              </Nav.Link>
              <LinkContainer to='/profile'>
                <Nav.Link>
                  <div>
                    <FaUserCircle size={28}/> {/* Adjust size as needed */}
                  </div>
                </Nav.Link> 
              </LinkContainer>
              <LinkContainer to='/wishlist'>
                <Nav.Link>
                  <div>
                    <FaHeart size={28}/> {/* Adjust size as needed */}
                  </div>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <div>
                    <FaShoppingCart size={28}/> {/* Adjust size as needed */}
                    {cartItems.length > 0 && (
                      <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg='dark'  className='nav-main' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/'>
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link>ABOUT US</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/shop'>
                <Nav.Link>SHOP</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/madeira'>
                <Nav.Link>MADEIRA</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/consumables'>
                <Nav.Link>CONSUMABLES</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/information'>
                <Nav.Link>INFORMATION</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/digitising'>
                <Nav.Link>DIGITISING</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact'>
                <Nav.Link>CONTACT US</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;