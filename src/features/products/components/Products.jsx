import { useState } from "react";
import {
  faPencilAlt,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductItem } from "./ProductItem";

export const Products = ({ products, setProducts, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    bgColor: "bg-blue-500",
  });

  const categories = [
    "All",
    "Electronics",
    "Accessories",
    "Office",
    "Peripherals",
    "Furniture",
  ];
  const colors = [
    "bg-blue-500",
    "bg-gray-500",
    "bg-slate-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-600",
    "bg-cyan-500",
    "bg-teal-600",
  ];

  const handleAddProduct = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (isEditing) {
      setProducts(
        products.map((p) =>
          p.id === editId
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
              }
            : p,
        ),
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      setProducts([...products, newProduct]);
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      bgColor: "bg-blue-500",
    });
    setIsAdding(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      bgColor: product.bgColor,
    });
    setEditId(product.id);
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            if (isEditing) {
              setIsEditing(false);
              setEditId(null);
            }
            setFormData({
              name: "",
              category: "",
              price: "",
              stock: "",
              description: "",
              bgColor: "bg-blue-500",
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          {isAdding ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500"
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="col-span-1 md:col-span-2 border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500 resize-none"
              rows="3"
            />
            <div className="col-span-1 md:col-span-2 flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, bgColor: color })}
                  className={`w-10 h-10 rounded-full ${color} border-4 ${
                    formData.bgColor === color
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-semibold"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};
