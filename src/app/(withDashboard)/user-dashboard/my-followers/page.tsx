'use client'


import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/redux/features/authentication/authSlice';
import { useGetSingleUserQuery } from '@/redux/features/user/userApi';
import Image from 'next/image';

const MyFollowers = () => {
  const loggedUser = useAppSelector((state) => state.auth.user);
  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const userDetails: TUser = data?.data || {};
  const { followers, following } = userDetails;

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="py-6 px-8 bg-gray-800 text-white text-center rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold">Followers & Following</h2>
        <p className="text-sm mt-2">
          View the people following you and the accounts you're following.
        </p>
      </div>

      {/* Followers Section */}
      <div className="bg-white shadow-md rounded-md p-6 my-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Followers</h2>
        <p className="text-gray-600 mb-4">Total Followers: {followers?.length}</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 border border-gray-300">Image</th>
                <th className="p-4 border border-gray-300">Name</th>
                <th className="p-4 border border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {followers?.map((follower) => (
                <tr
                  key={follower?._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 border border-gray-300">
                    <Image
                      src={follower?.image}
                      alt={follower?.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">{follower?.name}</td>
                  <td className="p-4 border border-gray-300">{follower?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Following Section */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Following</h2>
        <p className="text-gray-600 mb-4">Total Following: {following?.length}</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 border border-gray-300">Image</th>
                <th className="p-4 border border-gray-300">Name</th>
                <th className="p-4 border border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {following?.map((followedUser) => (
                <tr
                  key={followedUser?._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 border border-gray-300">
                    <Image
                      src={followedUser?.image}
                      alt={followedUser?.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">
                    {followedUser?.name}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {followedUser?.email}
                  </td>
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
