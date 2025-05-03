
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import { PiForkKnifeBold } from 'react-icons/pi';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdShuffle } from "react-icons/io";
import toast from "react-hot-toast";
import { FaHotel } from 'react-icons/fa';

const SwipeCard = ({ vendors: vendorList = [], preferences = [] }) => {
    const [vendors, setVendors] = useState([]);
    const [currentVendorIndex, setCurrentVendorIndex] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [slideDirection, setSlideDirection] = useState(null); // Used for slide animation

    useEffect(() => {
        setVendors(vendorList);
    }, [vendorList]);

    const handleSkip = () => {
        if (currentVendorIndex < vendors.length - 1) {
            setSlideDirection('left'); // Add slide effect when skipping
            setTimeout(() => {
                setCurrentVendorIndex(currentVendorIndex + 1);
                setSlideDirection(null); // Reset slide direction after the transition
            }, 300); // Wait for animation to complete before changing index
        } else {
            console.log("No more vendors to show.");
        }
    };


    const handleShuffle = () => {
        if (vendors.length > 1) {
            const shuffled = [...vendors].sort(() => 0.5 - Math.random());
            setVendors(shuffled);
            setCurrentVendorIndex(0);
        }
    };

    const currentVendor = vendors[currentVendorIndex];

    if (!currentVendor) {
        return <div>Loading or no vendors available...</div>;
    }
    const handleSave = () => {
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
            
            // Trigger right swipe effect
            setSlideDirection('right');
            setTimeout(() => {
                setCurrentVendorIndex(currentVendorIndex + 1);
                setSlideDirection(null); // Reset slide direction after the transition
            }, 300); // Wait for animation to complete before changing index
        }
    };
    
    return (
        <div className="w-full flex flex-col items-center py-8">
            {/* Vendor Count & Shuffle Button */}
            {vendors.length > 0 && (
                <div className="w-full max-w-4xl mt-10 flex justify-between items-center px-4">
                    <div className="text-base font-semibold">
                        Vendor {currentVendorIndex + 1} of {vendors.length}
                    </div>
                    <button
                        className="px-6 py-2 bg-gradient-to-r cursor-pointer from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]"
                        onClick={handleShuffle}
                    >
                        <IoMdShuffle size={20} /> Shuffle
                    </button>
                </div>
            )}
    
            {/* Card */}
            {(preferences.length === 2 || currentVendor) && (
                <div className="flex justify-center mt-6 w-full">
                    <div
                        className={`w-90 border bg-gray-100 border-none shadow-[6px_6px_10px_rgba(0,0,0,0.2)] rounded-xl p-4 relative transition-all duration-300 transform ${slideDirection === 'left' ? '-translate-x-full opacity-0' : ''
                            } ${slideDirection === 'right' ? 'translate-x-full opacity-0' : ''}`}
                    >
                        {/* Image */}
                        <div className="relative w-full h-54 rounded-lg overflow-hidden">
                            <Image
                                src={currentVendor.photoUrl || '/path/to/fallback-image.jpg'}
                                alt={currentVendor.name || 'Vendor Image'}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                            <span className="absolute top-2 left-2 bg-white/40 backdrop-blur-sm text-red-500 text-sm font-bold px-3 py-1 rounded-lg">
                                {currentVendor?.name?.length > 30
                                    ? currentVendor.name.slice(0, 30) + "..."
                                    : currentVendor?.name}
                            </span>
                        </div>
    
                        {/* Details */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">{currentVendor?.name?.length > 30
                                    ? currentVendor.name.slice(0, 30) + "..."
                                    : currentVendor?.name}</h2>
                            </div>
    
                            {/* Location */}
                            <div className="flex items-center flex-wrap gap-4 mt-2">
                                {/* Location */}
                                <div className="flex items-center">
                                    <FaLocationDot color="black" size="18" />
                                   
                                </div>
    
                                {/* City Badge */}
                                <span className="bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full">
                                    {currentVendor.city}
                                </span>
    
                                {/* State Badge */}
                                <span className="bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full">
                                    {currentVendor.state}
                                </span>
                            </div>
    
                            {/* Ratings */}
                            <div className="flex justify-between text-md font-bold text-gray-800 mt-4">
                                <div className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center gap-1">
                                        <PiForkKnifeBold size={20} className="gap-3 text-orange-500" />
                                        <div className="text-sm mt-1 text-gray-600 font-medium">Taste</div>
                                    </div>
                                    <span>{parseInt(currentVendor.tasteRating)}/5</span>
                                </div>
                                <div className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center gap-1">
                                        <FaRegStar size={20} className="gap-3 text-yellow-500" />
                                        <div className="text-sm mt-1 text-gray-600 font-medium">Hygiene</div>
                                    </div>
                                    <span>{parseInt(currentVendor.hygieneRating)}/5</span>
                                </div>
                                <div className="flex flex-col items-center bg-gray-200 p-2 rounded-lg">
                                    <div className="flex items-center gap-1">
                                        <FaHotel size={20} className="gap-3 text-orange-400" />
                                        <div className="text-sm text-gray-600 font-medium">Hospitality</div>
                                    </div>
                                    <span>{parseInt(currentVendor.hospitalityRating)}/5</span>
                                </div>
                            </div>
    
                            {/* Food Items */}
                            <div className="mt-4 text-sm font-semibold">Food Items</div>
                            <div className="flex flex-wrap gap-1 mt-1">
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
                        <div className="mt-6 flex justify-between ">
                            <button
                                className="px-4 py-2 border border-red-400 font-bold rounded-lg text-sm flex items-center gap-2 text-red-500"
                                onClick={handleSkip}
                            >
                                Skip
                            </button>
    
                            <button
                                className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwipeCard