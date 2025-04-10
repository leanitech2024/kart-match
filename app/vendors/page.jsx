import Header from '../component/Layout/Header';
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import Vendor1 from '../../public/assets/vendorPage/Vendor1.png';
import Vendor2 from '../../public/assets/vendorPage/Vendor2.png';
import Vendor3 from '../../public/assets/vendorPage/Vendor3.png';
import Vendor4 from '../../public/assets/vendorPage/Vendor4.png';
import Image from "next/image";
import VendorCard from '../component/Card/VendorCard'
import Footer from '../component/Layout/Footer'
const vendorPage = [
    {
        image: Vendor1,
        title: "Vada Pau ",
    },
    {
        image: Vendor2,
        title: "Dosa ",
    },
    {
        image: Vendor3,
        title: "Puchka ",
    },
    {
        image: Vendor4,
        title: "Momo ",
    }
]

const Vendors = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-100 mt-24 min-h-screen shadow-lg ">
                <div className="max-w-6xl mx-auto p-4 mt-4 ">
                    <center>
                        <h1 className="text-3xl font-semibold mt-4 text-[#22343DCC] font-Poppins">
                            DISCOVER <span className="text-[#3FA025]">VENDORS</span>
                        </h1>
                    </center>

                    {/* Search bar */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 bg-white rounded-md p-3 shadow-md w-full max-w-6xl mx-auto">
                     
                        <div className="relative w-full flex-grow">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                <FaLocationDot size={20} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search for vendors"
                                className="pl-10 pr-4 py-3 w-full text-sm rounded-md bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-[#3FA025]"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md flex items-center gap-2 shadow-md hover:opacity-90 w-full sm:w-auto justify-center">
                            <CiSearch size={20} /> Search
                        </button>
                    </div>


                    {/* Search by category */}
                    <div className="flex justify-between items-center p-4 mt-6">
                        <h1 className="text-2xl font-semibold text-[#22343DCC] font-Poppins">
                            Search By <span className="text-[#3FA025]">Category</span>
                        </h1>
                        <div className="flex gap-4">
                            <button className="bg-[#FFB30E] p-3 rounded-full shadow-md hover:bg-[#e09c0c]">
                                <FaLessThan color="white" size={24} />
                            </button>
                            <button className="bg-[#FFB30E] p-3 rounded-full shadow-md hover:bg-[#e09c0c]">
                                <FaGreaterThan color="white" size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Vendor Grid */}
                    <div className="flex justify-center gap-24 mt-6 flex-wrap">
                        {vendorPage.map((vendor, index) => (
                            <div key={index} className="relative  flex flex-col items-center">
                                <div className="w-52 h-52 bg-[#FFD609] rounded-full shadow-lg flex items-center justify-center overflow-hidden border-4 border-white">
                                    <Image
                                        className="w-48 h-48 object-cover rounded-full"
                                        src={vendor.image}
                                        alt={vendor.title}
                                    />
                                </div>
                                <p className="mt-2 text-lg font-semibold text-gray-700">{vendor.title}</p>
                            </div>
                        ))}
                    </div>
                    {/* Vendor Card */}

                    <div className="mb-10" >
                        <VendorCard />
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Vendors;
