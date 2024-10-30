import React from 'react';
import { FaUsers, FaHandshake, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const teams = [
    {
        userName: 'Imtiaz Sarkar Shimul',
        position: 'Senior Advisor',
        image: 'https://i.ibb.co/LP49cHY/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-g.jpg',
        id: 1
    },
    {
        userName: 'Khan Mohammad Iqra',
        position: 'Site Manager',
        image: 'https://i.ibb.co/bLgWLNY/360-F-640070383-9-LJ3e-TRSv-Oiw-Kyrm-BYgcjh-Slck-Dn-Ncxl.jpg',
        id: 2
    },
    {
        userName: 'Shamim Ahmed',
        position: 'Senior Designer',
        image: 'https://i.ibb.co/k6y1PR5/360-F-200902415-G4e-Z9-Ok3-Ypd4-SZZKjc8nq-Jy-FVp1e-OD6-V.jpg',
        id: 3
    },
    {
        userName: 'Sogir Sikder',
        position: 'Senior Advisor',
        image: 'https://i.ibb.co/23NYhXH/istockphoto-1398385367-612x612.jpg',
        id: 4
    },
    {
        userName: 'Tanim Pramanik',
        position: 'Site Manager',
        image: 'https://i.ibb.co/9Hn1SWq/istockphoto-1278978817-612x612.jpg',
        id: 5
    },
    {
        userName: 'Maksudur Rahman',
        position: '3D Visual Designer',
        image: 'https://i.ibb.co/QYSz3rt/depositphotos-187662616-stock-photo-portrait-of-male-pensioner.webp',
        id: 6
    },
];

const Page = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl py-12 px-6">

            {/* Location */}
            <section className="mb-10 bg-gray-100 dark:bg-gray-700 py-8 rounded-xl text-gray-800 dark:text-gray-200 shadow-lg">
                <div className="container mx-auto text-center">
                    <FaMapMarkerAlt className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-3">Our Location</h2>
                    <p className="max-w-2xl mx-auto px-3 text-gray-700 dark:text-gray-300">
                        We are located in the heart of the city, making it easy for our clients to connect with us. Visit us anytime!
                    </p>
                </div>
            </section>

            {/* About Us Section */}
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-5">About Us</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto text-justify">
                    Welcome to [Your Company Name], where innovation meets excellence. Our goal is to create amazing digital experiences for all our clients. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, numquam expedita! Sint aut doloremque.
                </p>
            </div>

            {/* Our Mission */}
            <section className="mt-10">
                <div className="container mx-auto text-center">
                    <FaRocket className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-3">Our Mission</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mx-auto text-justify max-w-3xl">
                        Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age.
                    </p>
                </div>
            </section>

            {/* Our Vision */}
            <section className="mt-10">
                <div className="container mx-auto text-center">
                    <FaHandshake className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-3">Our Vision</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mx-auto text-justify max-w-3xl">
                        We envision a future where technology seamlessly integrates into everyday life, making it easier, more efficient, and more enjoyable for all.
                    </p>
                </div>
            </section>

            {/* Our Team */}
            <section className="mt-10">
                <div className="container mx-auto text-center">
                    <FaUsers className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-9">Meet Our Team</h2>
                    
                    {/* Team Members */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {teams.map(team => (
                            <div key={team.id} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
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
        </div>
    );
};

export default Page;
