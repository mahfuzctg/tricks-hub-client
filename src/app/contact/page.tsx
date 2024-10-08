

import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const page = () => {
  return (
    <div className="bg-white rounded-xl py-10 px-5">
      {/* Page Header */}
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have any questions or inquiries? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Form & Information */}
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">Your Message</label>
              <textarea
                id="message"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={5}
                placeholder="Write your message here"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-indigo-500 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <p className="mb-4">Feel free to get in touch with us through any of the following contact details:</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaPhoneAlt className="text-white text-2xl mr-4" />
              <span>(+123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-white text-2xl mr-4" />
              <span>info@yourcompany.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-white text-2xl mr-4" />
              <span>123 Your Address, City, Country</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
