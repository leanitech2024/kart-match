'use client'
import Image from "next/image";
import { PiForkKnifeBold } from "react-icons/pi";
import Data from "../../utils/data.json";
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

const SwipeCard = () => {
    const [vendors, setVendors] = useState(Data.vendorData);
    const [savedVendors, setSavedVendors] = useState([]);
    const [currentVendorIndex, setCurrentVendorIndex] = useState(0);

    const handleSkip = () => {
        if (currentVendorIndex < vendors.length - 1) {
            setCurrentVendorIndex(currentVendorIndex + 1);
        } else {
            // Handle end of vendors (e.g., show a message, reset, etc.)
            console.log("No more vendors to show.");
        }
    };

    const handleSave = (vendor) => {
        setSavedVendors((prevSavedVendors) => [...prevSavedVendors, vendor]);
        handleSkip(); // Move to the next vendor after saving.
    };

    const currentVendor = vendors[currentVendorIndex];

    return (
        <div className="flex flex-col items-center">
            {currentVendor && (
                <div className="w-80 border bg-gray-100 border-none shadow-[6px_6px_10px_rgba(0,0,0,0.2)] rounded-xl p-4 relative">
                    {/* Vendor Image */}
                    <div className="relative w-full h-54 rounded-lg overflow-hidden">
                        <Image
                            src={currentVendor.photoUrl}
                            alt={currentVendor.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        <span className="absolute top-2 left-2 bg-white/40 backdrop-blur-sm text-red-500 text-sm font-bold px-3 py-1 rounded-lg">
                            {currentVendor.name}
                        </span>
                    </div>

                    {/* Vendor Details */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold ">{currentVendor.name}</h2>
                        </div>
                        <span className="flex items-center ">
                            <FaLocationDot color="black" size="20" className="text-black cursor-pointer" />
                          
                            Lat: {currentVendor.location.coordinates[0]} ,
                            Lng: {currentVendor.location.coordinates[1]}
                        </span>

                        <div className="flex justify-start gap-3 text-md font-bold  text-gray-800 mt-4">
                            <span className="flex items-center ">
                                <PiForkKnifeBold size="25" className="text-orange-500  " /> {currentVendor.tasteRating}/5
                            </span>
                            <span className="flex items-center gap-1">
                                <FaRegStar size="25" className="text-yellow-500" /> {currentVendor.hygieneRating}/5
                            </span>
                            <span className="flex items-center gap-1">
                                <FaRegHeart size="25" className="text-orange-400" /> {currentVendor.hospitalityRating}/5
                            </span>
                        </div>

                        {/* Food Items */}
                        <div className="mt-4 flex flex-wrap gap-1">
                            {currentVendor.foodItems.slice(0, 2).map((item, index) => (
                                <span key={index} className="bg-yellow-200 text-gray-800 px-2 py-1 text-xs rounded-full">
                                    {item}
                                </span>
                            ))}
                            {currentVendor.foodItems.length > 2 && (
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
                                    +{currentVendor.foodItems.length - 2} more
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-between">
                            <button
                                className="px-4 py-2 border border-red-400 font-bold rounded-lg text-sm flex items-center gap-2 text-red-500"
                                onClick={handleSkip}
                            >
                                <RxCross2 color="red" size={20}/> Skip
                            </button>

                            <button
                                className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2"
                                onClick={() => handleSave(currentVendor)}
                            >
                                <FaCheck color="white" size={20} /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Saved Vendors Section */}
            {savedVendors.length > 0 && (
                <div className="mt-8 w-full max-w-7xl">
                    <h2 className="text-2xl font-semibold mb-4">Saved Vendors</h2>
                    <div className="flex flex-wrap justify-center gap-14">
                        {savedVendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                className="w-80 border bg-gray-100 border-none shadow-[6px_6px_10px_rgba(0,0,0,0.2)] rounded-xl p-4 relative"
                            >
                                {/* Vendor Image */}
                                <div className="relative w-full h-54 rounded-lg overflow-hidden">
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

                                {/* Vendor Details */}
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold ">{vendor.name}</h2>
                                    <span className="flex items-center ">
                                        <FaLocationDot color="black" size="25" className="text-black cursor-pointer" />
                                        {vendor.location.coordinates}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwipeCard;