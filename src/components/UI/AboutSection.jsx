import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
  <Row className="about__section">
    <Col lg="6" md="6">
      <div className="about__section-content">
        <h4 className="section__subtitle">About Us</h4>
        <h2 className="section__title">
          Welcome to Al-Hadabah Car Service
        </h2>
        <p className="section__description">
        At our Al-Hadabah online shop, we take pride in providing
                exceptional service and a wide selection of high-quality
                vehicles. With a passion for automobiles and a commitment to
                customer satisfaction, we strive to create a seamless and
                enjoyable car-buying experience. We carefully curate our
                inventory to offer a diverse range of makes and models, ensuring
                there's something for every preference and budget. Trustworthy
                and transparent, we prioritize your needs and offer competitive
                pricing and flexible financing options. Trust us to help you
                find the ideal car that meets your needs and exceeds your
                expectations, all with the convenience of Al-Hadabah's online
                shopping.        </p>

        <div className="about__section-item">
          <p className="section__description">
            <i className="ri-checkbox-circle-line"></i> Convenient Online Experience
          </p>

          <p className="section__description">
            <i className="ri-checkbox-circle-line"></i> Top-Quality Vehicles
          </p>
        </div>

        <div className="about__section-item">
          <p className="section__description">
            <i className="ri-checkbox-circle-line"></i> Detailed Vehicle Information
          </p>

          <p className="section__description">
            <i className="ri-checkbox-circle-line"></i> 24hr/7day Customer Support
          </p>
        </div>
      </div>
    </Col>

    <Col lg="6" md="6">
      <div className="about__img">
        <img src={aboutImg} alt="" className="w-100" />
      </div>
    </Col>
  </Row>
</Container>

    </section>
  );
};
export default AboutSection;