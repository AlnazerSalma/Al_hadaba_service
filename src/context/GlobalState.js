import React, { createContext, useState, useEffect } from "react";
import { staticCars } from "../utils/staticCars";
import { toast } from "react-hot-toast";

export const Globalstate = createContext();

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [uniqueCarNames, setUniqueCarNames] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [reqStatus, setReqStatus] = useState("loading");
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const fetchData = () => {
    fetch("http://localhost:8080/api/auth/cars")
      .then((res) => res.json())

      .then((data) => {
        setReqStatus("success");
        if (data && data._embedded && data._embedded.carList.length > 0) {
          setCars(data._embedded.carList);
          setUniqueCarNames([
            ...new Set(data._embedded.carList.map((item) => item.carName)),
          ]);
        }
      })
      .catch((error) => {
        setReqStatus("error");
        // setCars([...staticCars]);
        // setUniqueCarNames([...new Set(staticCars.map((item) => item.carName))]);
        toast.error("Error fetching car data:");
      });
  };
  useEffect(() => {
    fetchData();
  }, [refetch]);

  const state = {
    cars: [cars, setCars],
    uniqueCarNames: [uniqueCarNames, setUniqueCarNames],
    search: [search, setSearch],
    refetch: [refetch, setRefetch],
    reqStatus: [reqStatus, setReqStatus],
    cartIsOpen: [cartIsOpen, setCartIsOpen],
  };

  return <Globalstate.Provider value={state}>{children}</Globalstate.Provider>;
};
