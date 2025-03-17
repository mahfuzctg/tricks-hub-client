import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Contact Form */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 text-center md:text-left">📬 Contact Us!</h1>
          <p className="text-gray-600 mt-1 text-center md:text-left">We&apos;d love to hear from you! 📝</p>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">Full Name 👤</label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">Email Address 📧</label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">Your Message 📝</label>
              <textarea
                id="message"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                rows={4}
                placeholder="Write your message here"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-r from-gray-600 to-black text-white font-semibold rounded-md shadow-md hover:bg-gradient-to-l transition duration-300"
            >
              Send Message ✨
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">📍 Contact Information</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
              <FaPhoneAlt className="text-gray-500 text-xl mr-3" />
              <span>(+88) 01881-656320</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-500 text-xl mr-3" />
              <span>aamahfuz.pro@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-500 text-xl mr-3" />
              <span>123 Hatazari, Chittagong, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;