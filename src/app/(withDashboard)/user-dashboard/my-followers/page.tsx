'use client';

import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/redux/features/authentication/authSlice';
import { useGetSingleUserQuery } from '@/redux/features/user/userApi';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const fetchUserById = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
};

const MyFollowers = () => {
  const loggedUser = useAppSelector(state => state.auth.user);
  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const userDetails: TUser = data?.data || {};
  const { followers = [], following = [] } = userDetails;

  const [fullFollowers, setFullFollowers] = useState<any[]>([]);
  const [fullFollowing, setFullFollowing] = useState<any[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (followers.length > 0) {
        const fetchedFollowers = await Promise.all(
          followers.map(async (id: string) => await fetchUserById(id))
        );
        setFullFollowers(fetchedFollowers);
      }
    };

    const fetchFollowing = async () => {
      if (following.length > 0) {
        const fetchedFollowing = await Promise.all(
          following.map(async (id: string) => await fetchUserById(id))
        );
        setFullFollowing(fetchedFollowing);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, [followers, following]);

  return (
    <section className="max-w-[1300px] mx-auto px-4 my-4 lg:my-8">
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="py-6 px-8 bg-gradient-to-r from-black to-gray-800 text-white text-center">
          <h2 className="text-2xl font-bold">User Dashboard</h2>
          <p className="text-sm mt-1">Manage your followers and following</p>
        </div>

        {/* Followers Table */}
        <div className="p-6 bg-white">
          <h3 className="text-xl font-semibold flex items-center mb-4 text-gray-800">
            <FaUserFriends className="mr-2 text-gray-800" />
            Followers
          </h3>
          <p className="text-gray-500 mb-4">Total Followers: {fullFollowers.length}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-gray-100 border-b">
                <tr className="text-left font-semibold text-[13px] md:text-sm uppercase text-gray-600">
                  <th className="px-6 py-4 border-r">Image</th>
                  <th className="px-6 py-4 border-r">Name</th>
                  <th className="px-6 py-4">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {fullFollowers.map((follower: any) => (
                  <tr key={follower._id} className="border-b hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 border-r flex justify-center items-center">
                      <Image
                        width={40}
                        height={40}
                        alt="profile"
                        src={follower.image}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 border-r text-gray-800">{follower.name}</td>
                    <td className="px-6 py-4 text-gray-800">{follower.email}</td>
                  </tr>
                ))}
                {fullFollowers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-500">
                      No Followers Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Following Table */}
        <div className="p-6 bg-white mt-4">
          <h3 className="text-xl font-semibold flex items-center mb-4 text-gray-800">
            <FaUserPlus className="mr-2" />
            Following
          </h3>
          <p className="text-gray-500 mb-4">Total Following: {fullFollowing.length}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-gray-100 border-b">
                <tr className="text-left font-semibold text-[13px] md:text-sm uppercase text-gray-600">
                  <th className="px-6 py-4 border-r">Image</th>
                  <th className="px-6 py-4 border-r">Name</th>
                  <th className="px-6 py-4">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {fullFollowing.map((followedUser: any) => (
                  <tr key={followedUser._id} className="border-b hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 border-r flex justify-center items-center">
                      <Image
                        width={40}
                        height={40}
                        alt="profile"
                        src={followedUser.image}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 border-r text-gray-800">{followedUser.name}</td>
                    <td className="px-6 py-4 text-gray-800">{followedUser.email}</td>
                  </tr>
                ))}
                {fullFollowing.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-500">
                      Not Following Anyone Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFollowers;
