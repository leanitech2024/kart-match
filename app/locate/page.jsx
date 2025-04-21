'use client'

import { useEffect, useState } from 'react';
import Header from '../component/Layout/Header';
import Footer from '../component/Layout/Footer';
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { FaRegStar, FaRegHeart } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import Link from "next/link";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
const Location = () => {
  const [vendorData, setVendorData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [radiusType, setRadiusType] = useState("5km")
  const [customRadius, setCustomRadius] = useState(20);
  const [radiusInputValue, setRadiusInputValue] = useState("20");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [appliedRadius, setAppliedRadius] = useState(5);

  // Handle change of radius type
  const handleRadiusTypeChange = (e) => {
    const value = e.target.value;
    if (["5km", "10km", "custom"].includes(value)) {
      setRadiusType(value);
    }
  };

  // Handle custom radius change
  const handleCustomRadiusChange = (value) => {
    setCustomRadius(value); // Make sure value is number
  };

  // Handle radius input change (for manual number input)
  const handleRadiusInputChange = (value) => {
    setRadiusInputValue(value); // Update the value of input
  };

  // Apply custom radius input
  const applyCustomRadiusInput = () => {
    const parsed = parseFloat(radiusInputValue);
    if (!isNaN(parsed)) {
      setCustomRadius(parsed);
    }
  };

  // Apply radius input on key press (Enter)
  const handleRadiusInputKeyPress = (e) => {
    if (e.key === "Enter") {
      applyCustomRadiusInput();
    }
  };

  // Fetch vendors nearby based on location
  const fetchVendors = async () => {
    if (!userLocation) return;
  
    const { lat, lng } = userLocation;
    const radius =
      radiusType === 'custom' ? customRadius : radiusType === '10km' ? 10 : 5;
      setAppliedRadius(radius); 
    try {
      const response = await fetch(
        `https://kartmatch-backend.onrender.com/api/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
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
         if (userLocation) {
          fetchVendors();
         }
      }, [radiusType, customRadius]);

  // Load Google Maps
  useEffect(() => {
    if (userLocation || vendorData.length > 0) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDC1axisSFp0JHuSuRtyPd_FeUapLXgJ9s&libraries=places`;
      script.async = true;
      script.onload = () => initializeMap();
      document.body.appendChild(script);
    }
  }, [userLocation , vendorData]);

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
      title: "Your Location",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#0000FF",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      },
    });
  
    // Radius circle only if appliedRadius exists
    if (appliedRadius) {
      new google.maps.Circle({
        strokeColor: "#3FA025",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#3FA025",
        fillOpacity: 0.15,
        map,
        center,
        radius: appliedRadius * 1000,
      });
    }
  
    // Vendor markers (if any)
    if (vendorData.length > 0) {
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
    }
  };

  useEffect(() => {
    if (userLocation && !appliedRadius) {
      setAppliedRadius(5); // default radius
    }
  }, [userLocation]);
  

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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch();  // Trigger search automatically on input change
                }}
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
          <div className="mt-4 px-4">
      <button
        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        className="text-[#FF5722] w-full flex justify-between items-center text-sm"
      >
        <span>Radius & Filters</span>
        {isFiltersVisible ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
      </button>

      {isFiltersVisible && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-2">Search Radius</h3>
          
          <div className="flex space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="r1"
                name="radius"
                value="5km"
                checked={radiusType === "5km"}
                onChange={handleRadiusTypeChange}
                className="mr-2"
              />
              <label htmlFor="r1" className="text-xs">5km</label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="r2"
                name="radius"
                value="10km"
                checked={radiusType === "10km"}
                onChange={handleRadiusTypeChange}
                className="mr-2"
              />
              <label htmlFor="r2" className="text-xs">10km</label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="r3"
                name="radius"
                value="custom"
                checked={radiusType === "custom"}
                onChange={handleRadiusTypeChange}
                className="mr-2"
              />
              <label htmlFor="r3" className="text-xs">Custom</label>
            </div>
          </div>

          {radiusType === "custom" && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>1km</span>
                <span>{customRadius}km</span>
                <span>100km</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={customRadius}
                onChange={(e) => handleCustomRadiusChange(parseFloat(e.target.value))}
                className="w-full mb-3"
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="custom-radius" className="text-xs">Set exact radius:</label>
                <div className="flex items-center space-x-1">
                  <input
                    id="custom-radius"
                    type="number"
                    min="1"
                    max="1000"
                    step="0.1"
                    value={radiusInputValue}
                    onChange={(e) => handleRadiusInputChange(e.target.value)}
                    onKeyPress={handleRadiusInputKeyPress}
                    className="w-full py-1 px-2 text-sm rounded-md border"
                  />
                  <div className="flex items-center justify-center bg-muted px-2 rounded-md border border-l-0 border-input">
                    <span className="text-xs">km</span>
                  </div>
                  <button
                    onClick={applyCustomRadiusInput}
                    className="bg-gray-200 px-3 py-1 rounded-md text-xs"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
        </div>
        {/* Separate the search bar and controls */}
       


        <div className="flex flex-col sm:flex-row justify-between max-w-6xl mx-auto py-4 mt-4 px-4 gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-700">
            Nearby Vendors ({vendorData.length})
          </h2>
          <button className="bg-[#FF9534] text-white px-4 py-1 rounded-full shadow self-start sm:self-center">
            {customRadius || radiusInputValue}km radius
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-6 space-y-4 px-4">
          {vendorData.map((vendor) => {
            // Calculate distance from user to vendor
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              vendor.location.coordinates[1],
              vendor.location.coordinates[0]
            ).toFixed(2); // Distance in km (rounded to 2 decimals)

            return (
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
                      {distance} km
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/locate/${vendor._id}`}>
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
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Location;
// 'use client'

// import { useEffect, useState } from 'react';
// import Header from '../component/Layout/Header';
// import Footer from '../component/Layout/Footer';
// import { FaSearchLocation } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { PiForkKnifeBold } from "react-icons/pi";
// import { FaRegStar, FaRegHeart } from "react-icons/fa";
// import { CiLocationArrow1 } from "react-icons/ci";
// import Link from "next/link";
// import { Button } from '@/components/ui/button';
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Slider } from "@/components/ui/slider";
// import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// const Location = () => {
//   const [vendorData, setVendorData] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [radiusType, setRadiusType] = useState<'5km' | '10km' | 'custom'>('5km');
//   const [customRadius, setCustomRadius] = useState(20);
//   const [radiusInputValue, setRadiusInputValue] = useState('20');
//   const [isFiltersVisible, setIsFiltersVisible] = useState(false);


//   const handleRadiusTypeChange = (value) => {
//     setRadiusType(value);
//   };

//   const handleCustomRadiusChange = (value) => {
//     setCustomRadius(value[0]);
//   };

//   const handleRadiusInputChange = (e) => {
//     setRadiusInputValue(e.target.value);
//   };

//   const handleRadiusInputBlur = () => {
//     const parsed = parseFloat(radiusInputValue);
//     if (!isNaN(parsed)) {
//       setCustomRadius(parsed);
//     }
//   };

//   const handleRadiusInputKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       applyCustomRadiusInput();
//     }
//   };

//   const applyCustomRadiusInput = () => {
//     const parsed = parseFloat(radiusInputValue);
//     if (!isNaN(parsed)) {
//       setCustomRadius(parsed);
//     }
//   };

//   const fetchVendors = async () => {
//     if (!userLocation) return;
  
//     const { lat, lng } = userLocation;
//     const radius =
//       radiusType === 'custom' ? customRadius : radiusType === '10km' ? 10 : 5;
  
//     try {
//       const response = await fetch(
//         `https://kartmatch-backend.onrender.com/api/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setVendorData(data.data);
//       } else {
//         console.error('Error fetching vendors:', data.message);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };
  

//   // Get user location on mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         }
//       );
//     }
//   }, []);

//   // Fetch vendors once location is set
//   useEffect(() => {
//     if (userLocation) {
//       fetchVendors();
//     }
//   }, [radiusType, customRadius]);
  

//   // Load Google Maps
//   useEffect(() => {
//     if (vendorData.length > 0) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDC1axisSFp0JHuSuRtyPd_FeUapLXgJ9s&libraries=places`;
//       script.async = true;
//       script.onload = () => initializeMap();
//       document.body.appendChild(script);
//     }
//   }, [vendorData]);

//   // Initialize map with vendors
//   const initializeMap = () => {
//     const center = new google.maps.LatLng(userLocation.lat, userLocation.lng);
//     const map = new google.maps.Map(document.getElementById('vendor-map'), {
//       center,
//       zoom: 11,
//     });

//     // User marker
//     new google.maps.Marker({
//       position: center,
//       map,
//       title: userLocation,
//       icon: {
//         path: google.maps.SymbolPath.CIRCLE,
//         scale: 8,
//         fillColor: "#0000FF",
//         fillOpacity: 1,
//         strokeWeight: 2,
//         strokeColor: "#FFFFFF",
//       },
//     });

//     // Radius circle
//     new google.maps.Circle({
//       strokeColor: "#3FA025",
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: "#3FA025",
//       fillOpacity: 0.15,
//       map,
//       center,
//       radius: radius * 1000,
//     });

//     // Info window
//     const infoWindow = new google.maps.InfoWindow();

//     vendorData.forEach((vendor) => {
//       const marker = new google.maps.Marker({
//         position: {
//           lat: vendor.location.coordinates[1],
//           lng: vendor.location.coordinates[0],
//         },
//         map,
//         title: vendor.name,
//         icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       });

//       const contentString = `
//         <div style="text-align: center; max-width: 200px;">
//           <img src="${vendor.photoUrl}" alt="${vendor.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;" />
//           <h3 style="margin-top: 8px; font-size: 16px; font-weight: bold;">${vendor.name}</h3>
//         </div>
//       `;

//       marker.addListener("click", () => {
//         infoWindow.setContent(contentString);
//         infoWindow.open(map, marker);
//       });
//     });
//   };

//   // Filter vendors based on search
//   const handleSearch = () => {
//     if (!searchQuery) return fetchVendors();

//     const filtered = vendorData.filter(
//       (vendor) =>
//         vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         vendor.foodItems.some(item =>
//           item.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//     );

//     setVendorData(filtered);
//   };

//   return (
//     <>
//       <Header />
//       <div className="bg-gray-100 mt-24 py-4 min-h-screen">
//         <div className="text-center mb-8 mt-4 px-4">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins">
//             VENDOR <span className="text-[#3FA025]">MAP</span>
//           </h1>
//         </div>


//         {/* This wraps the MAP only */}
//         <div id="vendor-map" className="w-full h-96 mb-8 relative z-0"></div>
//         <div className="relative z-10  flex flex-col sm:flex-row items-center justify-center max-w-6xl mx-auto gap-4 px-4">
//           <div className="bg-white bg-opacity-90 shadow-md rounded-md p-4 w-full sm:flex sm:items-center sm:w-auto gap-4">
//             <div className="relative w-full sm:w-96">
//               <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <FaLocationDot color="red" size={25} />
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search Vendors Or Food Items"
//                 className="w-full pl-10 p-3 rounded-md border border-gray-300 shadow-sm outline-none"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               className="mt-4 sm:mt-0 bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
//             >
//               <FaSearchLocation />
//               Find Street Food
//             </button>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setIsFiltersVisible(!isFiltersVisible)}
//             className="mt-2 text-[#FF5722] w-full flex justify-between items-center"
//           >
//             <span className="text-sm">Radius & Filters</span>
//             {isFiltersVisible ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
//           </Button>
//           {isFiltersVisible && (
//             <div className="mt-2 pt-2 border-t border-gray-200">
//               <h3 className="text-sm font-medium mb-2">Search Radius</h3>
//               <RadioGroup
//                 value={radiusType}
//                 onValueChange={handleRadiusTypeChange}
//                 className="flex space-x-4 mb-3"
//               >
//                 <div className="flex items-center space-x-1">
//                   <RadioGroupItem value="5km" id="r1" />
//                   <Label htmlFor="r1" className="text-xs">5km</Label>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <RadioGroupItem value="10km" id="r2" />
//                   <Label htmlFor="r2" className="text-xs">10km</Label>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <RadioGroupItem value="custom" id="r3" />
//                   <Label htmlFor="r3" className="text-xs">Custom</Label>
//                 </div>
//               </RadioGroup>

//               {radiusType === 'custom' && (
//                 <div className="mb-3">
//                   <div className="flex justify-between text-xs text-muted-foreground mb-1">
//                     <span>1km</span>
//                     <span>{customRadius}km</span>
//                     <span>100km</span>
//                   </div>
//                   <Slider
//                     value={[customRadius]}
//                     min={1}
//                     max={100}
//                     step={1}
//                     onValueChange={handleCustomRadiusChange}
//                     className="w-full mb-3"
//                   />

//                   {/* Custom radius input field */}
//                   <div className="flex flex-col gap-1 sm:gap-2">
//                     <Label htmlFor="custom-radius" className="text-xs whitespace-nowrap">
//                       Set exact radius:
//                     </Label>
//                     <div className="flex items-center space-x-1">
//                       <Input
//                         id="custom-radius"
//                         type="number"
//                         min="1"
//                         max="1000"
//                         step="0.1"
//                         value={radiusInputValue}
//                         onChange={handleRadiusInputChange}
//                         onBlur={handleRadiusInputBlur}
//                         onKeyPress={handleRadiusInputKeyPress}
//                         className="w-full py-1 px-2 text-sm rounded-md border"
//                       />
//                       <div className="flex items-center justify-center bg-muted px-2 rounded-md border border-l-0 border-input">
//                         <span className="text-xs">km</span>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         onClick={applyCustomRadiusInput}
//                         className="text-xs"
//                       >
//                         Apply
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}



//           <div className="flex flex-col sm:flex-row justify-between max-w-6xl mx-auto py-4 mt-4 px-4 gap-2 sm:gap-0">
//             <h2 className="text-lg font-semibold text-gray-700">
//               Nearby Vendors ({vendorData.length})
//             </h2>
//             <button className="bg-[#FF9534] text-white px-4 py-1 rounded-full shadow self-start sm:self-center">
//               50km radius
//             </button>
//           </div>

//           <div className="max-w-6xl mx-auto mt-6 space-y-4 px-4">
//             {vendorData.map((vendor) => (
//               <div
//                 key={vendor.id}
//                 className="bg-white flex flex-col md:flex-row items-center md:items-start p-4 rounded shadow-sm"
//               >
//                 <img
//                   src={vendor.photoUrl}
//                   alt={vendor.name}
//                   className="w-full sm:w-60 md:w-32 h-40 md:h-28 object-cover rounded"
//                 />
//                 <div className="flex flex-col md:flex-row justify-between w-full mt-5 md:mt-0 md:ml-4 gap-4">
//                   <div className="flex-1">
//                     <h3 className="text-lg mt-1 font-bold">{vendor.name}</h3>
//                     <p className="mt-1 text-black">{vendor.foodItems.join(', ')}</p>
//                     <div className="flex flex-wrap gap-4 text-orange-600 mt-1 text-sm">
//                       <span className="flex items-center gap-1">
//                         <PiForkKnifeBold size={20} className="text-orange-500" /> {vendor.tasteRating[0]}/5
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <FaRegStar size={20} className="text-yellow-500" /> {vendor.hygieneRating[0]}/5
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <FaRegHeart size={20} className="text-orange-400" /> {vendor.hospitalityRating[0]}/5
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col md:items-end gap-2">
//                     <span className="bg-[#FF9534] text-white text-sm px-3 py-1 rounded-full w-fit">
//                       0.5km
//                     </span>
//                     <div className="flex flex-col sm:flex-row gap-2">
//                       <Link href={`/locate/${vendor._id}`}>
//                         <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
//                           Details
//                         </button>
//                       </Link>
//                       <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2 justify-center">
//                         <CiLocationArrow1 size={20} />
//                         Locate
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         </div>
//         <Footer />
//       </>
//       );
// };

//       export default Location;
