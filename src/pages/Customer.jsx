import React, { useEffect, useState } from "react";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading customers...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customers</h2>

      {customers.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-600 shadow-sm">
          No customers found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <div key={customer._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-800">{customer.name}</h3>
              <p className="text-gray-600 text-sm">Email: {customer.email}</p>
              <p className="text-gray-600 text-sm">Phone: {customer.phone}</p>
              <p className="text-gray-500 text-xs mt-2">
                Joined: {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customer;
