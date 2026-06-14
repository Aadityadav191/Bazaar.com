import api, { catalogApi } from "./apiConfig";

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

/* ====================== EXTERNAL CDN DISPATCHERS (EscuelaJS Catalog Data) =================== */

export const fetchProducts = async () => {
  try {
    const response = await catalogApi.get("/products");
    const data = response.data;
    return data.map((product) => ({
      ...product,
      images: product.images.map((img) => img.replace(/[[\]"]/g, "")),
    }));
  } catch (error) {
    console.error("Operational breakdown pulling catalog cache matrix:", error);
    throw new Error("Failed to retrieve catalog dataset from CDN system.");
  }
};

export const fetchTopCategories = async (limit = 5) => {
  try {
    const response = await catalogApi.get(`/categories?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Operational breakdown pulling categories map:", error);
    throw new Error("Failed to retrieve categories taxonomy map.");
  }
};
