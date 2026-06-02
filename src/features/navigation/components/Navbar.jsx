import {
  faHome,
  faBox,
  faShoppingCart,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = ({ currentPage, setCurrentPage, cartCount }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: faHome },
    { id: "products", label: "Inventory", icon: faBox },
    { id: "orders", label: "Orders", icon: faReceipt },
  ];

  return (
    <nav className="flex items-center justify-between py-4 px-5 md:px-10 border-b border-gray-200 shadow-sm bg-white">
      <h1 className="text-3xl font-bold text-blue-600">eCommerce Dashboard</h1>

      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Cart Count Badge */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-2xl text-blue-600"
          />
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};
