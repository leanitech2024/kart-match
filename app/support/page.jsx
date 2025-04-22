'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../component/Layout/Header';
import Footer from '../component/Layout/Footer';
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address'
      ),
    message: yup.string().required('Message is required'),
  });
  

export default function DonationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('https://kartmatch-backend.onrender.com/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          emailId: data.email,
          message: data.message,
        }),
      });

      const resData = await res.json();

      if (res.ok) {
        toast.success('Form submitted successfully!');
        reset();
      } else {
        toast.error(resData.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error! Try again later.');
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-100 mt-24 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mt-6">
            <h1 className="text-4xl font-semibold text-[#22343DCC] font-Poppins">
              SUPPORT US TO <span className="text-[#3FA025]">MAKE A DIFFERENCE</span>
            </h1>
          </div>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  {...register('firstName')}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Your First Name"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  {...register('lastName')}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Your Last Name"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mail ID</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Your Mail ID"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Donate in honour or Memory of</label>
                <textarea
                  {...register('message')}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write your message here"
                  rows="4"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
