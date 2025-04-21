'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import { PiForkKnifeBold } from 'react-icons/pi';
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";
const SwipeCard = ({ vendors = [], preferences = [] }) => {
    const [currentVendorIndex, setCurrentVendorIndex] = useState(0);
const [isFavorited, setIsFavorited] = useState(false);

    const handleSkip = () => {
        if (currentVendorIndex < vendors.length - 1) {
            setCurrentVendorIndex(currentVendorIndex + 1);
        } else {
            console.log("No more vendors to show.");
        }
    };

    const handleSave = (vendor) => {
        console.log('Saved vendor:', vendor);
        handleSkip(); // Move to the next vendor after saving.
    };

    const currentVendor = vendors[currentVendorIndex];

    // Check if there's valid vendor data to render
    if (!currentVendor) {
        return <div>Loading or no vendors available...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            {/* Only show card if two preferences are selected or if a vendor is present */}
            {(preferences.length === 2 || currentVendor) && (
                <div className="w-80 border bg-gray-100 border-none shadow-[6px_6px_10px_rgba(0,0,0,0.2)] rounded-xl p-4 relative">
                    {/* Vendor Image */}
                    <div className="relative w-full h-54 rounded-lg overflow-hidden">
                        <Image
                            src={currentVendor.photoUrl || '/path/to/fallback-image.jpg'} // Fallback if no photoUrl
                            alt={currentVendor.name || 'Vendor Image'}
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

                        {/* Location */}
                        <div className="flex items-center mt-2">
                            <FaLocationDot color="black" size="20" />
                            <span className="ml-2">
                                Lat: {currentVendor.location.coordinates[0]}, Lng: {currentVendor.location.coordinates[1]}
                            </span>
                        </div>

                        {/* Ratings */}
                        <div className="flex justify-between text-md font-bold text-gray-800 mt-4">
                            {/* Taste */}
                            <div className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
                                <div className="flex  items-center gap-1  rounded-xl ">
                                    <div>
                                        <PiForkKnifeBold size={20} className="text-orange-500" />
                                    </div>
                                    <div className="text-sm mt-1 text-gray-600 font-medium">Taste</div>
                                </div>
                                <span className="text-md">{currentVendor.tasteRating[0]}/5</span>
                            </div>

                            {/* Hygiene */}
                            <div className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
                                <div className="flex  items-center gap-1 rounded-xl">
                                    <FaRegStar size={20} className="text-yellow-500" />
                                    <div className="text-sm mt-1 text-gray-600 font-medium">Hygiene</div>
                                </div>
                                <span className="text-md">{currentVendor.hygieneRating[0]}/5</span>
                            </div>

                            {/* Hospitality */}
                            <div className="flex flex-col items-center  bg-gray-200 p-2 rounded-lg">
                                <div className="flex  items-center gap-1  rounded-xl">
                                    <FaRegHeart size={20} className="text-orange-400" />
                                    <div className="text-sm  text-gray-600 font-medium">Hospitality</div>
                                </div>
                                <span className="text-md">{currentVendor.hospitalityRating[0]}/5</span>
                            </div>
                        </div>



                        {/* Food Items */}
                        <div className="mt-4 text-sm text-semibold" > Food Items </div>
                        <div className=" flex flex-wrap gap-1 mt-1">
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
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            className="px-4 py-2 border border-red-400 font-bold rounded-lg text-sm flex items-center gap-2 text-red-500"
                            onClick={handleSkip}
                        >
                            Skip
                        </button>


                        <button
                            className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2"
                            onClick={() => {
                                if (!currentVendor) return;

                                const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                                const alreadyFavorited = storedFavorites.find((fav) => fav._id === currentVendor._id);

                                if (alreadyFavorited) {

                                    toast.error('Vendor already in favorites!');
                                } else {
                                    storedFavorites.push(currentVendor);
                                    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
                                    setIsFavorited(true);
                                    toast.success('Vendor added to favorites!');
                                    handleSkip(); // go to next vendor after saving
                                }
                            }}
                        >
                            Save
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default SwipeCard;
