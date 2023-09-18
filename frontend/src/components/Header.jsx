import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import styles from "../assets/styles/header.css";
import SearchBox from "./SearchBox";
import logo from "../assets/logo1.png";

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
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="ProShop" height="40px" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <SearchBox />
            </Nav>
            <Nav>
              <Nav.Link className="call-now">
                <span>Call us now 1300 283 460</span>
              </Nav.Link>
              <LinkContainer to="/profile">
                <Nav.Link>
                  <div>{/* ... other icons */}</div>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/wishlist">
                <Nav.Link>
                  <div>{/* ... other icons */}</div>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <div>
                    {/* ... other icons */}
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
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
      <Navbar
        bg="dark"
        className="nav-main"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>ABOUT US</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>SHOP</Nav.Link>
              </LinkContainer>
              <NavDropdown
                title="MADEIRA"
                id="madeira"
                className="dropdown"
                renderMenuOnMount={true}
              >
                <NavDropdown
                  title="Industrial"
                  id="industrial"
                  className="dropdown"
                  renderMenuOnMount={true}
                  style={{ position: "relative" }}
                >
                  <div className="dropdown">
                    <NavDropdown
                      title="Classic Rayon"
                      id="classic-rayon"
                      className="dropdown"
                      renderMenuOnMount={true}
                      style={{ position: "relative" }}
                    >
                      <div className="dropdown">
                        <LinkContainer to="/classic-rayon-5000">
                          <Nav.Link>Classic Rayon 5000</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/classic-rayon-10000">
                          <Nav.Link>Classic Rayon 10000</Nav.Link>
                        </LinkContainer>
                      </div>
                    </NavDropdown>
                  </div>
                  <LinkContainer to="/polyneon">
                    <Nav.Link>Polyneon</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/fire-fighter">
                    <Nav.Link>Fire Fighter</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/fs-cr-metallic">
                    <Nav.Link>Fs & Cr Metallic</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/super-twists">
                    <Nav.Link>Super Twists</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/frosted-matt">
                    <Nav.Link>Frosted Matt</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/aeroquilt-aerolock">
                    <Nav.Link>AeroQuilt and Aerolock</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/burmila-wood">
                    <Nav.Link>Burmilana Wool</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/burmilon-bobbin-thread">
                    <Nav.Link>Burmilon Bobbin Thread</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/monolon-transparent">
                    <Nav.Link>Monolon Transparent</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/monolon-transparent">
                    <Nav.Link>Luna Glow in Dark</Nav.Link>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown
                  title="Domestic"
                  id="domestic"
                  className="dropdown"
                  renderMenuOnMount={true}
                  style={{ position: "relative" }}
                >
                  <div className="dropdown">
                    <NavDropdown
                      title="Embroidery"
                      id="embrodiery"
                      className="dropdown"
                      renderMenuOnMount={true}
                      style={{ position: "relative" }}
                    >
                      <div className="dropdown">
                        <LinkContainer to="/madeira-hand-embroidery">
                          <Nav.Link>Madeira Hand Embroidery</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/sewing-overlock-threads">
                          <Nav.Link>Sewing & Overlock threads</Nav.Link>
                        </LinkContainer>
                      </div>
                    </NavDropdown>
                  </div>
                </NavDropdown>
              </NavDropdown>
              <LinkContainer to="/consumables">
                <NavDropdown
                  title="CONSUMABLES"
                  id="consumables"
                  className="dropdown"
                  renderMenuOnMount={true}
                >
                  <NavDropdown
                    title="Cutaway Backing"
                    id="cutawayBacking"
                    className="dropdown"
                    renderMenuOnMount={true}
                    style={{ position: "relative" }}
                  >
                    <LinkContainer to="/pre-cut-squares">
                      <Nav.Link>Pre Cut Squares</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/ca-precut-rolls">
                      <Nav.Link>CA Pre Cut Rolls</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cut-away-rolls">
                      <Nav.Link>Cut Away Rolls</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/no-show-cut-away">
                      <Nav.Link>No Show Cut Away</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown
                    title="Tearaway Backing"
                    id="tearawayBacking"
                    className="dropdown"
                    renderMenuOnMount={true}
                    style={{ position: "relative" }}
                  >
                    <LinkContainer to="/pre-cut-squares">
                      <Nav.Link>Pre Cut Squares</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/pre-cut-rolls">
                      <Nav.Link>Pre Cut Rolls</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tear-away-rolls">
                      <Nav.Link>Tear Away Rolls</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/dimple-tear-away">
                      <Nav.Link>Dimple Tear Away</Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer to="/tear-away-cut-away">
                <Nav.Link>Tearaway Cutaway</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/bobbin-threads">
                <Nav.Link>Bobbin Threads</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/solvy">
                <Nav.Link>Solvy Water Soluble</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/wash-away-backing">
                <Nav.Link>Wash Away Backing</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/badge-fabric">
                <Nav.Link>Badge Fabric & Iron on Backing</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/3d-foam">
                <Nav.Link>3D Embroidery Foam</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/3d-foam">
                <Nav.Link>Needles Scissiors & Stitch Erasers</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/3d-foam">
                <Nav.Link>Tajima Oil & Spray Products</Nav.Link>
              </LinkContainer>
                </NavDropdown>
              </LinkContainer>
              <LinkContainer to="/information">
                <Nav.Link>INFORMATION</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/digitising">
                <Nav.Link>DIGITISING</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
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
