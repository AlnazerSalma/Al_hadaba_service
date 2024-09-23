import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { useNavigate, useParams } from "react-router-dom";
import { Globalstate } from "../context/GlobalState";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const CarListing = () => {
  const { carName, carYear } = useParams();

  const state = useContext(Globalstate);
  const [search] = state.search;
  const [cars] = state.cars;
  const [uniqueCarNames] = state.uniqueCarNames;
  const [reqStatus] = state.reqStatus;

  const [sortOption, setSortOption] = useState("none");
  const [filterOption, setFilterOption] = useState("all");
  const [filteredCarModels, setFilteredCarModels] = useState([]);
  const [selectedCarModel, setSelectedCarModel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  const [carList, setCarList] = useState([...cars]);

  const filteringByNameAndYear = () => {
    setCarList([...cars]);
    if (carName && carYear) {
      if (carName === "all" && carYear === "all") {
        setCarList([...cars]);
      } else if (carName !== "all" && carYear === "all") {
        const filteredCars = cars.filter((car) => car.carName === carName);
        setCarList([...filteredCars]);
      } else if (carName !== "all" && carYear !== "all") {
        const filteredCars = cars.filter((car) => {
          const flag = car.carName === carName && +carYear === car.carYear;
          return flag;
        });
        setCarList([...filteredCars]);
      }
    }
  };

  const filterBySearch = () => {
    if (search) {
      const filteredCars = cars.filter((car) =>
        car.carName.toLowerCase().includes(search.toLowerCase())
      );
      setCarList([...filteredCars]);
    }
  };

  useEffect(() => {
    filteringByNameAndYear();
    filterBySearch();
  }, [search, cars]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    const selectedCarName = event.target.value;
    setFilterOption(selectedCarName);
    if (selectedCarName !== "all") {
      const carModels = carList
        .filter((item) => item.carName === selectedCarName)
        .map((item) => item.carModel);
      setFilteredCarModels(carModels);
      setSelectedCarModel("all");
    } else {
      setFilteredCarModels([]);
      setSelectedCarModel("all");
    }
  };

  const handleCarModelFilterChange = (event) => {
    const selectedCarModel = event.target.value;
    setSelectedCarModel(selectedCarModel);
  };

  const sortedCarData = [...carList]
    .sort((a, b) => {
      if (sortOption === "low") {
        return a.buyPrice - b.buyPrice;
      } else if (sortOption === "high") {
        return b.buyPrice - a.buyPrice;
      } else {
        return 0;
      }
    })
    .filter((item) => {
      if (filterOption === "all") {
        return true;
      } else {
        return item.carName === filterOption;
      }
    })
    .filter((item) => {
      if (selectedCarModel === "all") {
        return true;
      } else {
        return item.carModel === selectedCarModel;
      }
    });

  // Get current cars for the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = sortedCarData.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(sortedCarData.length / carsPerPage);
  const navigate = useNavigate();

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const checkScrollTop = () => {
    if (!showScrollToTop && window.pageYOffset > 400) {
      setShowScrollToTop(true);
    } else if (showScrollToTop && window.pageYOffset <= 400) {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  return reqStatus === "loading" ? (
    <h2 className="text-center mt-5">Loading...</h2>
  ) : reqStatus === "success" ? (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <div>
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort By
                  </span>
                  <select value={sortOption} onChange={handleSortChange}>
                    <option value="none">Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
                <div>
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-filter-3-line"></i> Filter By Car Name
                  </span>
                  <select value={filterOption} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    {uniqueCarNames.map((carName) => (
                      <option value={carName} key={carName}>
                        {carName}
                      </option>
                    ))}
                  </select>
                </div>
                {filteredCarModels.length > 0 && (
                  <div>
                    <span className="d-flex align-items-center gap-2">
                      <i className="ri-filter-3-line"></i> Filter By Car Model
                    </span>
                    <select
                      value={selectedCarModel}
                      onChange={handleCarModelFilterChange}
                    >
                      <option value="all">All</option>
                      {[...new Set(filteredCarModels)].map((carModel) => (
                        <option value={carModel} key={carModel}>
                          {carModel}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </Col>
            {currentCars.map((item) => (
              <CarItem item={item} key={item.carCode} />
            ))}
          </Row>
          <Row>
            <Col lg="12">
              <nav aria-label="Car Pagination" className="mt-4">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    boundaryCount={1} // Show only one page at the start and end
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        style={{
                          backgroundColor:
                            item.page === currentPage ? "blue" : "inherit",
                          color:
                            item.page === currentPage ? "white" : "inherit",
                        }}
                      />
                    )}
                  />
                </Stack>
              </nav>
            </Col>
          </Row>
          {showScrollToTop && (
            <div
              className="scroll-to-top"
              onClick={scrollToTop}
            >
              <ArrowUpwardIcon />
            </div>
          )}
        </Container>
      </section>
    </Helmet>
  ) : (
    <h2 className="text-center mt-5">No Data Found...</h2>
  );
};

export default CarListing;