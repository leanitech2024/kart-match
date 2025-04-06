'use client';
import React, { useState } from "react";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { PiForkKnifeBold } from "react-icons/pi";
import { MdOutlineCleanHands } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import Header from '../../component/Layout/Header';
import Footer from '../../component/Layout/Footer';

// StarRating Component
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex gap-0.5 text-yellow-500">
      {[...Array(filledStars)].map((_, i) => (
        <span key={i}>★</span>
      ))}
      {halfStar && <span>★</span>}
      {[...Array(totalStars - filledStars - (halfStar ? 1 : 0))].map((_, i) => (
        <span key={i + 'empty'} className="text-gray-300">★</span>
      ))}
    </div>
  );
};

const VendorDetails = () => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      alert("Comment submitted: " + comment);
      setComment("");
    }
  };

  const vendor = {
    name: "Subhash Papad wala",
    image:"https://res.cloudinary.com/dlpm03ztl/image/upload/v1729963152/exmd5bmtkqgmr5msherf.webp",
    lat: 22.568462,
    lng: 88.359920,
    foodItems: ["Papad wala", "Puchka Packet"],
    ratings: {
      taste: 4,
      hygiene: 3.5,
      hospitality: 4,
    },
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100  px-4 py-6 sm:px-6 lg:px-8">
     <center>
     <div className=" rounded-xl max-w-4xl mx-auto mt-24 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="text-gray-700">VENDOR </span>
            <span className="text-green-600">DETAILS</span>
          </h2>

          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-94 h-64 object-cover rounded-md mb-6"
          />

          <h3 className="text-xl font-semibold text-center mb-2">{vendor.name}</h3>

          <p className="flex justify-center items-center text-gray-600 mb-6 gap-2 text-xl font-bold sm:text-base">
            <FaMapMarkerAlt size={20} className="text-red-500" />
            Lat: {vendor.lat}, Lng: {vendor.lng}
          </p>

          {/* Ratings */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow w-28">
              <PiForkKnifeBold size={24} />
              <p className="text-xs mt-1">Taste</p>
              <StarRating rating={vendor.ratings.taste} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow w-28">
              <MdOutlineCleanHands size={24} />
              <p className="text-xs mt-1">Hygiene</p>
              <StarRating rating={vendor.ratings.hygiene} />
            </div>
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow w-28">
              <RiTeamLine size={24} />
              <p className="text-xs mt-1">Hospitality</p>
              <StarRating rating={vendor.ratings.hospitality} />
            </div>
          </div>

          {/* Food Items */}
          <h4 className="text-lg font-semibold mb-3 text-center">Food Items</h4>
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {vendor.foodItems.map((item, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-50 transition">
              <FaRegHeart /> Add To Favorite
            </button>
            <button className="bg-green-600 flex text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
            <FaMapMarkerAlt size={20} className="text-white mt-[3px] mr-2" />   View On Map
            </button>
          </div>

          {/* Comments */}
          <div>
            <label className="block font-medium mb-2 left-0! text-gray-700">Comments</label>
            <textarea
              className="w-full h-28 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Write your comments here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition"
              onClick={handleCommentSubmit}
            >
              Add Comments
            </button>
          </div>
        </div>
     </center>
      </div>
      <Footer />
    </>
  );
};

export default VendorDetails;
