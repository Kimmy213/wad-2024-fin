import Customer from "@/models/Customer";

// GET all customers
export async function GET() {
  try {
    const customers = await Customer.find();
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    return new Response("Error fetching customers", { status: 500 });
  }
}

// POST (Create) a new customer
export async function POST(request) {
  try {
    const body = await request.json();
    const newCustomer = new Customer(body);
    await newCustomer.save();
    return new Response(JSON.stringify(newCustomer), { status: 201 });
  } catch (error) {
    return new Response("Error adding customer", { status: 400 });
  }
}