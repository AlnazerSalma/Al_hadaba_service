import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { staticCars } from "../../pages/CarListing";
import { Globalstate } from "../../context/GlobalState";

const FindCarForm = () => {
  const state = useContext(Globalstate);
  const [cars] = state.cars;
  const [uniqueCarNames] = state.uniqueCarNames;

  const [filterOption, setFilterOption] = useState("all");
  const [filteredCarYear, setFilteredCarYears] = useState([]);
  const [selectedCarYear, setSelectedCarYear] = useState("all");

  useEffect(() => {}, [cars, uniqueCarNames]);

  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    const selectedCarName = event.target.value;
    setFilterOption(selectedCarName);

    if (selectedCarName !== "all") {
      const carYears = cars
        .filter((item) => item.carName === selectedCarName)
        .map((item) => item.carYear);
      setFilteredCarYears(carYears);
      setSelectedCarYear("all");
    } else {
      setFilteredCarYears([]);
      setSelectedCarYear("all");
    }
  };

  const handleCarYearFilterChange = (event) => {
    const selectedCarYear = event.target.value;
    setSelectedCarYear(selectedCarYear);
  };

  const handleFindCar = (e) => {
    e.preventDefault();
    navigate(`/cars/${filterOption}/${selectedCarYear}`);
  };

  return (
    <Form className="form">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="select__group">
          <span className="d-flex align-items-center gap-2">
            <i className="ri-filter-3-line"></i> Find By Car Name
          </span>
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="all">All</option>
            {uniqueCarNames.map((carName) => (
              <option value={carName} key={carName}>
                {carName}
              </option>
            ))}
          </select>
        </FormGroup>

        {filteredCarYear.length > 0 && (
          <FormGroup className="select__group">
            <span className="d-flex align-items-center gap-2">
              <i className="ri-filter-3-line"></i> Find By Car Year
            </span>
            <select
              value={selectedCarYear}
              onChange={handleCarYearFilterChange}
            >
              <option value="all">All</option>
              {[...new Set(filteredCarYear)].map((carYear) => (
                <option value={carYear} key={carYear}>
                  {carYear}
                </option>
              ))}
            </select>
          </FormGroup>
        )}

        <FormGroup className="form__group">
          <button
            className="btn find__car-btn"
            onClick={handleFindCar}
          >
            Find Car
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;