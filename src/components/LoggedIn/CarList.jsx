import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import Item from "./Item";
import AddCar from "../LoggedIn/AddCar";
import { Link } from "react-router-dom";
import { Globalstate } from "../../context/GlobalState";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const CarList = () => {
  const state = useContext(Globalstate);
  const [cars] = state.cars;
  const [search] = state.search;
  const [uniqueCarNames] = state.uniqueCarNames;
  const [refetch, setRefetch] = state.refetch;
  const [sortOption, setSortOption] = useState("none");
  const [filterOption, setFilterOption] = useState("all");
  const [filteredCarModels, setFilteredCarModels] = useState([]);
  const [selectedCarModel, setSelectedCarModel] = useState("all");
  const [carList, setCarList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;
  const [reqStatus] = state.reqStatus;

  useEffect(() => {
    setCarList([...cars]);
  }, [cars, uniqueCarNames]);

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
    const filterBySearch = () => {
      if (search) {
        const filteredCars = cars.filter((car) =>
          car.carName.toLowerCase().includes(search.toLowerCase())
        );
        setCarList([...filteredCars]);
      }
    };

    useEffect(() => {
      filterBySearch();
    }, [search, cars]);
  // Pagination logic
  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = sortedCarData.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(sortedCarData.length / carsPerPage);

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return reqStatus === "loading" ? (
    <h2 className="text-center mt-5">Loading...</h2>
  ) : reqStatus === "success" ? (
    <Helmet title="Cars">
      <section>
        <Container>
          <Row>
            <Col lg="12">
            <div className="d-flex justify-content-end mb-3">
  <Link to="/add-car" className="btn btn-outline-primary" style={{ marginRight: '15px' }}>
    Add Car
  </Link>
  <Link to="/show-orders" className="btn btn-outline-primary" style={{ marginRight: '15px' }}>
    Show Reserves
  </Link>
  <Link to="/show-customers" className="btn btn-outline-primary" style={{ marginRight: '15px' }}>
    Show Customers
  </Link>
</div>

              <div className="d-flex align-items-center gap-3 mb-5">
                <div>
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc" style={{ color: "black" }}></i> Sort By
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
              <Item item={item} key={item.carCode} refetch={handleRefetch} />
            ))}
          </Row>
          <Row>
            <Col lg="12">
              <nav aria-label="Car Pagination" className="mt-4">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                    style={{ color: 'black' }}
                  />
                </Stack>
              </nav>
              <div className="text-center mt-4">
                <button className="btn btn-light" onClick={handleScrollToTop}>
                  <KeyboardArrowUpIcon style={{ background: '#008080' }} />
                </button>
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

export default CarList;