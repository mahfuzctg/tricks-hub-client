'use client'

import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useState } from 'react';
import { FaVideo, FaCamera, FaSmile, FaPen, FaEllipsisH } from 'react-icons/fa';
import CreatePostModal from './CreatePostModal';

export default function CreatePost() {
  const user = useAppSelector(state => state.auth.user)
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto">

      {/* Create Post Modal  */}
      {openModal && <CreatePostModal open={openModal} setOpen={setOpenModal} />}

      {/* Header Section */}
      <div className="flex items-center mb-4">
        <FaPen className="text-gray-600 md:text-2xl" />
        <h2 className="ml-2 text-lg font-semibold text-gray-500">What’s on your mind?</h2>
      </div>

      {/* Input Section */}
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src={user?.image || ''}
          alt="Avatar"
          height={40}
          width={40}
          className="rounded-full object-cover"
        />
        <button
          onClick={() => setOpenModal(true)}
          className="flex-1 p-3 border border-gray-300 rounded-md text-left text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        >
          Share your thoughts... 📝
        </button>
      </div>

      {/* Action Buttons Section */}
      <div className="flex justify-between items-center text-xs md:text-sm text-gray-600">

        {/* Live Video Button */}
        <button className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
          <FaVideo className="text-lg md:text-xl" />
          <span>🎥 Live Video</span>
        </button>

        {/* Photo/Video Button */}
        <button className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
          <FaCamera className="text-lg md:text-xl" />
          <span>📸 Photo/Video</span>
        </button>

        {/* Feeling/Activity Button */}
        <button className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200">
          <FaSmile className="text-lg md:text-xl" />
          <span>😊 Feeling/Activity</span>
        </button>

        {/* More Options Button */}
        <button className="hidden md:block text-gray-500 hover:bg-gray-100 p-2 rounded-lg">
          <FaEllipsisH className="text-lg md:text-xl" />
        </button>
      </div>
    </div>
  );
}
