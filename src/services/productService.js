const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const EXTERNAL_CATALOG_URL =
  import.meta.env.VITE_EXTERNAL_CATALOG_URL ||
  "https://api.escuelajs.co/api/v1";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${EXTERNAL_CATALOG_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to load product.Please Wait a Minute ");
    }
    return await response.json();
  } catch (error) {
    console.error("Product CDN fetching channel exception:", error);
    throw error;
  }
};

export const fetchTopCategories = async (limit = 5) => {
  try {
    const response = await fetch(
      `${EXTERNAL_CATALOG_URL}/categories?limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve operational categories map.");
    }
    return await response.json();
  } catch (error) {
    console.error("Category CDN fetching channel exception:", error);
    throw error;
  }
};
