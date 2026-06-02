import {
  faCheckCircle,
  faClock,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    Completed: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: faCheckCircle,
    },
    Pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: faClock },
    Shipped: { bg: "bg-blue-100", text: "text-blue-800", icon: faTruck },
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span
      className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit`}
    >
      <FontAwesomeIcon icon={config.icon} />
      {status}
    </span>
  );
};

export const Orders = ({ orders }) => {
  const totalOrderValue = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter((o) => o.status === "Completed").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-gray-600 text-sm">Completed Orders</p>
          <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-purple-600">
            ${totalOrderValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-800">{order.customer}</p>
                <p className="text-sm text-gray-600">
                  Order #{order.id} • {order.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">
                  ${order.total.toFixed(2)}
                </p>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
