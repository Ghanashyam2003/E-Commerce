import axios from "axios";
import { createContext, useContext, useState, useMemo } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch all products from DummyJSON
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=200");
      const productsData = res.data.products;

      // 🔹 Keep only categories we care about
      const allowedCategories = {
        smartphones: "mobile",
        laptops: "laptop",
        tablets: "tablet",
        "home-decoration": "appliances",
        lighting: "appliances",
        automotive: "audio",
      };

      const filteredProducts = productsData
        .filter((item) => Object.keys(allowedCategories).includes(item.category))
        .map((item) => ({
          ...item,
          category: allowedCategories[item.category], // remap to your custom names
        }));

      setData(filteredProducts);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // Function to extract unique values
  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property]);
    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };

  // ✅ Recalculate categories only when data changes
  const categoryOnlyData = useMemo(
    () => getUniqueCategory(data, "category"),
    [data]
  );

  const brandOnlyData = useMemo(
    () => getUniqueCategory(data, "brand"),
    [data]
  );

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
