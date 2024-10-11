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
  const [editMode, setEditMode] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);

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
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `/api/customer/${currentCustomerId}` : '/api/customer';
      const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error(`Error ${editMode ? 'updating' : 'adding'} customer: ${response.statusText}`);
      }

      setNewCustomer({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
      setEditMode(false);
      setCurrentCustomerId(null);
      fetchCustomers(); // Refresh the list after adding/updating
    } catch (error) {
      console.error(`Failed to ${editMode ? 'update' : 'add'} customer:`, error);
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

  // Edit customer (populate the form with existing customer data)
  const handleEditCustomer = (customer) => {
    setNewCustomer({
      name: customer.name,
      dateOfBirth: customer.dateOfBirth,
      memberNumber: customer.memberNumber,
      interests: customer.interests,
    });
    setEditMode(true);
    setCurrentCustomerId(customer._id); // Save the ID of the customer to update
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Form Section */}
      <div style={{ flex: '1', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>{editMode ? 'Update' : 'Add New'} Customer</h2>
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
            {editMode ? 'Update Customer' : 'Add Customer'}
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
                <button onClick={() => handleEditCustomer(customer)} style={{ marginRight: '10px' }}>
                  Edit
                </button>
                    <button onClick={() => handleDeleteCustomer(customer._id)} 
                    style={{color: 'red' }}>
                  Delete
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