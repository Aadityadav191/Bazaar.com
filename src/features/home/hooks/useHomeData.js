import { useState, useEffect } from "react";
import { fetchProducts, fetchTopCategories } from "../../../services/productService";

export const useHomeData = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  
  // Aligning exactly with Shop state architecture
  const [activeTab, setActiveTab] = useState("all"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          fetchProducts(),
          fetchTopCategories(5),
        ]);

        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error("Critical dashboard catalog acquisition abort:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // The precise robust filter engine matching the Shop file functionality
  const filteredProducts = products.filter((product) => {
    return (
      activeTab === "all" ||
      product.category?.name.toLowerCase() === activeTab.toLowerCase()
    );
  });

  return {
    categories,
    loading,
    activeTab,
    setActiveTab,
    favorites,
    toggleFavorite,
    filteredProducts
  };
};