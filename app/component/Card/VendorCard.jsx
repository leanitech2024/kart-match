import Image from "next/image";
import { PiForkKnifeBold } from "react-icons/pi";
import Data from "../../utils/data.json";
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
const VendorCard = () => {
    return (
        <div className="flex flex-wrap justify-center gap-14 mt-18 max-w-7xl bg-gray-100">
            {Data.vendorData.map((vendor) => (
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
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold ">{vendor.name}</h2>
                            <FaRegHeart color="red" size="25" className="text-red-600 cursor-pointer" />
                        </div>

                        <div className="flex justify-start gap-3 text-md font-bold  text-gray-800 mt-4">
                            <span className="flex items-center " >
                                <PiForkKnifeBold size="25" className="text-orange-500  " /> {vendor.tasteRating}/5
                            </span>
                            <span className="flex items-center gap-1">
                                <FaRegStar size="25" className="text-yellow-500" /> {vendor.hygieneRating}/5
                            </span>
                            <span className="flex items-center gap-1">
                                <FaRegHeart size="25" className="text-orange-400" /> {vendor.hospitalityRating}/5
                            </span>
                        </div>

                        {/* Food Items */}
                        <div className="mt-4 flex flex-wrap gap-1">
                            {vendor.foodItems.slice(0, 2).map((item, index) => (
                                <span key={index} className="bg-yellow-200 text-gray-800 px-2 py-1 text-xs rounded-full">
                                    {item}
                                </span>
                            ))}
                            {vendor.foodItems.length > 2 && (
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
                                    +{vendor.foodItems.length - 2} more
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-between">
                            <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
                                Details
                            </button>

                            <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2">
                                <CiLocationArrow1 color="white" size={20} /> Locate
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default VendorCard;