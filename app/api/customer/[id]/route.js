import Customer from "@/models/Customer";

// GET a customer by ID
export async function GET(request, { params }) {
  const id = params.id;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    return new Response("Error fetching customer", { status: 500 });
  }
}

// PUT (Update) a customer by ID
export async function PUT(request, { params }) {
  const id = params.id;
  try {
    const body = await request.json();
    const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });
    if (!updatedCustomer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    return new Response("Error updating customer", { status: 400 });
  }
}

// DELETE a customer by ID
export async function DELETE(request, { params }) {
  const id = params.id;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response("Customer deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting customer", { status: 500 });
  }
}