import Customer from "@/models/Customer";

// GET customer by ID
export async function GET(request, { params }) {
  const id = params.id;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response('Customer not found', { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    return new Response('Error fetching customer', { status: 500 });
  }
}

// DELETE customer by ID
export async function DELETE(request, { params }) {
  const id = params.id;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return new Response('Customer not found', { status: 404 });
    }
    return new Response('Customer deleted', { status: 200 });
  } catch (error) {
    return new Response('Error deleting customer', { status: 500 });
  }
}