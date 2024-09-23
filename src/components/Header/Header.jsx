import React, { useContext, useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { Globalstate } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/login",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  const state = useContext(Globalstate);
  const navigate = useNavigate();
  const [search, setSearch] = state.search;
  const [refetch, setRefetch] = state.refetch;
  const [cartIsOpen, setCartIsOpen] = state.cartIsOpen;

  const openCart = () => {
    console.log("openCart");
    setCartIsOpen(true);
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isAdmin") === "true";

  const handleLogOut = () => {
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  return (
    <header className={`header ${isSmallScreen ? "header--black" : ""}`}>
      {/* Header top */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header_top_left">
                <span className="header_top_label">Need Help?</span>
                <div className="header_top_contact">
                  <i className="ri-phone-fill"></i>
                  <span className="header_top_phone">+972-59-555-2599</span>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
              <div className="header_top_right d-flex align-items-center justify-content-end gap-3">
                {isLoggedIn ? (
                  <>
                    {isLoggedIn && (
                      <Link
                        to="/admin-carlist"
                        className={`d-flex align-items-center gap-1 ${
                          isSmallScreen ? "text-black" : "text-white"
                        }`}
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        <i className="ri-car-fill"></i>
                      </Link>
                    )}
                    <Link
                      to="/login"
                      className={`d-flex align-items-center gap-1 ${
                        isSmallScreen ? "text-black" : "text-white"
                      }`}
                      onClick={handleLogOut}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      <i className="ri-logout-circle-line"></i> Log Out
                    </Link>
                  </>
                ) : (
                  <>
                    <i
                      className="ri-shopping-cart-2-fill my-2"
                      style={{ cursor: "pointer" }}
                      onClick={openCart}
                    ></i>
                    <Link
                      to="/login"
                      className={`d-flex align-items-center gap-1 ${
                        isSmallScreen ? "text-black" : "text-white"
                      }`}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      <i className="ri-login-circle-line"></i> Login
                    </Link>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Header middle */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="3" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link
                    to="/home"
                    className="d-flex align-items-center gap-2"
                  >
                    <i className="ri-car-line"></i>
                    <span>
                      AL-HADABA <br />
                      &nbsp; &nbsp; Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>
            <Col lg="4" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Palestine</h4>
                  <h6>Bethlehem City, WestBank</h6>
                </div>
              </div>
            </Col>
            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Satarday to Thursday</h4>
                  <h6>9 am - 6 pm</h6>
                </div>
              </div>
            </Col>
            <Col
              lg="2"
              md="3"
              sm="0"
              className="d-flex align-items-center justify-content-end"
            >
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main navigation */}
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
  <div className="menu">
    {navLinks.map((item, index) => (
      <NavLink
        to={item.path}
        className="nav__item"
        activeClassName="nav_active"
        key={index}
      >
        <span style={{ textDecoration: "none" }}>{item.display}</span>
      </NavLink>
    ))}
  </div>
</div>

            <div className="nav__right">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;