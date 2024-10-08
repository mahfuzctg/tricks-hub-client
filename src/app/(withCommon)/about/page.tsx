
import React from 'react';
import { FaUsers, FaHandshake, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const teams = [
    {
        userName: 'Alice Johnson',
        position: 'Project Manager',
        image: 'https://i.ibb.co/3ynTBk9/portrait-of-smiling-female-manager.jpg',
        id: 1
    },
    {
        userName: 'James Smith',
        position: 'Lead Developer',
        image: 'https://i.ibb.co/5s2TZt7/portrait-of-young-programmer.jpg',
        id: 2
    },
    {
        userName: 'Emily Davis',
        position: 'UX/UI Designer',
        image: 'https://i.ibb.co/bB6C4Pv/portrait-of-happy-female-designer.jpg',
        id: 3
    },
    {
        userName: 'Michael Brown',
        position: 'Quality Assurance Specialist',
        image: 'https://i.ibb.co/QNsksD5/portrait-of-smiling-male-tester.jpg',
        id: 4
    },
    {
        userName: 'Sarah Wilson',
        position: 'Product Owner',
        image: 'https://i.ibb.co/gJDZJ2H/portrait-of-female-product-owner.jpg',
        id: 5
    },
    {
        userName: 'David Lee',
        position: 'Data Analyst',
        image: 'https://i.ibb.co/sCMLGRx/portrait-of-male-data-analyst.jpg',
        id: 6
    },
];



const page = () => {
  return (
    <div className="bg-white rounded-xl py-10 px-5">

      {/* Location */}
      <section className="mb-10 bg-indigo-500 py-8 rounded-xl text-white">
        <div className="container mx-auto text-center">
          <FaMapMarkerAlt className="text-white text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Our Location</h2>
          <p className=" max-w-2xl mx-auto px-3">
            We are located in the heart of the city, making it easy for our clients to connect with us. Visit us anytime!
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">About Us</h1>
        <p className="text-gray-600 text-lg text-justify">
          Welcome to [Your Company Name], where innovation meets excellence. Our goal is to create amazing digital experiences for all our clients Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, numquam expedita! Sint aut doloremque  
        </p>
      </div>

      {/* Our Mission */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaRocket className="text-indigo-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 text-lg mx-auto text-justify">
            Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age. Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age.Our mission is to
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaHandshake className="text-indigo-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-600 text-lg text-justify mx-auto">
            We envision a future where technology seamlessly integrates into everyday life, making it easier, more efficient, and more enjoyable for all.  making it easier, more efficient, and more enjoyable for all.  making it easier, more efficient
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaUsers className="text-indigo-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-9">Meet Our Team</h2>
          
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams?.map(team => <div key={team.id} className="bg-white p-6 rounded-lg shadow-md">
              <Image width={230} height={230}
                src={team.image}
                alt="Team Member"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{team.userName}</h3>
              <p className="text-gray-600">{team.position}</p>
            </div>)}
           
          </div>
        </div>
      </section>


    </div>
  );
};

export default page;