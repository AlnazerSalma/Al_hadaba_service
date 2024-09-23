import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/customers');
      const data = await response.json();
      setCustomers(data._embedded.customerList);
    } catch (error) {
      console.log('Error fetching customers:', error);
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/customers/${editCustomer.customerNumber}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editCustomer),
        }
      );
      if (response.ok) {
        // Update the customers list with the edited customer
        const updatedCustomers = customers.map((customer) =>
          customer.customerNumber === editCustomer.customerNumber
            ? editCustomer
            : customer
        );
        setCustomers(updatedCustomers);
        setEditCustomer(null);
      } else {
        console.log('Error updating customer:', response.status);
      }
    } catch (error) {
      console.log('Error updating customer:', error);
    }
  };

  const handleCancel = () => {
    setEditCustomer(null);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ margin: '70px' }}>
      <Container>
        <h1 className="h2">Customers</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Address Line1</th>
              <th>Address Line2</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerNumber}>
                <td>{customer.customerNumber}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.contactFirstName}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        contactFirstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.contactFirstName
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.contactLastName}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        contactLastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.contactLastName
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.phone}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.phone
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.addressLine1}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        addressLine1: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.addressLine1
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.addressLine2}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        addressLine2: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.addressLine2
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.city}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        city: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.city
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.state}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        state: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.state
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.postalCode}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        postalCode: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.postalCode
                )}</td>
                <td>{editCustomer?.customerNumber === customer.customerNumber ? (
                  <input
                    type="text"
                    value={editCustomer.country}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        country: e.target.value,
                      })
                    }
                  />
                ) : (
                  customer.country
                )}</td>
                <td>
                  {editCustomer?.customerNumber === customer.customerNumber ? (
                    <>
                      <Button variant="success" onClick={handleSave}>
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => handleEdit(customer)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Customers;
