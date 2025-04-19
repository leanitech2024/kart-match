'use client'
// import Header from '../component/Layout/Header'
//  import { FaRegHeart } from "react-icons/fa";
//  import { FaRegStar } from "react-icons/fa6";
// import { PiForkKnifeBold } from "react-icons/pi";
// import bgMap from '../../public/assets/Location/map.png'
// import { FaSearchLocation } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { CiLocationArrow1 } from "react-icons/ci";
// import Footer from '../component/Layout/Footer'
// import Link from "next/link";

// const vendorData = [
//     {
//         id: 7,
//         name: "Puchka Wala",
//         location: { type: "Point", coordinates: [88.351977, 22.560087] },
//         foodItems: ["Puchka", "Puchka Masala"],
//         hygieneRating: 4,
//         tasteRating: 4,
//         hospitalityRating: 4,
//         photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963152/exmd5bmtkqgmr5msherf.webp"
//     },
//     {
//         id: 8,
//         name: "Subhash Papad wala",
//         location: { type: "Point", coordinates: [88.352038, 22.560099] },
//         foodItems: [
//             "Fried Snacks", "Puchka Packet", "Puffed Rice (Murmura)", "Sev",
//             "Bhujia", "Chakli (circular fried snacks)", "Lentils and Pulses",
//             "Chips", "Papad", "Fried Namkeen"
//         ],
//         hygieneRating: 4,
//         tasteRating: 4,
//         hospitalityRating: 4,
//         photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963241/Whats-App-Image-2024-06-19-at-14-46-35-5ec8518b_ymolvg.webp"
//     },
//     {
//         id: 9,
//         name: "Subhash Papad wala",
//         location: { type: "Point", coordinates: [88.352018, 22.560253] },
//         foodItems: [
//             "Puffed Rice (Murmura)", "Papad wala", "Sev", "Bhujia",
//             "Chips", "Papad", "Fried Namkeen"
//         ],
//         hygieneRating: 4,
//         tasteRating: 4,
//         hospitalityRating: 4,
//         photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963265/Whats-App-Image-2024-06-19-at-14-46-35-c6bd8150_shtwqi.webp"
//     },
//     {
//         id: 10,
//         name: "Wow Chicken",
//         location: { type: "Point", coordinates: [88.352032, 22.559962] },
//         foodItems: ["Chicken Puff"],
//         hygieneRating: 4,
//         tasteRating: 4,
//         hospitalityRating: 4,
//         photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963288/Whats-App-Image-2024-06-19-at-14-46-35-29caa01a_xbxyzw.webp"
//     }
// ]

// const Location = () => {
//   return (
//     <>
//       <Header />
//       <div className="bg-gray-100 mt-24 py-4 min-h-screen">
//         {/* Title */}
//         <div className="text-center mb-8 mt-4 px-4">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins">
//             VENDOR <span className="text-[#3FA025]">MAP</span>
//           </h1>
//         </div>

//         {/* Search Bar */}
//         <div
//           className="relative bg-cover bg-center bg-no-repeat py-20 sm:py-24"
//           style={{ backgroundImage: `url(${bgMap.src})` }}
//         >
//           <div className="absolute inset-0 bg-black opacity-50 z-0" />

//           <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center max-w-6xl mx-auto gap-4 px-4">
//             <div className="bg-white bg-opacity-90 shadow-md rounded-md p-4 w-full sm:flex sm:items-center sm:w-auto gap-4">
//               <div className="relative w-full sm:w-96">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   <FaLocationDot color="red" size={25} />
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="Search Vendors Or Food Items"
//                   className="w-full pl-10 p-3 rounded-md border border-gray-300 shadow-sm outline-none"
//                 />
//               </div>
//               <button className="mt-4 sm:mt-0 bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-full sm:w-auto">
//                 <FaSearchLocation />
//                 Find Street Food
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Radius Button */}
//         <div className="flex flex-col sm:flex-row justify-between max-w-6xl mx-auto py-4 mt-4 px-4 gap-2 sm:gap-0">
//           <h2 className="text-lg font-semibold text-gray-700">
//             Nearby Vendors ({vendorData.length})
//           </h2>
//           <button className="bg-[#FF9534] text-white px-4 py-1 rounded-full shadow self-start sm:self-center">
//             5km radius
//           </button>
//         </div>

//         {/* Vendor Cards */}
//         <div className="max-w-6xl mx-auto mt-6 space-y-4 px-4">
//           {vendorData.map((vendor) => (
//             <div
//               key={vendor.id}
//               className="bg-white flex flex-col md:flex-row items-center md:items-start p-4 rounded shadow-sm"
//             >
//               <img
//                 src={vendor.photoUrl}
//                 alt={vendor.name}
//                 className="w-full sm:w-60 md:w-32 h-40 md:h-28 object-cover rounded"
//               />
//               <div className="flex flex-col md:flex-row justify-between w-full mt-5 md:mt-0 md:ml-4 gap-4">
//                 <div className="flex-1">
//                   <h3 className="text-lg mt-1 font-bold">{vendor.name}</h3>
//                   <p className="text-bold mt-1 text-black">{vendor.foodItems.join(', ')}</p>
//                   <div className="flex flex-wrap gap-4 text-orange-600 mt-1 text-sm">
//                     <span className="flex items-center gap-1">
//                       <PiForkKnifeBold size={20} className="text-orange-500" /> {vendor.tasteRating}/5
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaRegStar size={20} className="text-yellow-500" /> {vendor.hygieneRating}/5
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaRegHeart size={20} className="text-orange-400" /> {vendor.hospitalityRating}/5
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-col md:items-end gap-2">
//                   <span className="bg-[#FF9534] text-white text-sm px-3 py-1 rounded-full w-fit">
//                     0.5km
//                   </span>
//                   <div className="flex flex-col sm:flex-row gap-2">
//                     <Link href={`/locate/${vendor.id}`}>
//                     <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
//                       Details
//                     </button>
//                     </Link>
//                     <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2 justify-center">
//                       <CiLocationArrow1 color="white" size={20} /> Locate
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default Location

import { useEffect, useState } from 'react';
import Header from '../component/Layout/Header';
import Footer from '../component/Layout/Footer';
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { FaRegStar, FaRegHeart } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import Link from "next/link";

const Location = () => {
  const [vendorData, setVendorData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch vendors nearby based on location
  const fetchVendors = async () => {
    if (!userLocation) return;

    const { lat, lng } = userLocation;
    const radius = 50;

    try {
      const response = await fetch(`https://kartmatch-backend.onrender.com/api/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      const data = await response.json();

      if (data.success) {
        setVendorData(data.data);
      } else {
        console.error('Error fetching vendors:', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Fetch vendors once location is set
  useEffect(() => {
    if (userLocation) fetchVendors();
  }, [userLocation]);

  // Load Google Maps
  useEffect(() => {
    if (vendorData.length > 0) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDC1axisSFp0JHuSuRtyPd_FeUapLXgJ9s&libraries=places`;
      script.async = true;
      script.onload = () => initializeMap();
      document.body.appendChild(script);
    }
  }, [vendorData]);

  // Initialize map with vendors
  const initializeMap = () => {
    const center = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    const map = new google.maps.Map(document.getElementById('vendor-map'), {
      center,
      zoom: 11,
    });

    // User marker
    new google.maps.Marker({
      position: center,
      map,
      title: userLocation,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#0000FF",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      },
    });

    // Radius circle
    new google.maps.Circle({
      strokeColor: "#3FA025",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#3FA025",
      fillOpacity: 0.15,
      map,
      center,
      radius: 50000,
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow();

    vendorData.forEach((vendor) => {
      const marker = new google.maps.Marker({
        position: {
          lat: vendor.location.coordinates[1],
          lng: vendor.location.coordinates[0],
        },
        map,
        title: vendor.name,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      const contentString = `
        <div style="text-align: center; max-width: 200px;">
          <img src="${vendor.photoUrl}" alt="${vendor.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;" />
          <h3 style="margin-top: 8px; font-size: 16px; font-weight: bold;">${vendor.name}</h3>
        </div>
      `;

      marker.addListener("click", () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });
    });
  };

  // Filter vendors based on search
  const handleSearch = () => {
    if (!searchQuery) return fetchVendors();

    const filtered = vendorData.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.foodItems.some(item =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    setVendorData(filtered);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 mt-24 py-4 min-h-screen">
        <div className="text-center mb-8 mt-4 px-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins">
            VENDOR <span className="text-[#3FA025]">MAP</span>
          </h1>
        </div>
     

        {/* This wraps the MAP only */}
        <div id="vendor-map" className="w-full h-96 mb-8 relative z-0"></div>
        <div className="relative z-10  flex flex-col sm:flex-row items-center justify-center max-w-6xl mx-auto gap-4 px-4">
          <div className="bg-white bg-opacity-90 shadow-md rounded-md p-4 w-full sm:flex sm:items-center sm:w-auto gap-4">
            <div className="relative w-full sm:w-96">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaLocationDot color="red" size={25} />
              </span>
              <input
                type="text"
                placeholder="Search Vendors Or Food Items"
                className="w-full pl-10 p-3 rounded-md border border-gray-300 shadow-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="mt-4 sm:mt-0 bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaSearchLocation />
              Find Street Food
            </button>
          </div>
        </div>
        {/* Separate the search bar and controls */}
       


        <div className="flex flex-col sm:flex-row justify-between max-w-6xl mx-auto py-4 mt-4 px-4 gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-700">
            Nearby Vendors ({vendorData.length})
          </h2>
          <button className="bg-[#FF9534] text-white px-4 py-1 rounded-full shadow self-start sm:self-center">
            50km radius
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-6 space-y-4 px-4">
          {vendorData.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white flex flex-col md:flex-row items-center md:items-start p-4 rounded shadow-sm"
            >
              <img
                src={vendor.photoUrl}
                alt={vendor.name}
                className="w-full sm:w-60 md:w-32 h-40 md:h-28 object-cover rounded"
              />
              <div className="flex flex-col md:flex-row justify-between w-full mt-5 md:mt-0 md:ml-4 gap-4">
                <div className="flex-1">
                  <h3 className="text-lg mt-1 font-bold">{vendor.name}</h3>
                  <p className="mt-1 text-black">{vendor.foodItems.join(', ')}</p>
                  <div className="flex flex-wrap gap-4 text-orange-600 mt-1 text-sm">
                    <span className="flex items-center gap-1">
                      <PiForkKnifeBold size={20} className="text-orange-500" /> {vendor.tasteRating[0]}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegStar size={20} className="text-yellow-500" /> {vendor.hygieneRating[0]}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegHeart size={20} className="text-orange-400" /> {vendor.hospitalityRating[0]}/5
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <span className="bg-[#FF9534] text-white text-sm px-3 py-1 rounded-full w-fit">
                    0.5km
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/locate/${vendor.id}`}>
                      <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
                        Details
                      </button>
                    </Link>
                    <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2 justify-center">
                      <CiLocationArrow1 size={20} />
                      Locate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Location;
