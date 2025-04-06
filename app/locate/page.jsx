'use client'
import Header from '../component/Layout/Header'
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import bgMap from '../../public/assets/Location/map.png'
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
import Footer from '../component/Layout/Footer'
import Link from "next/link";

const vendorData = [
    {
        id: 7,
        name: "Puchka Wala",
        location: { type: "Point", coordinates: [88.351977, 22.560087] },
        foodItems: ["Puchka", "Puchka Masala"],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963152/exmd5bmtkqgmr5msherf.webp"
    },
    {
        id: 8,
        name: "Subhash Papad wala",
        location: { type: "Point", coordinates: [88.352038, 22.560099] },
        foodItems: [
            "Fried Snacks", "Puchka Packet", "Puffed Rice (Murmura)", "Sev",
            "Bhujia", "Chakli (circular fried snacks)", "Lentils and Pulses",
            "Chips", "Papad", "Fried Namkeen"
        ],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963241/Whats-App-Image-2024-06-19-at-14-46-35-5ec8518b_ymolvg.webp"
    },
    {
        id: 9,
        name: "Subhash Papad wala",
        location: { type: "Point", coordinates: [88.352018, 22.560253] },
        foodItems: [
            "Puffed Rice (Murmura)", "Papad wala", "Sev", "Bhujia",
            "Chips", "Papad", "Fried Namkeen"
        ],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963265/Whats-App-Image-2024-06-19-at-14-46-35-c6bd8150_shtwqi.webp"
    },
    {
        id: 10,
        name: "Wow Chicken",
        location: { type: "Point", coordinates: [88.352032, 22.559962] },
        foodItems: ["Chicken Puff"],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963288/Whats-App-Image-2024-06-19-at-14-46-35-29caa01a_xbxyzw.webp"
    }
]

const Location = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 mt-24 py-4 min-h-screen">
        {/* Title */}
        <div className="text-center mb-8 mt-4 px-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins">
            VENDOR <span className="text-[#3FA025]">MAP</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-20 sm:py-24"
          style={{ backgroundImage: `url(${bgMap.src})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 z-0" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center max-w-6xl mx-auto gap-4 px-4">
            <div className="bg-white bg-opacity-90 shadow-md rounded-md p-4 w-full sm:flex sm:items-center sm:w-auto gap-4">
              <div className="relative w-full sm:w-96">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaLocationDot color="red" size={25} />
                </span>
                <input
                  type="text"
                  placeholder="Search Vendors Or Food Items"
                  className="w-full pl-10 p-3 rounded-md border border-gray-300 shadow-sm outline-none"
                />
              </div>
              <button className="mt-4 sm:mt-0 bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-full sm:w-auto">
                <FaSearchLocation />
                Find Street Food
              </button>
            </div>
          </div>
        </div>

        {/* Radius Button */}
        <div className="flex flex-col sm:flex-row justify-between max-w-6xl mx-auto py-4 mt-4 px-4 gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-700">
            Nearby Vendors ({vendorData.length})
          </h2>
          <button className="bg-[#FF9534] text-white px-4 py-1 rounded-full shadow self-start sm:self-center">
            5km radius
          </button>
        </div>

        {/* Vendor Cards */}
        <div className="max-w-6xl mx-auto mt-6 space-y-4 px-4">
          {vendorData.map((vendor) => (
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
                  <p className="text-bold mt-1 text-black">{vendor.foodItems.join(', ')}</p>
                  <div className="flex flex-wrap gap-4 text-orange-600 mt-1 text-sm">
                    <span className="flex items-center gap-1">
                      <PiForkKnifeBold size={20} className="text-orange-500" /> {vendor.tasteRating}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegStar size={20} className="text-yellow-500" /> {vendor.hygieneRating}/5
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegHeart size={20} className="text-orange-400" /> {vendor.hospitalityRating}/5
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <span className="bg-[#FF9534] text-white text-sm px-3 py-1 rounded-full w-fit">
                    0.5km
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/locate/${vendor.id}`}>
                    <button className="px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm">
                      Details
                    </button>
                    </Link>
                    <button className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2 justify-center">
                      <CiLocationArrow1 color="white" size={20} /> Locate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Location
