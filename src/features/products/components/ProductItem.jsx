import {
  faPencilAlt,
  faTrash,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProductItem = ({ product, onAddToCart, onEdit, onDelete }) => {
  const stockStatus =
    product.stock > 50
      ? "In Stock"
      : product.stock > 0
        ? "Low Stock"
        : "Out of Stock";
  const stockColor =
    product.stock > 50
      ? "text-green-600"
      : product.stock > 0
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div
      className={`${product.bgColor} p-5 rounded-lg shadow-lg text-white flex flex-col`}
    >
      <div className="mb-3">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-xs opacity-75 mb-1">{product.category}</p>
      </div>

      <p className="text-sm opacity-90 mb-3 flex-grow">{product.description}</p>

      <div className="border-t border-white opacity-50 my-2 pt-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${stockColor}`}>
            {stockStatus} ({product.stock})
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-white text-gray-800 py-2 rounded font-semibold hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to Cart
        </button>
        <button
          onClick={onEdit}
          className="w-[40px] h-[40px] bg-white text-gray-800 rounded flex items-center justify-center hover:bg-gray-100"
          title="Edit product"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button
          onClick={onDelete}
          className="w-[40px] h-[40px] bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700"
          title="Delete product"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
