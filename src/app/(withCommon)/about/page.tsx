

import React from 'react';
import { FaUsers, FaHandshake, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const teams = [
    {
        userName : 'Imtiaz Sarkar Shimul',
        position : 'Senior Advisor',
        image : 'https://i.ibb.co.com/LP49cHY/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-g.jpg',
        id:1
    },
    {
        userName : 'Khan Mohammad Iqra',
        position : 'Site Manager',
        image : 'https://i.ibb.co.com/bLgWLNY/360-F-640070383-9-LJ3e-TRSv-Oiw-Kyrm-BYgcjh-Slck-Dn-Ncxl.jpg',
        id:2
    },
    {
        userName : 'Shamim Ahmed',
        position : 'Senior Designer',
        image : 'https://i.ibb.co.com/k6y1PR5/360-F-200902415-G4e-Z9-Ok3-Ypd4-SZZKjc8nq-Jy-FVp1e-OD6-V.jpg',
        id:3
    },
    {
        userName : 'Sogir Sikder',
        position : 'Senior Advisor',
        image : 'https://i.ibb.co.com/23NYhXH/istockphoto-1398385367-612x612.jpg',
        id:4
    },
    {
        userName : 'Tanim Pramanik',
        position : 'Site Manager',
        image : 'https://i.ibb.co.com/9Hn1SWq/istockphoto-1278978817-612x612.jpg',
        id:5
    },
    {
        userName : 'Maksudur Rahman',
        position : '3D Visual Designer',
        image : 'https://i.ibb.co.com/QYSz3rt/depositphotos-187662616-stock-photo-portrait-of-male-pensioner.webp',
        id:6
    },
]


const page = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl py-10 px-5">

      {/* Location */}
      <section className="mb-10 bg-blue-500 dark:bg-blue-600 py-8 rounded-xl text-white">
        <div className="container mx-auto text-center">
          <FaMapMarkerAlt className="text-white text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Our Location</h2>
          <p className=" max-w-2xl mx-auto px-3 ">
            We are located in the heart of the city, making it easy for our clients to connect with us. Visit us anytime!
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400 mb-5">About Us</h1>
        <p className="text-gray-600 text-lg text-justify dark:text-gray-400">
          Welcome to [Your Company Name], where innovation meets excellence. Our goal is to create amazing digital experiences for all our clients Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, numquam expedita! Sint aut doloremque  
        </p>
      </div>

      {/* Our Mission */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaRocket className="text-blue-500 dark:text-blue-600 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-400 mb-3">Our Mission</h2>
          <p className="text-gray-600 text-lg mx-auto text-justify dark:text-gray-400">
            Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age. Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age.Our mission is to
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaHandshake className="text-blue-500 dark:text-blue-600 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3 dark:text-gray-400">Our Vision</h2>
          <p className="text-gray-600 text-lg text-justify mx-auto dark:text-gray-400">
            We envision a future where technology seamlessly integrates into everyday life, making it easier, more efficient, and more enjoyable for all.  making it easier, more efficient, and more enjoyable for all.  making it easier, more efficient
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaUsers className="text-blue-500 dark:text-blue-600 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-9 dark:text-gray-400">Meet Our Team</h2>
          
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams?.map(team => <div key={team.id} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <Image width={230} height={230}
                src={team.image}
                alt="Team Member"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-400">{team.userName}</h3>
              <p className="text-gray-600 dark:text-blue-500">{team.position}</p>
            </div>)}
           
          </div>
        </div>
      </section>


    </div>
  );
};

export default page;
