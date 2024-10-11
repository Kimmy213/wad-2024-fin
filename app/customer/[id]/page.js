import { notFound } from "next/navigation";

export default async function CustomerDetail({ params }) {
  // Fallback to a default API base URL if not set
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  // Fetch customer data by ID
  const res = await fetch(`${API_BASE}/customer/${params.id}`, { cache: "no-store" });

  // Check if the response is okay
  if (!res.ok) {
    return notFound();  // Handle the case when the customer is not found (404)
  }

  const customer = await res.json();

  return (
    <div className="m-4">
      <h1>Customer Details</h1>
      <p className="font-bold text-xl text-blue-800">{customer.name}</p>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}