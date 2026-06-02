import {
  faDollarSign,
  faBox,
  faShoppingCart,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatCard = ({ icon, title, value, bgColor }) => {
  return (
    <div
      className={`${bgColor} p-6 rounded-lg shadow-lg text-white flex items-center gap-4`}
    >
      <div className="text-4xl">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export const Dashboard = ({ stats, cartItems, products }) => {
  const lowStockItems = products.filter((p) => p.stock < 20);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={faDollarSign}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          bgColor="bg-green-500"
        />
        <StatCard
          icon={faBox}
          title="Total Products"
          value={stats.totalProducts}
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={faShoppingCart}
          title="Cart Items"
          value={cartItems.length}
          bgColor="bg-purple-500"
        />
        <StatCard
          icon={faExclamationTriangle}
          title="Low Stock Items"
          value={stats.lowStockProducts}
          bgColor="bg-red-500"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Low Stock Products
          </h2>
          <div className="space-y-3">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <p className="font-bold text-yellow-600">{product.stock}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                All products in stock
              </p>
            )}
          </div>
        </div>

        {/* Shopping Cart Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Shopping Cart Summary
          </h2>
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-blue-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-3 mt-3">
                <p className="text-right font-bold text-gray-800">
                  Total: $
                  {cartItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};
