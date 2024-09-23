import React, { useEffect, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import OurMembers from "../components/UI/OurMembers";
import driveImg from "../assets/all-images/drive.jpg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../styles/about.css";

const About = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  Elevating the Online Car Buying Experience
                </h2>

                <p className="section__description">
                  When it comes to buying a car through our online shop, we
                  strive to provide a seamless and convenient experience that
                  rivals the traditional showroom. We understand that
                  purchasing a car online requires trust and confidence, and we
                  aim to exceed your expectations at every step.
                </p>

                <p className="section__description">
                  At Al-Hadabah, we are passionate about providing a positive
                  and memorable buying experience for our customers. We strive
                  to make the process easy, transparent, and personalized, so
                  you can confidently purchase a car online with us. Trust us
                  to deliver exceptional service and assist you in finding the
                  perfect car that meets your needs and exceeds your
                  expectations.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <BecomeDriverSection /> */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Experts</h6>
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
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

export default About;