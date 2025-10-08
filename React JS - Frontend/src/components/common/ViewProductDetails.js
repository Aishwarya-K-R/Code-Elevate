import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api_config/api';

function ViewProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await API.get(`/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        alert(err.response?.data || "Failed to fetch product details");
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Product Details</h1>

        <div className="space-y-3">
          <p><span className="font-semibold">Id:</span> {product.id}</p>
          <p><span className="font-semibold">Name:</span> {product.name}</p>
          <p><span className="font-semibold">Price:</span> ${product.price}</p>
          <p><span className="font-semibold">Stock:</span> {product.stock}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProductDetails;
