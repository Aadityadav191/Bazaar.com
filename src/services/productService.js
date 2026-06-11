// Product APIs

import api from "./apiConfig";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Add these dedicated data extraction handlers to your productService file
export const fetchProducts = async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products');
  if (!response.ok) throw new Error('Failed to retrieve catalog dataset.');
  
  const data = await response.json();
  
  // Clean broken stringified array brackets if present in API
  return data.map(product => ({
    ...product,
    images: product.images.map(img => img.replace(/[[\]"]/g, ""))
  }));
};

export const fetchTopCategories = async (limit = 5) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/categories?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to retrieve categories map.');
  return await response.json();
};