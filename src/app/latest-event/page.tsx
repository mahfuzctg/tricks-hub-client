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
    id: 4,
    title: 'Cybersecurity Workshop',
    date: 'January 5, 2025',
    location: 'Austin, TX',
    description: 'Hands-on workshop focused on cybersecurity essentials. Perfect for tech professionals and enthusiasts alike.',
    image: 'https://i.postimg.cc/bvMLs9Pk/images.jpg',
  },
  {
    id: 5,
    title: 'Green Tech Expo',
    date: 'March 22, 2025',
    location: 'Berlin, Germany',
    description: 'Showcasing sustainable tech advancements and the latest in green innovation.',
    image: 'https://i.postimg.cc/Vv9FZyCW/1703830475957.png',
  },
  {
    id: 6,
    title: 'Quantum Computing Summit',
    date: 'April 14, 2025',
    location: 'Tokyo, Japan',
    description: 'Dive into the future of computing with sessions led by quantum computing experts.',
    image: 'https://i.postimg.cc/CKmxrG07/Quantum-computing.jpg',
  },
  {
    id: 7,
    title: 'Global Fintech Forum',
    date: 'May 18, 2025',
    location: 'Singapore',
    description: 'Discuss the future of financial technology and network with global fintech leaders.',
    image: 'https://i.postimg.cc/NGWmxcpM/Fintech-Weekly-Newsletter-Global-Fintech-Pulse-481-min.png',
  },
  {
    id: 8,
    title: 'HealthTech Innovations Summit',
    date: 'June 25, 2025',
    location: 'Boston, MA',
    description: 'A summit dedicated to the latest breakthroughs in health technology, featuring talks by medical experts and tech innovators.',
    image: 'https://i.postimg.cc/52JzZmcW/Duncan-how-patient-care-is-evolving-with-interactive-interface-7bcfeb85-3782-4b3b-8479-da2b8f8cb5c0.png',
  },
  {
    id: 9,
    title: 'EdTech Global Conference',
    date: 'August 30, 2025',
    location: 'Sydney, Australia',
    description: 'Connect with educators, developers, and leaders in EdTech to explore the future of technology in education.',
    image: 'https://i.postimg.cc/wBTmBTTW/Mar2019-blog-Edtech.png',
  },
  {
    id: 10,
    title: 'Climate Action Forum 2025',
    date: 'September 15, 2025',
    location: 'Paris, France',
    description: 'Join climate activists, policymakers, and innovators in a forum on sustainable solutions and environmental action.',
    image: 'https://i.postimg.cc/HsD8ytk8/605ed905b5247cd273d4e53ef2d32142e830d31f-13-goal-resources.png',
  },
  
];

const EventsPage = () => {
  return (
    <div className="rounded-xl py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Latest Events
        </h2>

        {/* Event Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              {/* Event Image */}
              <Image
                width={400}
                height={400}
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* Event Title */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {event.title}
                </h3>

                {/* Event Date & Location */}
                <div className="flex items-center text-gray-600 mb-2">
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
                <button className=" text-gray-800 py-2  rounded-lg  transition-colors duration-300">
                Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
