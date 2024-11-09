import React from 'react';
import { FaUsers, FaHandshake, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Image from 'next/image';

const teams = [
    {
        userName: 'Abdullah AL Mahfuz',
        position: 'Web Developer',
        image: 'https://i.postimg.cc/63FF3wz0/Whats-App-Image-2024-11-08-at-1-23-53-AM.jpg',
        id: 7
    },
    {
        userName: 'Khalid Farhan',
        position: 'Marketing Specialist',
        image: 'https://i.postimg.cc/TYfCcpyb/images.jpg',
        id: 8
    },
    {
        userName: 'Shradha Khapra',
        position: 'Logistics Coordinator',
        image: 'https://i.postimg.cc/bNy9tWMH/channels4-profile.jpg',
        id: 9
    },
    {
        userName: 'Jhankar Mahbub',
        position: 'Financial Analyst',
        image: 'https://i.postimg.cc/3xb171tj/1677507599579.jpg',
        id: 10
    }
];

const Page = () => {
    return (
        <div className="bg-white dark:bg-black rounded-xl py-12 px-6">

            {/* About Us Section */}
            <section className="relative h-[300px] mb-10 bg-cover bg-center rounded-xl overflow-hidden animate-fadeIn" style={{ backgroundImage: "url('https://i.postimg.cc/FzGQPwhX/istockphoto-943067460-612x612.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-60 rounded-xl"></div>
                <div className="container mx-auto flex justify-center items-center text-center relative z-10 text-white">
                    <div className="fade-in text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-5 animate-bounce">Welcome to Tricks Hub</h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 animate-slideIn">Discover the latest tips, tricks, and tutorials to enhance your skills. Explore and learn more today!</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="container mx-auto text-center animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Mission */}
                    <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg text-gray-800 dark:text-gray-300 transition-transform duration-300 transform hover:scale-105 animate-slideIn">
                        <FaRocket className="text-5xl text-gray-600 dark:text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                        <p className="text-lg">Our mission is to empower individuals and businesses with innovative solutions that provide value and efficiency.</p>
                    </div>

                    {/* Vision */}
                    <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg text-gray-800 dark:text-gray-300 transition-transform duration-300 transform hover:scale-105 animate-slideIn">
                        <FaHandshake className="text-5xl text-gray-600 dark:text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                        <p className="text-lg">We envision a world where access to knowledge and technology is available to everyone.</p>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="mb-10">
                <div className="container mx-auto text-center">
                    <FaUsers className="text-5xl text-gray-600 dark:text-gray-300 mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-8">Meet Our Team</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {teams.map((team) => (
                            <div key={team.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 animate-slideInUp">
                                <Image
                                    width={120}
                                    height={120}
                                    src={team.image}
                                    alt={`${team.userName}'s Profile Picture`}
                                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">{team.userName}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{team.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Location */}
            <section className="bg-gray-100 dark:bg-gray-900 py-8 rounded-xl text-center text-gray-800 dark:text-gray-300">
                <div className="container mx-auto mb-8">
                    <FaMapMarkerAlt className="text-5xl text-gray-600 dark:text-gray-300 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold mb-3">Our Location</h2>
                    <p className="max-w-2xl mx-auto px-3 text-lg">We are located in the heart of the city, making it easy for our clients to connect with us. Visit us anytime!</p>
                </div>

                {/* Google Maps */}
                <div className="container mx-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.788741892787!2d90.354722!3d23.810379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7eaeb735d3b%3A0xdcf15f5c1f47d3a7!2sICT%20Division!5e0!3m2!1sen!2sbd!4v1639059579823!5m2!1sen!2sbd"
                        width="100%" height="400" style={{ border: 0 }} 
                        loading="lazy"></iframe>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-8 mt-10 rounded-t-xl shadow-lg">
    <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-3">
            Made with ❤️ by Tricks Hub Team
        </p>
        <p className="text-sm mb-3">
            Stay Connected with Us 🌐
        </p>
        
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 text-2xl mb-5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-300 transition duration-200">
                    <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-300 transition duration-200">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-300 transition duration-200">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300 transition duration-200">
                    <FaLinkedinIn />
                </a>
            </div>

        <p className="text-sm">
            &copy; {new Date().getFullYear()} Tricks Hub. All rights reserved. 🌟
        </p>
    </div>
</footer>

        </div>
    );
};

export default Page;
