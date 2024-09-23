import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/orders');
      const data = await response.json();
      setOrders(data._embedded.ordersList);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteOrder(orderNumber) {
    try {
      const res = await fetch(`http://localhost:8080/api/auth/orders/${orderNumber}`, {
        method: "DELETE",
      });
      console.log(res);
      toast.success("Order deleted successfully.");
  
      // Delete the associated customer
      const order = orders.find((order) => order.orderNumber === orderNumber);
      if (order) {
        await fetch(`http://localhost:8080/api/auth/customers/${order.customerNumber}`, {
          method: "DELETE",
        });
        toast.success("Customer deleted successfully.");
      }
  
      refetch();
    } catch (error) {
      toast.error("Error deleting order:");
      console.error("Error deleting order:", error);
    }
  }
  

  const updateOrder = (order) => {
    setIsUpdateMode(true);
    setSelectedOrder(order);
  };

  const saveUpdatedOrder = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/auth/orders/${selectedOrder.orderNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOrder),
      });
      console.log(res);
      toast.success('Order updated successfully.');
      setIsUpdateMode(false);
      setSelectedOrder(null);
      refetch();
    } catch (error) {
      toast.error('Error updating order:');
      console.error('Error updating order:', error);
    }
  };

  const refetch = () => {
    fetchOrders();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  return (
    <div style={{ margin: '50px' }}>
      <h1>Reserves</h1>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Reserve Number</th>
            <th>Reserve Date</th>
            <th>Status</th>
            <th>Customer Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderNumber}>
              <td className="align-middle">{order.orderNumber}</td>
              <td className="align-middle">
                {isUpdateMode && selectedOrder?.orderNumber === order.orderNumber ? (
                  <input
                    type="text"
                    name="orderDate"
                    value={selectedOrder.orderDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.orderDate
                )}
              </td>
              <td className="align-middle">
                {isUpdateMode && selectedOrder?.orderNumber === order.orderNumber ? (
                  <input
                    type="text"
                    name="status"
                    value={selectedOrder.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.status
                )}
              </td>
              <td className="align-middle">{order.customerNumber}</td>
              <td className="align-middle">
                {!isUpdateMode && (
                  <>
                    <Button
                      variant="danger"
                      style={{ fontWeight: 'bold', marginRight: '10px', marginBottom: '10px' }}
                      size="sm"
                      onClick={() => deleteOrder(order.orderNumber)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      size="sm"
                      onClick={() => updateOrder(order)}
                    >
                      Update
                    </Button>
                  </>
                )}

                {isUpdateMode && selectedOrder?.orderNumber === order.orderNumber && (
                  <>
                    <Button
                      variant="primary"
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      size="sm"
                      onClick={saveUpdatedOrder}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      size="sm"
                      onClick={() => {
                        setIsUpdateMode(false);
                        setSelectedOrder(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;