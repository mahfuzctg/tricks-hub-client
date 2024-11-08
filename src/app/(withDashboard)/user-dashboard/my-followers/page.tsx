'use client';

import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/redux/features/authentication/authSlice';
import { useGetSingleUserQuery } from '@/redux/features/user/userApi';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Assuming you have a function to fetch user details by ID
const fetchUserById = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`); // Adjust API endpoint as necessary
  const data = await response.json();
  return data; // Returning user details as FollowerType
};

const MyFollowers = () => {
  const loggedUser = useAppSelector(state => state.auth.user);

  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const userDetails: TUser = data?.data || {};

  const { followers = [], following = [] } = userDetails;

  // State to store full user details for followers and following
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* Followers Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-4">
        <h2 className="text-2xl font-semibold flex items-center mb-4">
          <FaUserFriends className="mr-2" />
          Followers
        </h2>
        <p className="text-blue-500">Total Followers: {fullFollowers.length}</p>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border border-gray-300">Image</th>
                <th className="p-4 border border-gray-300">Name</th>
                <th className="p-4 border border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {fullFollowers.map((follower: any) => (
                <tr key={follower._id} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">
                    <Image
                      src={follower.image}
                      alt={follower.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">{follower.name}</td>
                  <td className="p-4 border border-gray-300">{follower.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Following Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold flex items-center mb-4">
          <FaUserPlus className="mr-2" />
          Following
        </h2>
        <p className="text-blue-500">Total Following: {fullFollowing.length}</p>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border border-gray-300">Image</th>
                <th className="p-4 border border-gray-300">Name</th>
                <th className="p-4 border border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {fullFollowing.map((followedUser: any) => (
                <tr key={followedUser._id} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-300">
                    <Image
                      src={followedUser.image}
                      alt={followedUser.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">{followedUser.name}</td>
                  <td className="p-4 border border-gray-300">{followedUser.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFollowers;
