import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/cars");
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display your data */}
      {data.map((item) => (
        <div key={item.car_code}>{item.Year}</div>
      ))}
    </div>
  );
};

export default MyComponent;
