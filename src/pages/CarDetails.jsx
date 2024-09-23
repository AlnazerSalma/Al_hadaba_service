import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { toast } from "react-hot-toast";

const CarDetails = () => {
  const { slug } = useParams();
  const [singleCarItem, setSingleCarItem] = useState({});
  const [reqStatus, setReqStatus] = useState("loading");

  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/cars/" + slug);
      const data = await response.json();
      setSingleCarItem({ ...data });
      setReqStatus("success");
    } catch (error) {
      toast.error("Error fetching car details");
      console.error("Error fetching car data:", error);
      setReqStatus("error");
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [slug]);

  const getColor = (carDescription) => {
    const colorRegex = /Color:\s*(\w+)/;
    const matches = carDescription?.match(colorRegex);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return "Unknown";
  };

  const getPassengers = (carDescription) => {
    const passengersRegex = /passengers:\s*(\w+)/;
    const matches = carDescription?.match(passengersRegex);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return "Unknown";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  const imagePath = "http://localhost:8080/image/";

  return reqStatus === "loading" ? (
    <h2 className="text-center mt-5">Loading...</h2>
  ) : reqStatus === "success" ? (
    <Helmet title={singleCarItem ? singleCarItem?.carName : ""}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              {singleCarItem && (
                <img src={imagePath + singleCarItem?.imageURL} alt="" className="w-100" />
              )}
            </Col>

            <Col lg="6">
              <div className="car__info">
                {singleCarItem && (
                  <>
                    <h2 className="section__title">{singleCarItem?.carName}</h2>
                    <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                      <h6 className="section__title">
                        ${singleCarItem?.buyPrice}
                      </h6>
                    </div>
                    <p className="section__description">
                      {singleCarItem?.carDescription}
                    </p>
                    <div
                      className="d-flex align-items-center mt-3"
                      style={{ columnGap: "5rem" }}
                    >
                      <span className="d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-roadster-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {singleCarItem?.carModel}
                      </span>
                      <span className="d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-paint-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {getColor(singleCarItem?.carDescription)}
                      </span>
                      <span className="d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-team-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {getPassengers(singleCarItem?.carDescription)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  ) : (
    <h2 className="text-center mt-5">No Data Found...</h2>
  );
};

export default CarDetails;