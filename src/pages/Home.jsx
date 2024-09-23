import React, { useContext, useEffect, useState } from "react";
import { Globalstate } from "../context/GlobalState";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../styles/home.css";

const Home = () => {
  const state = useContext(Globalstate);
  const [cars] = state.cars;
  const [uniqueCarNames] = state.uniqueCarNames;
  const [refetch, setRefetch] = state.refetch;
  const [carList, setCarList] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const filteredCars = cars.filter((car) => car.carYear === 2023);
    setCarList([...filteredCars]);
  }, [cars]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 500; // Adjust this value as needed
      if (window.pageYOffset > scrollThreshold) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="3" md="4">
                <div
                  className="find__cars-left"
                  style={{ width: "140%", height: "100%" }}
                ></div>
              </Col>
              <Col lg="8" md="8" sm="12">
                <h1 style={{ marginTop: "1cm", paddingLeft: "15%" }}>
                  Your Dream Car Awaits
                </h1>
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>

      {/* =========== Feedback section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Feedback</h6>
              <h2 className="section__title">Our Clients Say</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
          <div className="section__line"></div>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore Our Blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
              
            </Col>
            <BlogList />
          </Row>
        </Container>
      </section>

      {showScrollToTop && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </div>
      )}
    </Helmet>
  );
};

export default Home;