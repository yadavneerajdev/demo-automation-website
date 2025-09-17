"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocalStorage, useModal } from "@/hooks";
import { MockDataService } from "@/services";
import { Product, CartItem } from "@/types";

export default function ShopPage() {
  const mockProducts = useMemo(() => MockDataService.generateProducts(24), []);
  const [cart, setCart] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const cartModal = useModal();
  const checkoutModal = useModal();
  const productModal = useModal();

  const [checkoutData, setCheckoutData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category.name === selectedCategory;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const categories = Array.from(
    new Set(mockProducts.map((p) => p.category.name))
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId)
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    checkoutModal.openModal();
  };

  const processCheckout = () => {
    // Simulate order processing
    alert(`Order placed successfully! Total: $${cartTotal.toFixed(2)}`);
    setCart([]);
    setCheckoutData({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    checkoutModal.closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Automation Testing Site
              </Link>
              <span className="ml-4 text-gray-500">/</span>
              <span className="ml-4 text-gray-700">Shop</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={cartModal.openModal}
                data-testid="cart-button"
                className="relative"
              >
                🛒 Cart ({cartItemCount})
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            E-commerce Testing
          </h1>
          <p className="mt-2 text-gray-600">
            Test shopping cart, product filtering, and checkout processes
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="product-search"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    data-testid="category-filter"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: parseInt(e.target.value),
                        }))
                      }
                      data-testid="price-min-slider"
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: parseInt(e.target.value),
                        }))
                      }
                      data-testid="price-max-slider"
                      className="w-full"
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                  data-testid="clear-filters"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products found
                </span>
                <div className="flex border rounded">
                  <button
                    onClick={() => setViewMode("grid")}
                    data-testid="grid-view"
                    className={`px-3 py-1 text-sm ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    data-testid="list-view"
                    className={`px-3 py-1 text-sm ${
                      viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  data-testid="sort-select"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className={`hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                  data-testid={`product-${index}`}
                >
                  <div
                    className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}
                  >
                    <div
                      className={`bg-gray-200 ${
                        viewMode === "list" ? "h-full" : "h-48"
                      } rounded-t-lg flex items-center justify-center`}
                    >
                      <span className="text-gray-500">Product Image</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription
                        className={viewMode === "list" ? "line-clamp-2" : ""}
                      >
                        {product.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${product.price}
                          </span>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600 ml-1">
                              {product.rating.toFixed(1)} ({product.reviewCount}{" "}
                              reviews)
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => productModal.openModal(product)}
                          data-testid={`view-product-${index}`}
                          className="flex-1"
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          data-testid={`add-to-cart-${index}`}
                          size="sm"
                          className="flex-1"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12" data-testid="no-products">
                <p className="text-gray-500">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {cartModal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          data-testid="cart-modal"
        >
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Shopping Cart</h3>
              <button
                onClick={cartModal.closeModal}
                data-testid="close-cart"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                    data-testid={`cart-item-${index}`}
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-green-600 font-medium">
                        ${item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        data-testid={`decrease-quantity-${index}`}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span
                        className="w-12 text-center"
                        data-testid={`quantity-${index}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        data-testid={`increase-quantity-${index}`}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      data-testid={`remove-item-${index}`}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">
                      Total: ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={cartModal.closeModal}
                      className="flex-1"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      data-testid="checkout-button"
                      className="flex-1"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutModal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          data-testid="checkout-modal"
        >
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Checkout</h3>
              <button
                onClick={checkoutModal.closeModal}
                data-testid="close-checkout"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                processCheckout();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={checkoutData.email}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    data-testid="checkout-email"
                    required
                  />
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    value={checkoutData.firstName}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    data-testid="checkout-first-name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    value={checkoutData.lastName}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    data-testid="checkout-last-name"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    value={checkoutData.address}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    data-testid="checkout-address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input
                    value={checkoutData.city}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    data-testid="checkout-city"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <Input
                    value={checkoutData.zipCode}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    data-testid="checkout-zip"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <Input
                    value={checkoutData.cardNumber}
                    onChange={(e) =>
                      setCheckoutData((prev) => ({
                        ...prev,
                        cardNumber: e.target.value,
                      }))
                    }
                    data-testid="checkout-card-number"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry
                    </label>
                    <Input
                      value={checkoutData.expiryDate}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          expiryDate: e.target.value,
                        }))
                      }
                      data-testid="checkout-expiry"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <Input
                      value={checkoutData.cvv}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          cvv: e.target.value,
                        }))
                      }
                      data-testid="checkout-cvv"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="text-right mb-4">
                  <span className="text-lg font-semibold">
                    Total: ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={checkoutModal.closeModal}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    data-testid="place-order"
                    className="flex-1"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {productModal.isOpen && productModal.data && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          data-testid="product-modal"
        >
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {productModal.data.name}
              </h3>
              <button
                onClick={productModal.closeModal}
                data-testid="close-product-modal"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-3xl font-bold text-green-600">
                    ${productModal.data.price}
                  </span>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {productModal.data.rating.toFixed(1)} (
                      {productModal.data.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{productModal.data.description}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded ${
                      productModal.data.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {productModal.data.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  <span className="text-sm text-gray-600">
                    {productModal.data.stockQuantity} available
                  </span>
                </div>
                <Button
                  onClick={() => {
                    addToCart(productModal.data);
                    productModal.closeModal();
                  }}
                  disabled={!productModal.data.inStock}
                  data-testid="add-to-cart-modal"
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
