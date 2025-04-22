'use client';
import { useState, useEffect } from 'react';
import Header from '../component/Layout/Header';
import Footer from '../component/Layout/Footer';
import SwipeCard from '../component/Card/swipeCard';
import { PiForkKnifeBold } from "react-icons/pi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoMdShuffle } from "react-icons/io";
import { FiLoader } from 'react-icons/fi'; 

const Swipe = () => {
    const [vendors, setVendors] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false); // Add loading state

    const fetchVendors = async () => {
        setLoading(true); // Set loading to true when fetching
        try {
            const response = await fetch('https://kartmatch-backend.onrender.com/api/vendors/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preferences }),
            });

            if (response.ok) {
                const data = await response.json();
                setVendors(data.data || []);
                setCurrentIndex(0); // Reset index when new vendors arrive
            } else {
                console.error('Failed to fetch vendors:', response.status, response.statusText);
            }
        } catch (err) {
            console.error("Error fetching vendors:", err);
        } finally {
            setLoading(false); // Set loading to false after fetch completes
        }
    };

    useEffect(() => {
        if (preferences.length === 2) {
            fetchVendors();
        }
    }, [preferences]);

    const handlePreferenceClick = (preference) => {
        setPreferences(prev =>
            prev.includes(preference)
                ? prev.filter(item => item !== preference)
                : prev.length < 2
                    ? [...prev, preference]
                    : prev
        );
    };

    const handleSkip = () => {
        if (currentIndex < vendors.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleShuffle = () => {
        if (vendors.length > 1) {
            const shuffled = [...vendors].sort(() => 0.5 - Math.random());
            setVendors(shuffled);
            setCurrentIndex(0);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 pt-28 min-h-screen w-full">
                <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mt-6">
                        <h1 className="text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins">
                            LET'S <span className="text-[#3FA025]">SWIPE</span>
                        </h1>
                        <h2 className="text-2xl sm:text-3xl mt-6 font-semibold text-[#3FA025] font-Poppins">
                            CHOOSE 2 PREFERENCES
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-10 ">
                        {['Taste', 'Hygiene', 'Hospitality'].map(pref => (
                            <button
                                key={pref}
                                className={`px-6 py-2 ${preferences.includes(pref) ? 'bg-[#FF384A] cursor-pointer hover:bg-white hover:text-black ' : 'bg-gradient-to-r hover:bg-white hover:text-black cursor-pointer from-[#FF384A] to-[#FF5463]'} text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]`}
                                onClick={() => handlePreferenceClick(pref)}
                            >
                                {pref === 'Taste' && <PiForkKnifeBold size={20} />}
                                {pref === 'Hygiene' && <IoShieldCheckmarkOutline size={20} />}
                                {pref === 'Hospitality' && <FaRegHeart size={20} />}
                                {pref}
                            </button>
                        ))}
                    </div>

                    <p className="text-center text-sm md:text-base mt-6 font-semibold">
                        Vendors will be sorted based on your preferences
                    </p>

                    {/* Show loading spinner while fetching */}
                    {loading && (
                        <div className="flex justify-center mt-16">
                            <FiLoader color="black" height={100} width={100} />
                        </div>
                    )}

                    {/* Shuffle & Vendor Count */}
                    {vendors.length > 0 && !loading && (
                        <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
                            <div className="text-base font-semibold">
                                Vendor {currentIndex + 1} of {vendors.length}
                            </div>
                            <button
                                className="px-6 py-2 bg-gradient-to-r cursor-pointer from-[#FF384A] to-[#FF5463] text-white rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)]"
                                onClick={handleShuffle}
                            >
                                <IoMdShuffle size={20} /> Shuffle
                            </button>
                        </div>
                    )}

                    {/* Swipe Card */}
                    <div className="mt-10 flex justify-center">
                        <SwipeCard
                            vendors={vendors}
                            preferences={preferences}
                            currentIndex={currentIndex}
                            handleSkip={handleSkip}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Swipe;
