import axios from "axios";
import { createContext, useContext, useState, useMemo } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Allowed category mapping
  const allowedCategories = {
    smartphones: "mobile",
    laptops: "laptop",
    tablets: "tablet",
    "home-decoration": "appliances",
    lighting: "appliances",
    automotive: "audio",
  };

  // 🔹 Fetch all products from DummyJSON
  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("https://dummyjson.com/products?limit=200");
      const productsData = res.data.products || [];

      // Filter & remap categories
      const filteredProducts = productsData
        .filter((item) => allowedCategories[item.category])
        .map((item) => ({
          ...item,
          category: allowedCategories[item.category], // remap to your custom names
          brand: item.brand || "Unknown", // ✅ fallback for missing brand
        }));

      setData(filteredProducts);
    } catch (err) {
      console.error(" Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getUniqueValues = (arr, property) => {
    if (!arr || arr.length === 0) return ["All"];
    return [
      "All",
      ...new Set(
        arr
          .map((item) => item[property])
          .filter(Boolean) // ✅ removes null/undefined/empty
      ),
    ];
  };

  //  Memoize to avoid unnecessary recalculations
  const categoryOnlyData = useMemo(
    () => getUniqueValues(data, "category"),
    [data]
  );

  const brandOnlyData = useMemo(() => getUniqueValues(data, "brand"), [data]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        loading,
        error,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook
export const getData = () => useContext(DataContext);
