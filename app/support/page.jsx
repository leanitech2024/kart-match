'use client';

import { useState } from 'react';
import Header from '../component/Layout/Header'
import Footer from '../component/Layout/Footer'
export default function DonationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 mt-24 min-h-screen ">
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center mt-6">
                        <h1 className="text-4xl font-semibold text-[#22343DCC] font-Poppins">
                            SUPPORT US TO  <span className="text-[#3FA025]">MAKE A DIFFERENCE</span>
                        </h1>

                    </div>
                    <div className="mt-12" >
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter Your First Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter Your Last Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mail ID</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter Your Mail ID"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Donate in honour or Memory of</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Write your message here"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                                Donate
                            </button>
                        </div>
                    </form>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

