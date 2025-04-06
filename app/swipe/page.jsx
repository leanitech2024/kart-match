import Header from '../component/Layout/Header';
import { PiForkKnifeBold } from "react-icons/pi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Footer from '../component/Layout/Footer';
import { IoMdShuffle } from "react-icons/io";
import SwipeCard from '../component/Card/swipeCard';

const Swipe = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-100 pt-28 min-h-screen w-full">
                <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                    
                    {/* Heading Section */}
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins">
                            LET'S <span className="text-[#3FA025]">SWIPE</span>
                        </h1>
                        <h2 className="text-2xl sm:text-3xl mt-6 font-semibold text-[#3FA025] font-Poppins">
                            CHOOSE 2 PREFERENCES
                        </h2>
                    </div>

                    {/* Preference Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <button className="px-6 py-2 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <PiForkKnifeBold size={20} /> Taste
                        </button>
                        <button className="px-6 py-2 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <IoShieldCheckmarkOutline size={20} /> Hygiene
                        </button>
                        <button className="px-6 py-2 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <FaRegHeart size={20} /> Hospitality
                        </button>
                    </div>

                    {/* Description Text */}
                    <p className="text-center text-sm md:text-base mt-6 font-semibold">
                        Vendors will be sorted based on your preferences
                    </p>

                    {/* Shuffle Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
                        <div className="text-base font-semibold">Vendor 1 of 225</div>
                        <button className="px-6 py-2 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <IoMdShuffle size={20} /> Shuffle
                        </button>
                    </div>

                    {/* Swipe Card */}
                    <div className="py-10">
                        <SwipeCard />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Swipe;
