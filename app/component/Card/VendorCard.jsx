// 'use client';
// import Image from "next/image";
// import { PiForkKnifeBold } from "react-icons/pi";
// import { FaRegHeart } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa6";
// import { CiLocationArrow1 } from "react-icons/ci";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// const VendorCard = () => {
//   const [vendorsData, setVendorsData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`https://kartmatch-backend.onrender.com/api/fetchvendors?page=${currentPage}`);
//         const json = await res.json();
//         console.log("data", json);
//         if (json.success) {
//           setVendorsData(json.data);
//           setTotalPages(json.totalPages || 1);
//         }
//       } catch (err) {
//         console.error("Error fetching vendors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   // Filter vendors based on search
//   const handleSearch = () => {
//     if (!searchQuery) return fetchVendors();

//     const filtered = vendorsData.filter(
//       (vendor) =>
//         vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         vendor.foodItems.some(item =>
//           item.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//     );

//     setVendorsData(filtered);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {loading ? (
//         <p className="my-10 text-lg font-semibold">Loading vendors...</p>
//       ) : (
//         <div className="flex flex-wrap justify-center gap-14 mt-10 max-w-7xl bg-gray-100">
//           {vendorsData.map((vendor) => (
//             <div
//               key={vendor._id || vendor.id}
//               className="w-80 border bg-gray-100 border-none shadow-[6px_6px_10px_rgba(0,0,0,0.2)] rounded-xl p-4 relative"
//             >
//               <div className="relative w-full h-54 rounded-lg overflow-hidden">
//                 <Image
//                   src={vendor.photoUrl}
//                   alt={vendor.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//                 <span className="absolute top-2 left-2 bg-white/40 backdrop-blur-sm text-red-500 text-sm font-bold px-3 py-1 rounded-lg">
//                   {vendor.name}
//                 </span>
//               </div>

//               <div className="mt-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-semibold">{vendor.name}</h2>
//                   <FaRegHeart color="red" size="25" className="text-red-600 cursor-pointer" />
//                 </div>

//                 <div className="flex justify-start gap-3 text-md font-bold text-gray-800 mt-4">
//                   <span className="flex items-center">
//                     <PiForkKnifeBold size="25" className="text-orange-500" /> {vendor.tasteRating[0]}/5
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FaRegStar size="25" className="text-yellow-500" /> {vendor.hygieneRating[0]}/5
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FaRegHeart size="25" className="text-orange-400" /> {vendor.hospitalityRating[0]}/5
//                   </span>
//                 </div>

//                 <div className="mt-4 flex flex-wrap gap-1">
//                   {vendor.foodItems?.slice(0, 2).map((item, index) => (
//                     <span key={index} className="bg-yellow-200 text-gray-800 px-2 py-1 text-xs rounded-full">
//                       {item}
//                     </span>
//                   ))}
//                   {vendor.foodItems?.length > 2 && (
//                     <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
//                       +{vendor.foodItems.length - 2} more
//                     </span>
//                   )}
//                 </div>

//                 <div className="mt-6 flex justify-between">
//                   <Link href={`/locate/${vendor._id}`}>
//                     <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
//                       Details
//                     </button>
//                   </Link>
//                   <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2">
//                     <CiLocationArrow1 color="white" size={20} /> Locate
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap">
//         <button
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Previous
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1)
//           .filter((page) => {
//             return (
//               page === 1 ||
//               page === totalPages ||
//               Math.abs(page - currentPage) <= 1
//             );
//           })
//           .reduce((acc, page, index, array) => {
//             if (index > 0 && page - array[index - 1] > 1) {
//               acc.push("ellipsis");
//             }
//             acc.push(page);
//             return acc;
//           }, [])
//           .map((item, index) =>
//             item === "ellipsis" ? (
//               <span key={index} className="px-2 py-1">
//                 ...
//               </span>
//             ) : (
//               <button
//                 key={index}
//                 onClick={() => setCurrentPage(item)}
//                 className={`px-3 py-2 rounded font-semibold ${currentPage === item
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-200 text-black"
//                   }`}
//               >
//                 {item}
//               </button>
//             )
//           )}

//         <button
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>

//     </div>
//   );
// };

// export default VendorCard;

'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { PiForkKnifeBold } from "react-icons/pi";
import { FaRegHeart,FaRegStar , FaHeart } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import Link from "next/link";
import toast from "react-hot-toast";

const VendorCard = ({ data = [], loading = false, currentPage, setCurrentPage, totalPages }) => {
  
  const [favoritedVendors, setFavoritedVendors] = useState([]); // To store all favorited vendor IDs
  const itemsPerPage = 9;

  // Get the current data to display based on the page
  const currentData = data.slice(0, itemsPerPage); 


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritedVendors(storedFavorites);
  }, []);

  const toggleFavorite = (vendor) => {
    let updatedFavorites = [...favoritedVendors];
    const vendorIndex = updatedFavorites.findIndex((fav) => fav._id === vendor._id);

    if (vendorIndex === -1) {
      updatedFavorites.push(vendor);
      toast.success('Vendor added to favorites!');
    } else {
      updatedFavorites = updatedFavorites.filter((fav) => fav._id !== vendor._id);
      toast.error('Vendor removed from favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoritedVendors(updatedFavorites);
  };

  // If data is loading, show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Loading State */}
      {loading ? (
        <p className="my-10 text-lg font-semibold">Loading vendors...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-14 mt-10 max-w-7xl">
          {/* Vendor Cards */}
          {currentData.map((vendor) => {
            // Check if the vendor is favorited
            const isFavorited = favoritedVendors.some((fav) => fav._id === vendor._id);
            return (
              <div
                key={vendor._id}
                className="w-80 bg-gray-100 shadow-lg rounded-xl p-4 relative"
              >
                <div className="relative w-full h-52 rounded-lg overflow-hidden">
                  <Image
                    src={vendor.photoUrl}
                    alt={vendor.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <span className="absolute top-2 left-2 bg-white/40 backdrop-blur-sm text-red-500 text-sm font-bold px-3 py-1 rounded-lg">
                    {vendor.name}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{vendor.name}</h2>
                    <button
                      className={`flex items-center justify-center gap-2 text-2xl ${isFavorited ? 'border-red-600 text-red-600' : 'border-red-500 text-red-500'} px-5 py-2 rounded-full hover:bg-red-50 transition`}
                      onClick={() => toggleFavorite(vendor)}
                    >
                      {isFavorited ? (
                        <FaHeart className="fill-red-600" /> // filled heart look
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>

                  <div className="flex gap-3 text-md font-bold text-gray-800 mt-4">
                    <span className="flex items-center gap-1">
                      <PiForkKnifeBold size={22} className="text-orange-500" />{" "}
                      {vendor.tasteRating[0]}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegStar size={22} className="text-yellow-500" />{" "}
                      {vendor.hygieneRating[0]}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegHeart size={22} className="text-orange-400" />{" "}
                      {vendor.hospitalityRating[0]}/5
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {vendor.foodItems?.slice(0, 2).map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-yellow-200 text-gray-800 px-2 py-1 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                    {vendor.foodItems?.length > 2 && (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
                        +{vendor.foodItems.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Link href={`/locate/${vendor._id}`}>
                      <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
                        Details
                      </button>
                    </Link>
                    <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2">
                      <CiLocationArrow1 color="white" size={20} /> Locate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
            )
            .reduce((acc, page, idx, arr) => {
              if (idx > 0 && page - arr[idx - 1] > 1) acc.push("ellipsis");
              acc.push(page);
              return acc;
            }, [])
            .map((item, idx) =>
              item === "ellipsis" ? (
                <span key={idx} className="px-2 py-1">
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(item)}
                  className={`px-3 py-2 rounded font-semibold ${
                    currentPage === item
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {item}
                </button>
              )
            )}

          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorCard;
