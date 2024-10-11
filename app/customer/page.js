'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    try {
      const response = await fetch('/api/customer');
      if (!response.ok) {
        throw new Error(`Error fetching customers: ${response.statusText}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      setCustomers([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Add a new customer (POST)
  const handleAddCustomer = async () => {
    try {
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error(`Error adding customer: ${response.statusText}`);
      }

      setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
      fetchCustomers(); // Refresh the list after adding
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  // Delete customer (DELETE)
  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`/api/customer/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting customer: ${response.statusText}`);
      }

      fetchCustomers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  // Update customer (PUT)
  const handleUpdateCustomer = async (updatedCustomer) => {
    try {
      const response = await fetch(`/api/customer/${updatedCustomer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomer),
      });

      if (!response.ok) {
        throw new Error(`Error updating customer: ${response.statusText}`);
      }

      fetchCustomers(); // Refresh the list after update
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Form Section */}
      <div style={{ flex: '1', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Add New Customer</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
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
          <button onClick={handleAddCustomer} style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            Add Customer
          </button>
        </div>
      </div>

      {/* Customers List Section */}
      <div style={{ flex: '2', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Customers ({customers.length})</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <li key={customer._id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                <div>
                  <strong>Name:</strong> <Link href={`/customer/${customer._id}`}>{customer.name}</Link>
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
      </div>
    </div>
  );
};

export default CustomerPage;