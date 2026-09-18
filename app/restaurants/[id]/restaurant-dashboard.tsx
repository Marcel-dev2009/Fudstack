import { getRestaurants } from "@/lib/server-operation";

async function RestaurantDashboard() {
  const restaurants = await getRestaurants();

  if (!restaurants || restaurants.length === 0) {
    throw new Error("No restaurant found!");
  }

  return (
    <div className="pl-64 min-h-screen bg-neutral-50/50">
      <main className="max-w-6xl mx-auto p-6 sm:p-8 space-y-6">
        
        {/* Page Header */}
        <div className="pb-4 border-b border-neutral-200">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage your restaurants and monitor performance.
          </p>
        </div>

        {/* Restaurant Grid Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/50">
                  ID: {res.id}
                </span>
              </div>

              <h2 className="text-base font-bold text-neutral-900 truncate">
                {res.name}
              </h2>

              <p className="text-xs text-neutral-500">
                Restaurant Page for restaurant:{" "}
                <span className="font-medium text-neutral-800">{res.name}</span>
              </p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default RestaurantDashboard;