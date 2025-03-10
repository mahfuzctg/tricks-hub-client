'use client';

import { useState } from 'react';
import PaymentModal from './components/PaymentModal';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const membershipPackages = [
  
  {
    name: 'Tech Explorer',
    price: 15,
    description: 'Get started with the latest tech trends and tools.',
    features: [
      'Weekly Tech Updates',
      'Access to Beginner Resources',
      'Limited Webinars'
    ],
    gradient: 'from-blue-500 to-blue-400'
  },
  {
    name: 'Digital Marketer Pro',
    price: 40,
    description: 'Unlock resources for mastering digital marketing techniques.',
    features: [
      'SEO Guides',
      'Social Media Strategies',
      'Content Marketing Tools',
      'Exclusive Marketing Webinars'
    ],
    gradient: 'from-purple-500 to-purple-400'
  },
  {
    name: 'Startup Accelerator',
    price: 70,
    description: 'For budding entrepreneurs looking to launch their startups.',
    features: [
      'Startup Resources',
      'Pitch Deck Templates',
      'Investor Connections',
      'Startup Legal Advice'
    ],
    gradient: 'from-pink-500 to-pink-400'
  },
  {
    name: 'Cyber Security Pro',
    price: 90,
    description: 'Enhance your cybersecurity skills and protect digital assets.',
    features: [
      'Ethical Hacking Tutorials',
      'Cyber Threat Analysis',
      'Penetration Testing Tools',
      'Security Certifications Guide'
    ],
    gradient: 'from-blue-600 to-blue-500'
  },
  {
    name: 'Marketing Guru',
    price: 65,
    description: 'Master digital marketing strategies for business growth.',
    features: [
      'SEO & SEM Mastery',
      'Social Media Marketing',
      'Email Marketing Techniques',
      'Analytics & Conversion Optimization'
    ],
    gradient: 'from-green-500 to-green-400'
  },
  {
    name: 'Game Developer Pro',
    price: 80,
    description: 'Build and design your dream games with expert guidance.',
    features: [
      'Unity & Unreal Engine Courses',
      'Game Art & Animation',
      'Multiplayer Game Development',
      'Monetization Strategies'
    ],
    gradient: 'from-purple-500 to-purple-400'
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

      <h1 className=" text-lg md:text:2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-300 mb-8 text-center">
        Choose Your Membership Plan
      </h1>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        {membershipPackages.map((pack, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border border-gray-200"
          >
            <div className={`absolute top-0 left-0 w-full h-10 bg-gradient-to-r ${pack.gradient} text-white text-center font-bold text-lg flex items-center justify-center`}>
              ${pack.price} / month
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">{pack.name}</h2>
              <p className="text-gray-600  dark:text-gray-400 mt-2">{pack.description}</p>
            </div>

            <ul className="text-gray-600 text-sm dark:text-gray-400 mt-6 space-y-2">
              {pack.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className='text-green-500'>✅</span> {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                if (!loggedUser) return router.push('/login');
                setMembersShip(pack);
                setOpenPayModal(true);
              }}
              className={`w-full py-3 mt-6 text-white rounded-lg bg-gradient-to-r ${pack.gradient} hover:opacity-90 transition-all`}
            >
              Purchase Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
