'use client'

import { useState } from "react";
import PaymentModal from "./components/PaymentModal";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const membershipPackages = [
  {
    name: "Tech Explorer",
    price: 15,
    description: "Get started with the latest tech trends and tools.",
    features: [
      "Weekly Tech Updates",
      "Access to Beginner Resources",
      "Limited Webinars"
    ],
    color: "black",
    bgColor: '#F3F4F6',
    emoji: "🚀"
  },
  {
    name: "Digital Marketer Pro",
    price: 40,
    description: "Unlock resources for mastering digital marketing techniques.",
    features: [
      "SEO Guides",
      "Social Media Strategies",
      "Content Marketing Tools",
      "Exclusive Marketing Webinars"
    ],
    color: "gray-800",
    bgColor: '#F3F4F6',
    emoji: "📈"
  },
  {
    name: "Startup Accelerator",
    price: 70,
    description: "For budding entrepreneurs looking to launch their startups.",
    features: [
      "Startup Resources",
      "Pitch Deck Templates",
      "Investor Connections",
      "Startup Legal Advice"
    ],
    color: "black",
    bgColor: '#F3F4F6',
    emoji: "💡"
  },
  {
    name: "Cybersecurity Essentials",
    price: 25,
    description: "Learn the fundamentals of cybersecurity to protect your assets.",
    features: [
      "Cybersecurity Basics",
      "Phishing Prevention",
      "Malware Protection",
      "Online Safety Tools"
    ],
    color: "black",
    bgColor: '#F3F4F6',
    emoji: "🔐"
  },
  {
    name: "Data Science Fundamentals",
    price: 60,
    description: "Learn the basics of data science, analytics, and visualization.",
    features: [
      "Data Analysis Tools",
      "Data Visualization Resources",
      "Intro to Machine Learning",
      "Data Science Challenges"
    ],
    color: "gray-800",
    bgColor: '#F3F4F6',
    emoji: "📊"
  },
  {
    name: "Mobile App Development",
    price: 45,
    description: "Get resources for building iOS and Android apps from scratch.",
    features: [
      "App Development Tutorials",
      "UI/UX Design Basics",
      "Access to Developer Tools",
      "Mobile App Deployment Resources"
    ],
    color: "black",
    bgColor: '#F3F4F6',
    emoji: "📱"
  },
  {
    name: "Game Developer Pro",
    price: 80,
    description: "Master game development with in-depth tutorials and tools.",
    features: [
      "Game Development Guides",
      "Game Design Fundamentals",
      "Unity and Unreal Engine Tutorials",
      "Exclusive Game Developer Events"
    ],
    color: "gray-800",
    bgColor: '#F3F4F6',
    emoji: "🎮"
  },
  {
    name: "Cloud Computing Expert",
    price: 90,
    description: "Become a cloud computing expert with resources for AWS, Azure, and more.",
    features: [
      "Cloud Architecture Tutorials",
      "AWS and Azure Certification Prep",
      "Cloud Security Best Practices",
      "Hands-on Labs"
    ],
    color: "black",
    bgColor: '#F3F4F6',
    emoji: "☁️"
  }
];

const Membership = () => {
  const [openPayModal, setOpenPayModal] = useState<boolean>(false);
  const [membersShip, setMembersShip] = useState();
  const loggedUser = useAppSelector(state => state.auth.user);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Payment Modal */}
      {openPayModal && <PaymentModal membersShip={membersShip} open={openPayModal} setOpen={setOpenPayModal} />}

      <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-300 mb-8 text-center">
        Choose Your Membership Plan
      </h1>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
        {membershipPackages.map((pack, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 ease-in-out"
            style={{
              backgroundColor: pack.bgColor,
            }}
          >
            <div className="text-center mb-4">
              <h2 className={`text-2xl font-semibold text-${pack.color}`}>
                {pack.emoji} {pack.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{pack.description}</p>
            </div>

            <div className="text-center my-6">
              <span className={`text-4xl font-bold text-${pack.color}`}>${pack.price}</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>

            <ul className="text-gray-600 dark:text-gray-400 mb-6">
              {pack.features.map((feature, idx) => (
                <li key={idx} className="mb-2 flex items-center">
                  <i className="fas fa-check-circle text-gray-800 mr-2"></i> {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                if (!loggedUser) return router.push('/login');
                setMembersShip(pack);
                setOpenPayModal(true);
              }}
              className="w-full py-2 px-4 text-white rounded-md mt-auto hover:bg-opacity-90 transition-colors ease-in-out"
              style={{ backgroundColor: '#4B5563' }} 
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
