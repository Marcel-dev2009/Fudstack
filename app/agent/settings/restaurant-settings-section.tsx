/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit2,
  Trash2,
  MapPin,
  Users,
  Check,
  X,
  AlertTriangle,
  Plus,
  Minus,
} from "lucide-react";
import { AutoLocationData } from "@/lib/cache/getRestaurant";
import {
  RestaurantUpdates,
  updateRestaurantData,
} from "@/lib/actions/update-restaurant-data";
import { toast } from "sonner";

interface RestaurantProps {
  name: string;
  id: string;
  logoUrl: string | null;
  phone: string;
  email: string;
  staffNos: number;
  location: AutoLocationData;
  status: string;
  organizationId: string;
}

interface Props {
  restaurants: RestaurantProps[];
}

export default function RestaurantSection({ restaurants }: Props) {
  const [editingId, setEditingId] = useState<string | null>();

  const [formData, setFormData] = useState<RestaurantUpdates>({});

  const [deleteModalItem, setDeleteModalItem] =
    useState<RestaurantProps | null>(null);

  const [confirmInput, setConfirmInput] = useState("");

  // ------------------------------------------
  // START EDITING
  // ------------------------------------------

  const handleStartEdit = (restaurant: RestaurantProps) => {
    if(!restaurant.location) return null;
    setEditingId(restaurant.id);

    setFormData({
      name: restaurant.name,
      staffNos: restaurant.staffNos,

      location: {
        city: restaurant.location.city,
        state: restaurant.location.state,
        address: restaurant.location.address,
      },
    });
  };

  // ------------------------------------------
  // UPDATE SIMPLE RESTAURANT FIELD
  // ------------------------------------------

  const handleChange = <K extends keyof RestaurantUpdates>(
    field: K,
    value: RestaurantUpdates[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ------------------------------------------
  // UPDATE LOCATION FIELD
  // ------------------------------------------

  const handleLocationChange = (
    field: "city" | "state" | "address",
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,

      location: {
        city: previous.location?.city ?? "",
        state: previous.location?.state ?? "",
        address: previous.location?.address ?? "",

        [field]: value,
      },
    }));
  };

  // ------------------------------------------
  // SAVE
  // ------------------------------------------

  const handleSaveEdit = async (restaurant:RestaurantProps) => {
    if (!editingId) return;

    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      const response = await updateRestaurantData(restaurant.id, formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Updated successfully!");

      setEditingId(null);
      setFormData({});
    } catch (error: unknown) {
      toast.error(
        `Unable to update restaurant: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  // ------------------------------------------
  // CANCEL
  // ------------------------------------------

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  // ------------------------------------------
  // DELETE
  // ------------------------------------------

  const handleDeleteTrigger = (id: string) => {
    console.log(`Deleting restaurant ${id}`);

    setDeleteModalItem(null);
    setConfirmInput("");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-neutral-900">
            Your Restaurants
          </h2>

          <p className="text-xs text-neutral-500">
            Manage and edit your active restaurant locations.
          </p>
        </div>
      </div>

      {/* RESTAURANT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map((restaurant) => {
          if (!restaurant || !restaurant.location) return null;

          const isEditing = editingId === restaurant.id;

          return (
            <div
              key={restaurant.id}
              className="bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* RESTAURANT HEADER */}

              <div className="flex items-start gap-3">
                {restaurant.logoUrl && (
                  <img
                    src={restaurant.logoUrl}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-100 shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0 space-y-2">
                  {isEditing ? (
                    <div className="space-y-3">
                      {/* NAME */}

                      <div>
                        <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider block mb-1">
                          Name
                        </label>

                        <input
                          type="text"
                          value={formData.name ?? ""}
                          onChange={(e) =>
                            handleChange("name", e.target.value)
                          }
                          className="w-full text-xs font-semibold px-2 py-1.5 border border-orange-500 rounded-md outline-none"
                        />
                      </div>

                      {/* CITY */}

                      <div>
                        <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider block mb-1">
                          City
                        </label>

                        <input
                          type="text"
                          value={formData.location?.city ?? ""}
                          onChange={(e) =>
                            handleLocationChange("city", e.target.value)
                          }
                          className="w-full text-xs px-2 py-1.5 border border-orange-500 rounded-md outline-none"
                        />
                      </div>

                      {/* STATE */}

                      <div>
                        <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider block mb-1">
                          State
                        </label>

                        <input
                          type="text"
                          value={formData.location?.state ?? ""}
                          onChange={(e) =>
                            handleLocationChange("state", e.target.value)
                          }
                          className="w-full text-xs px-2 py-1.5 border border-orange-500 rounded-md outline-none"
                        />
                      </div>

                      {/* ADDRESS */}

                      <div>
                        <label className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider block mb-1">
                          Address
                        </label>

                        <input
                          type="text"
                          value={formData.location?.address ?? ""}
                          onChange={(e) =>
                            handleLocationChange("address", e.target.value)
                          }
                          className="w-full text-xs px-2 py-1.5 border border-orange-500 rounded-md outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold text-neutral-900 truncate">
                        {restaurant.name}
                      </h3>

                      <p className="text-xs text-neutral-500 flex items-center gap-1 truncate">
                        <MapPin
                          size={12}
                          className="text-neutral-400 shrink-0"
                        />

                        <span>
                          {restaurant.location.city},{" "}
                          {restaurant.location.state}
                        </span>
                      </p>

                      <p className="text-[11px] text-neutral-400 truncate">
                        {restaurant.location.address}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                {isEditing ? (
                  <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-2 py-1 rounded-xl">
                    <span className="text-[11px] font-medium text-neutral-600 flex items-center gap-1">
                      <Users size={12} className="text-orange-500" />

                      Staff:
                    </span>

                    <div className="flex items-center gap-1">
                      {/* MINUS */}

                      <button
                        type="button"
                        onClick={() =>
                          handleChange(
                            "staffNos",
                            Math.max(
                              0,
                              (formData.staffNos ?? 0) - 1
                            )
                          )
                        }
                        className="p-0.5 rounded bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
                      >
                        <Minus size={10} />
                      </button>

                      {/* NUMBER */}

                      <input
                        type="number"
                        value={formData.staffNos ?? 0}
                        min={0}
                        onChange={(e) =>
                          handleChange(
                            "staffNos",
                            Math.max(
                              0,
                              Number(e.target.value) || 0
                            )
                          )
                        }
                        className="w-10 text-center text-xs font-bold bg-transparent border-none outline-none text-neutral-900"
                      />

                      {/* PLUS */}

                      <button
                        type="button"
                        onClick={() =>
                          handleChange(
                            "staffNos",
                            (formData.staffNos ?? 0) + 1
                          )
                        }
                        className="p-0.5 rounded bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-200/40 rounded-full text-orange-700 text-[11px] font-medium">
                    <Users size={12} />

                    <span>
                      {restaurant.staffNos} Active Staff
                    </span>
                  </div>
                )}

                {/* ACTIONS */}

                <div className="flex items-center gap-1">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(restaurant)}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <Check size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="p-1.5 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(restaurant)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteModalItem(restaurant)
                        }
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DELETE MODAL */}

      <AnimatePresence>
        {deleteModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-neutral-200 space-y-4"
            >
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-50 rounded-xl">
                  <AlertTriangle size={20} />
                </div>

                <h3 className="text-base font-bold">
                  Delete Restaurant?
                </h3>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                Are you sure you want to delete{" "}
                <strong className="text-neutral-900">
                  {deleteModalItem.name}
                </strong>
                ? This operation is permanent and cannot be undone.
              </p>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Type{" "}
                  <span className="text-neutral-900 select-all font-bold">
                    &quot;{deleteModalItem.name}&quot;
                  </span>{" "}
                  to confirm:
                </label>

                <input
                  type="text"
                  value={confirmInput}
                  onChange={(e) =>
                    setConfirmInput(e.target.value)
                  }
                  placeholder={deleteModalItem.name}
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModalItem(null);
                    setConfirmInput("");
                  }}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={
                    confirmInput.trim() !==
                    deleteModalItem.name.trim()
                  }
                  onClick={() =>
                    handleDeleteTrigger(deleteModalItem.id)
                  }
                  className="px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 rounded-xl transition-colors"
                >
                  Delete Restaurant
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}