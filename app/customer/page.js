'use client';  // Add this at the top

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
    <div>
      <h1>Customer Management</h1>

      {/* List All Customers */}
      <h2>Customers List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} ({customer.memberNumber}) - {customer.interests}
            <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
            <button onClick={() => handleUpdateCustomer({ ...customer, interests: 'updated interest' })}>
              Update
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Customer */}
      <h2>Add New Customer</h2>
      <input
        type="text"
        placeholder="Name"
        value={newCustomer.name}
        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={newCustomer.dateOfBirth}
        onChange={(e) => setNewCustomer({ ...newCustomer, dateOfBirth: e.target.value })}
      />
      <input
        type="number"
        placeholder="Member Number"
        value={newCustomer.memberNumber}
        onChange={(e) => setNewCustomer({ ...newCustomer, memberNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="Interests"
        value={newCustomer.interests}
        onChange={(e) => setNewCustomer({ ...newCustomer, interests: e.target.value })}
      />
      <button onClick={handleAddCustomer}>Add Customer</button>
    </div>
  );
};

export default CustomerPage;