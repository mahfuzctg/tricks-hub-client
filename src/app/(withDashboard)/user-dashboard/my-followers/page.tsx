'use client';

import { useAppSelector } from '@/redux/hooks';
import { useGetSingleUserQuery } from '@/redux/features/user/userApi';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import Image from 'next/image';

const MyFollowers = () => {
  const loggedUser = useAppSelector((state) => state.auth.user);
  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const { followers = [], following = [] } = data?.data || {};

  const renderTable = (title, icon, users) => (
    <div className="bg-white  rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-semibold flex items-center mb-4 text-gray-700">
        {icon} {title}
      </h2>
      <p className="text-gray-700 mb-4">Total: {users.length}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border border-gray-300">Image</th>
              <th className="p-4 border border-gray-300">Name</th>
              <th className="p-4 border border-gray-300">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?._id} className="hover:bg-gray-100">
                <td className="p-4 border border-gray-300">
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </td>
                <td className="p-4 border border-gray-300">{user?.name}</td>
                <td className="p-4 border border-gray-300">{user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="py-6 px-8  text-black text-center rounded-xl  my-4">
        <h2 className="text-3xl font-semibold">Followers & Following</h2>
        <p className="text-sm mt-2">
          View the people who follow you and those you follow to stay updated.
        </p>
      </div>

      {renderTable('Followers', <FaUserFriends className="mr-2" />, followers)}
      {renderTable('Following', <FaUserPlus className="mr-2" />, following)}
    </div>
  );
};

export default MyFollowers;
