import Image from 'next/image';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}



const eventsData: Event[] = [
  {
    id: 1,
    title: 'Tech Innovators Meetup 2024',
    date: 'October 20, 2024',
    location: 'San Francisco, CA',
    description: 'Join the leading minds in technology to discuss the future of innovation and startups. Don\'t miss this opportunity to network with the industry leaders!',
    image: 'https://i.ibb.co/2Syc3qg/185749-b59a695a34a30841-001full.jpg',
  },
  {
    id: 2,
    title: 'AI & Machine Learning Conference',
    date: 'November 10, 2024',
    location: 'New York, NY',
    description: 'A conference dedicated to exploring the latest trends in AI and machine learning, with keynotes from experts in the field.',
    image: 'https://i.ibb.co/kSZYyKT/AI-Summit.jpg',
  },
  {
    id: 3,
    title: 'Blockchain Summit 2024',
    date: 'December 15, 2024',
    location: 'London, UK',
    description: 'Explore how blockchain is transforming industries at the 2024 Blockchain Summit. Learn from top innovators and connect with industry pioneers.',
    image: 'https://i.ibb.co/ZHC0MpV/IITM-homepage-491578404.jpg',
  },
];

const page = () => {
  return (
    <div className="rounded-xl py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-600 mb-10">
          Latest Events
        </h2>

        {/* Event Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Event Image */}
              <Image width={400} height={400}
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* Event Title */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>

                {/* Event Date & Location */}
                <div className="flex items-center text-gray-600 mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{event.location}</span>
                </div>

                {/* Event Description */}
                <p className="text-gray-600 mb-4">{event.description}</p>

                {/* Learn More Button */}
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
