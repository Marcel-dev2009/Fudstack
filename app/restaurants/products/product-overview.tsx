/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  UploadCloud,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import AddProduct from "./add-product";
import { Restaurant } from "@/lib/generated/prisma";
import {
  getProducts,
  ProductItem,
} from "@/lib/actions/getProducts";

interface ProductOverviewProps {
  restaurant: Restaurant[];
}

export default function ProductOverview({
  restaurant,
}: ProductOverviewProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] =
    useState<string>("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch products whenever the selected restaurant changes
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts(selectedRestaurantId);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, [selectedRestaurantId]);

  const handleSelectRestaurant = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
  };

  const handleOpenAddProduct = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6">
      {/* TOP BAR / HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            Products Overview
          </h1>

          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage your restaurant menu items, stock status, and listings.
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedRestaurantId}
          onClick={() => {
            if (selectedRestaurantId) {
              setIsModalOpen(true);
            }
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-burn text-white text-xs sm:text-sm font-semibold shadow-md shadow-brand-burn/20 hover:brightness-110 active:scale-[0.98] transition-all shrink-0 self-start sm:self-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* RESTAURANT SELECTOR */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-neutral-900">
          Select Restaurant
        </h2>

        <div className="flex flex-wrap gap-2">
          {restaurant.map((res) => (
            <button
              key={res.id}
              type="button"
              onClick={() => handleSelectRestaurant(res.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedRestaurantId === res.id
                  ? "bg-brand-burn text-white border-brand-burn"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-burn"
              }`}
            >
              {res.name}
            </button>
          ))}
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-medium outline-none focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/10 transition-all placeholder:text-neutral-400"
          />
        </div>

        <div className="text-xs text-neutral-500 self-end sm:self-center">
          Total items:{" "}
          <span className="font-bold text-neutral-900">
            {products.length}
          </span>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {/* ADD PRODUCT CARD */}
        {selectedRestaurantId && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() =>
              handleOpenAddProduct(selectedRestaurantId)
            }
            className="rounded-2xl border-2 border-dashed border-neutral-300 hover:border-brand-burn bg-white p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-60 group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-burn/10 text-brand-burn flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold text-neutral-800 group-hover:text-brand-burn transition-colors">
              Click to add products
            </span>

            <span className="text-[11px] text-neutral-400 mt-1 max-w-40">
              Create new featured menu items
            </span>
          </motion.div>
        )}

        {/* PRODUCTS */}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full bg-neutral-100 overflow-hidden">
                <img
                  src={product.logoUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm ${
                      product.inStock
                        ? "bg-emerald-500/90 text-white"
                        : "bg-neutral-900/80 text-white"
                    }`}
                  >
                    {product.inStock ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        In Stock
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-neutral-900 line-clamp-1">
                    {product.name}
                  </h3>

                  <span className="font-extrabold text-sm text-brand-burn shrink-0">
                    ₦{(product.price / 100).toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="px-4 py-3 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span>
                Stock:{" "}
                <strong className="text-neutral-800">
                  {product.stockQuantity}
                </strong>
              </span>

              <span className="text-neutral-400">
                ID: {product.id.slice(0, 6)}...
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PRODUCT MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedRestaurantId && (
          <AddProduct
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            restaurantId={selectedRestaurantId}
            onSuccess={(newProduct) => {
              setProducts((prev) => [
                ...prev,
                newProduct as ProductItem,
              ]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}