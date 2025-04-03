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


const Gallery = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen shadow-lg ">
                <div className="max-w-6xl mx-auto p-4 ">
                    <center>
                        <h1 className="text-3xl font-semibold text-[#22343DCC] font-Poppins">
                            YOUR <span className="text-[#3FA025]">FAVOURITES</span>
                        </h1>
                    </center>


                    <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <VendorCard key={index} />
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Gallery;
