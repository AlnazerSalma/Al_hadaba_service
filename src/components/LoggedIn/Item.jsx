import React from 'react';
import { Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/car-item.css';
import { toast } from 'react-hot-toast';
const Item = (props) => {
  const {
    carCode,
    orderNumber,
    carName,
    carModel,
    carYear,
    buyPrice,
    imageURL,
  } = props.item;
  const { refetch = () => {} } = props;

  const navigate = useNavigate();

  async function deleteCar(carCode) {
    try {
      const res = await fetch(`http://localhost:8080/api/auth/cars/${carCode}`, {
        method: 'DELETE',
      });
      console.log(res);
      toast.success('Car deleted successfully.');
      refetch();
    } catch (error) {
      toast.error('Error deleting car:');
      console.error('Error deleting car:', error);
    }
  }

  const imagePath = 'http://localhost:8080/image/';

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div
        className="car__item"
        style={{
          height: '100%',
          fontSize: '20px',
        }}
      >
        <div
  className="car__img d-flex justify-content-center align-items-center"
  style={{ height: '200px', overflow: 'hidden' }}
>
  <img
    src={imagePath + imageURL}
    alt={carName}
    className="w-100"
    style={{ objectFit: 'cover' }}
  />
</div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {carModel}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-calendar-2-line"></i> {carYear}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-money-dollar-circle-line"></i> {buyPrice}
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <button
              style={{
                flex: 1,
                marginRight: '10px',
                fontWeight: 'bold',
                width: '110%',
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '10px', // default font size
              }}
              className="btn btn-info bg-info text-white"
              onClick={() => navigate(`/admin-details/${carCode}`)}
            >
              Details
            </button>
            <button
              style={{
                flex: 1,
                marginRight: '10px',
                backgroundColor: 'blue',
                fontWeight: 'bold',
                width: '110%',
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '10px', // default font size
              }}
              className="btn btn-success bg-success"
              onClick={() => navigate(`/update/${carCode}`)}
            >
              Update
            </button>
            <button
              style={{
                flex: 1,
                backgroundColor: 'red',
                fontWeight: 'bold',
                width: '110%',
                maxWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '10px', // default font size
              }}
              className="btn btn-danger"
              onClick={() => deleteCar(carCode)}
            >
              Delete
            </button>
          </div>
          {orderNumber ? (
            <div className="text-center mt-3">
              <span className="text-danger">Sold Out</span>
            </div>
          ) : (
            <div className="text-center mt-3">
              <span className="text-success">Available</span>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default Item;