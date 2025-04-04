import Header from '../component/Layout/Header';
import { PiForkKnifeBold } from "react-icons/pi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Footer from '../component/Layout/Footer';
import { IoMdShuffle } from "react-icons/io";
import SwipeCard from '../component/Card/swipeCard'
const Swipe = () => {
    return (
        <>
            <Header  />
            <div className="bg-gray-100 mt-24 min-h-screen ">
                <div className="max-w-6xl mx-auto p-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold text-[#22343DCC] font-Poppins">
                            LET'S <span className="text-[#3FA025]">SWIPE</span>
                        </h1>
                        <h2 className="text-3xl mt-8 font-semibold text-[#3FA025] font-Poppins">
                            CHOOSE 2 PREFERENCES
                        </h2>
                    </div>

                    <div className="flex justify-evenly  mt-12">
                        <button className="px-8 py-2 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-md flex items-center gap-4 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <PiForkKnifeBold size={20} color="white" /> Taste
                        </button>
                        <button className="px-8 py-3 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-md flex items-center gap-4 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <IoShieldCheckmarkOutline size={20} color="white" /> Hygiene
                        </button>
                        <button className="px-8 py-3 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-md flex items-center gap-4 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                            <FaRegHeart size={20} color="white" /> Hospitality
                        </button>
                    </div>
                    <center>
                        <h1 className="text-lg mt-8 font-semibold" >Vendors will be sorted based on your preferences</h1>
                    </center>
                    <div className="flex justify-between mt-10" >
                        <div className="text-lg mt-4 font-semibold">Vendor 1 of 225</div>
                        <div>
                            <button className="px-8 py-3 bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-md flex items-center gap-4 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]">
                                <IoMdShuffle size={20} color="white" /> Shuffle
                            </button>
                        </div>
                    </div>

                </div>
                <div className="py-10" >
                    <SwipeCard />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Swipe;
