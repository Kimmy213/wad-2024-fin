'use client';

import React, { useState, useEffect } from 'react';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: ''
  });

  // Fetch all customers (GET)
  const fetchCustomers = async () => {
    const response = await fetch('/api/customer');
    const data = await response.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Add a new customer (POST)
  const handleAddCustomer = async () => {
    await fetch('/api/customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer)
    });
    setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    fetchCustomers(); // Refresh the list after adding
  };

  // Delete customer (DELETE)
  const handleDeleteCustomer = async (id) => {
    await fetch(`/api/customer/${id}`, {
      method: 'DELETE'
    });
    fetchCustomers(); // Refresh the list after deletion
  };

  // Update customer (PUT)
  const handleUpdateCustomer = async (updatedCustomer) => {
    await fetch(`/api/customer/${updatedCustomer._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCustomer)
    });
    fetchCustomers(); // Refresh the list after update
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Customer Management</h1>

      {/* List All Customers */}
      <h2>Customers List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <li key={customer._id} style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
              <div>
                <strong>Name:</strong> {customer.name} ({customer.memberNumber})
              </div>
              <div>
                <strong>Interests:</strong> {customer.interests}
              </div>
              <button onClick={() => handleDeleteCustomer(customer._id)} style={{ marginRight: '10px' }}>
                Delete
              </button>
              <button onClick={() => handleUpdateCustomer({ ...customer, interests: 'Updated Interest' })}>
                Update
              </button>
            </li>
          ))
        ) : (
          <li>No customers found</li>
        )}
      </ul>

      {/* Add New Customer */}
      <h2>Add New Customer</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={newCustomer.dateOfBirth}
          onChange={(e) => setNewCustomer({ ...newCustomer, dateOfBirth: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Member Number"
          value={newCustomer.memberNumber}
          onChange={(e) => setNewCustomer({ ...newCustomer, memberNumber: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Interests"
          value={newCustomer.interests}
          onChange={(e) => setNewCustomer({ ...newCustomer, interests: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <button onClick={handleAddCustomer} style={{ width: '100px' }}>
          Add Customer
        </button>
      </div>
    </div>
  );
};

export default CustomerPage;