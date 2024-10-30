import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="bg-gray-100 rounded-xl py-12 px-6">
      {/* Page Header */}
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-700 text-lg">
          Have any questions or inquiries? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Form & Information */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">Your Message</label>
              <textarea
                id="message"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                rows={5}
                placeholder="Write your message here"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
          <p className="text-gray-700 mb-6">
            Feel free to get in touch with us through any of the following contact details:
          </p>
          <div className="space-y-6">
            <div className="flex items-center">
              <FaPhoneAlt className="text-gray-600 text-2xl mr-4 hover:text-gray-900 transition-colors duration-300" />
              <span className="text-lg text-gray-800">(+123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-600 text-2xl mr-4 hover:text-gray-900 transition-colors duration-300" />
              <span className="text-lg text-gray-800">info@yourcompany.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-600 text-2xl mr-4 hover:text-gray-900 transition-colors duration-300" />
              <span className="text-lg text-gray-800">123 Your Address, City, Country</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
