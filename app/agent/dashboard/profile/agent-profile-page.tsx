/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, useRef, useState } from "react";
import {
  Camera,
  Pencil,
  Check,
  X,
  ChevronRight,
  Search,
  Users,
  Building2,
  Mail,
  UserCheck,
  Store,
} from "lucide-react";
import { toast } from "sonner";
import { Organization } from "@/lib/generated/prisma";
import Loading from "@/app/components/ui/loading";
import { Restaurant } from "@/lib/generated/prisma";
import { CloudinaryClientResponse } from "@/cloudinary";
import { updateOrganizationDescription, updateOrganizationName, updateOrganizationPhoto } from "@/lib/actions/update-organization-data";
interface Props {
  organization: Organization;
  organizationId:string
  restaurant:Restaurant[];
}
export default function AgentDashboardProfile({
  organization,
  organizationId,
  restaurant,
}: Props) {
  // --- Local States ---
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("Description");
  const [isSavingDesc, setIsSavingDesc] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);
  const [photoPreview , setPhotoPreview] = useState(organization.logoUrl);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading , setLoading] = useState(false);
  const [isEditingName , setIsEditingName] = useState(false);
  const [nameInput ,  setNameInput] = useState(organization.name);
  const ref = useRef<HTMLInputElement | null>(null);
  // --- Handlers ---
  const handleSaveName = async (data:string) => {
    try{
    setIsSavingName(true);
     await updateOrganizationName(organization.id , data);
     setIsEditingName(false);
     toast.success("Organization Name Updated Succesfully");
    }catch(error:unknown){
     toast.error(`Error changing name:${
      error instanceof Error ? error.message : "Unkown error"
     }`)
    } finally{
      setIsSavingName(false);
    }
  }
  const handleSaveDescription = async (data:string) => {
     setIsSavingDesc(true);
    try {
        await updateOrganizationDescription(organizationId , data);    
      setIsEditingDescription(false);
      toast.success("Organization description updated successfully!");
    } catch (err:unknown) {
      toast.error(`Failed to save description. Please try again: ${
        err instanceof Error ? err.message : "Unkown Error"
      }`);
    } finally {
      setIsSavingDesc(false);
    }
  };
    if(!restaurant) return;
  const restaurantAmount = restaurant.reduce((total , restaurant) => total + restaurant.staffNos, 0);
  const handleChange = async (e:ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (!file) return;
   const formData = new FormData();
   formData.append("file" , file);
   formData.append("upload_preset" , "agent_media");
   try{
   setLoading(true);
   const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
         {
           method:"POST",
           body:formData
         }
       );
       const data = (await res.json()) as CloudinaryClientResponse;
       if("error" in data){
         toast.error("error uploading organization photo");
       }else{
            await updateOrganizationPhoto(organizationId , data.secure_url);
            toast.success("Organization profile updated succesfully");
            setPhotoPreview(data.secure_url);
       }
      
   } catch(err:unknown){
   toast.error(`failed to update photo: ${
    err instanceof Error ? err.message : "Unkown Error"      
   }`);
   }finally{
    setLoading(false);
   }
  };

  // Filter restaurants by search query
  const filteredRestaurants = restaurant.filter(
    (rst) =>
      rst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rst.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen w-full bg-white pt-16 lg:pt-0 lg:pl-64 transition-all duration-300">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* ========================================== */}
        {/* CENTERED PROFILE HEADER SECTION           */}
        {/* ========================================== */}
        <section className="flex flex-col items-center text-center">
          
          {/* Avatar Image Container with Hover Camera Badge */}
          <div className="relative group" onClick={() => ref.current?.click()}>
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white ring-4 ring-orange-500/20 shadow-xl bg-gray-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {photoPreview ? (
               <div>
              {loading ? (
                <Loading/>
              ): (
                <>
                  <img
             src={organization.logoUrl}
             alt={organization.name}
             className="w-full h-full object-cover"
                />
                <input className="hidden" accept="image/*" onChange={handleChange} type="file" ref={ref}/>
                </>
              )}
               </div>
              ) : (
                <Building2 className="w-14 h-14 text-gray-400" />
              )}
            </div>

            {/* Change Icon Overlay Button */}
            <button
              type="button"
              title="Change organization logo"
              aria-label="Change profile image"
              className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-2.5 bg-brand-burn hover:bg-orange-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Organization Name (Immediately below image container) */}
           <div className="mt-6 w-full max-w-xl  border-gray-100 rounded-2xl p-2 sm:p-2 shadow-sm transition-all duration-200 hover:border-orange-200">
            {isEditingName ? (
              <div className="space-y-3">
                <textarea
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  rows={3}
                  className="w-full text-xs sm:text-sm text-gray-800 bg-white border border-orange-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all resize-none shadow-inner"
                  placeholder="Enter organization name..."
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    disabled={isSavingName}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveName(nameInput)}
                    disabled={isSavingName}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-burn hover:bg-orange-700 rounded-lg shadow-sm transition-colors"
                  >
                    {isSavingName ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between p-4">
                 <h1 className="mt-5 text-md md:text-cl font-extrabold text-gray-900 tracking-tight font-serif">
                    {organization.name}
                  </h1>
                   <button
                  type="button"
                  onClick={() => {
                    
                    setIsEditingName(true);
                  }}
                  className="inline-flex gap-2 text-xs font-semibold text-brand-burn transition-colors p-1 rounded-md"
                  aria-label="Edit Name"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>
          {/* Owner Metadata Tag */}
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs sm:text-sm text-gray-700 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-brand-burn" />
            <span>Owner: <strong className="text-gray-900 font-semibold">{organization.name}</strong></span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 hidden sm:inline">{organization.id}</span>
          </div>

          {/* ========================================== */}
          {/* DESCRIPTION SECTION WITH PENCIL EDIT ICON  */}
          {/* ========================================== */}
          <div className="mt-6 w-full max-w-2xl bg-gray-50/70 border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-200 hover:border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-brand-burn" />
                About Organization
              </span>

              {!isEditingDescription && (
                <button
                  type="button"
                  onClick={() => {
                    setDescriptionInput(organization.description);
                    setIsEditingDescription(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-burn hover:text-orange-700 transition-colors p-1 rounded-md hover:bg-orange-100/50"
                  aria-label="Edit description"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditingDescription ? (
              <div className="space-y-3">
                <textarea
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  rows={3}
                  className="w-full text-xs sm:text-sm text-gray-800 bg-white border border-orange-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all resize-none shadow-inner"
                  placeholder="Enter organization bio or summary..."
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingDescription(false)}
                    disabled={isSavingDesc}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveDescription(descriptionInput)}
                    disabled={isSavingDesc}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-burn hover:bg-orange-700 rounded-lg shadow-sm transition-colors"
                  >
                    {isSavingDesc ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center sm:text-left font-normal">
                {organization.description || "No description available yet. Click pencil icon to add one."}
              </p>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* RESTAURANTS LIST VIEW SECTION              */}
        {/* ========================================== */}
        <section className="mt-10 sm:mt-14 pt-8 border-t border-gray-100">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Associated Restaurants
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-brand-burn">
                  {/* {restaurants.length} */} 
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Manage and navigate to individual restaurant outlets under {organization.name}.
              </p>
            </div>
          </div>

          {/* Search Bar Filter */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurant by name or email..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Restaurants Cards / List View */}
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl">
              <Store className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">No restaurants found</p>
              <p className="text-xs text-gray-500 mt-1">
                Try adjusting your search query or add a new restaurant outlet.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 gap-4"
                >
                  {/* Left: Logo & Details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    
                    {/* Restaurant Logo */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                      {restaurant.logoUrl ? (
                        <img
                          src={restaurant.logoUrl}
                          alt={restaurant.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Store className="w-6 h-6 text-brand-burn" />
                      )}
                    </div>

                    {/* Name & Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate group-hover:text-brand-burn transition-colors">
                          {restaurant.name}
                        </h3>

                        {/* Status Badge */}
                        <StatusBadge status={restaurant.status} />
                      </div>

                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{restaurant.email}</span>
                        </span>

                        <span className="text-gray-300 hidden sm:inline">•</span>

                        <span className="flex items-center gap-1 font-medium text-gray-600 bg-gray-100/70 px-2 py-0.5 rounded-md">
                          <Users className="w-3.5 h-3.5 text-brand-burn" />
                          <span> {restaurantAmount} active staff</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Arrow Link Button */}
                  <div className="flex items-center justify-end sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-50 shrink-0">
                    <a
                      href={`/restaurants/${restaurant.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 group-hover:bg-brand-burn group-hover:text-white transition-all duration-200 shadow-sm"
                      aria-label={`Open website for ${restaurant.name}`}
                    >
                      <span>Visit Site</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: "ACTIVE" | "PENDING" | "INACTIVE" }) {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Pending
        </span>
      );
    case "INACTIVE":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Inactive
        </span>
      );
  }
}