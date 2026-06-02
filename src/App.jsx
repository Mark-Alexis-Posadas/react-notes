import { useState, useEffect } from "react";
import { Navbar, Dashboard, Products, Orders } from "./features";
import { products } from "./features/products";
import { orders } from "./features/orders";
import { useDashboardStats } from "./features/dashboard";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [cartItems, setCartItems] = useState([]);
  const [productList, setProductList] = useState(() => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      return storedProducts || products;
    } catch (error) {
      console.error(error);
      return products;
    }
  });
  const [orderList] = useState(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders"));
      return storedOrders || orders;
    } catch (error) {
      console.error(error);
      return orders;
    }
  });

  const dashboardStats = useDashboardStats(productList, orderList);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orderList));
  }, [orderList]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return (
          <Products
            products={productList}
            setProducts={setProductList}
            onAddToCart={handleAddToCart}
          />
        );
      case "orders":
        return <Orders orders={orderList} />;
      case "dashboard":
      default:
        return (
          <Dashboard
            stats={dashboardStats}
            cartItems={cartItems}
            products={productList}
          />
        );
    }
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.length}
      />
      <div className="p-5 md:p-10">{renderPage()}</div>
    </>
  );
};

export default App;
