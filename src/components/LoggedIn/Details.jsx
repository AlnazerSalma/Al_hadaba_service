import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Helmet from "../Helmet/Helmet";

const Details = () => {
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
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "70vh" }}
                >
                  <img
                    src={imagePath + singleCarItem?.imageURL}
                    alt=""
                    className="w-100"
                    style={{ marginTop: "5px" }}
                  />
                </div>
              )}
            </Col>
            <Col lg="6">
              <div className="car__info">
                {singleCarItem && (
                  <>
                  <br></br><br></br>
                    <h1 className="section__title" style={{ fontSize: "1.3rem", color: "black", marginBottom: "0.25rem" }}>
                      <h2 className="section__title" style={{ marginBottom: "0.25rem" }}>{singleCarItem?.carName}</h2>
                      {singleCarItem?.carCode}
                    </h1>
                    <h3 className="section__title" style={{ fontSize: "1.3rem", color: "black", marginBottom: "0.25rem" }}>
                      <div className="d-flex align-items-center gap-3 mb-2 mt-3">
                        <h6 className="rent__price fw-bold fs-6" style={{ marginBottom: "0" }}>
                          Buy Price: ${singleCarItem?.buyPrice}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center gap-3 mb-2 mt-1">
                        <h6 className="rent__price fw-bold fs-6" style={{ color: "black", marginBottom: "0" }}>
                          MSRP Price: ${singleCarItem?.msrp}
                        </h6>
                      </div>
                    </h3>
                    <p className="section__description" style={{ color: "black", marginBottom: "0.5rem" }}>
                      {singleCarItem?.carDescription}
                    </p>
                    <div className="d-flex align-items-center mt-3" style={{ columnGap: "3rem" }}>
                      <span className="d-flex align-items-center gap-1 section__description">
                        <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i> {singleCarItem?.carModel}
                      </span>
                      <span className="d-flex align-items-center gap-1 section__description">
                        <i className="ri-paint-line" style={{ color: "#f9a826" }}></i> {getColor(singleCarItem?.carDescription)}
                      </span>
                      <span className="d-flex align-items-center gap-1 section__description">
                        <i className="ri-team-line" style={{ color: "#f9a826" }}></i> {getPassengers(singleCarItem?.carDescription)}
                      </span>
                    </div>
                    Reserve Number:{" "}
                    <span className={singleCarItem?.orderNumber ? "" : "text-danger"} style={{ fontSize: "1.3rem" }}>
                      {singleCarItem?.orderNumber ? (
                        singleCarItem.orderNumber
                      ) : (
                        <span>No Reserve Number</span>
                      )}
                    </span>
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

export default Details;