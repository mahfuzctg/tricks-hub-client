'use client'

import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/redux/features/authentication/authSlice';
import { useGetSingleUserQuery } from '@/redux/features/user/userApi';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa'; // Import icons
import Image from 'next/image';

const MyFollowers = () => {
    const loggedUser = useAppSelector(state => state.auth.user);

    const { data } = useGetSingleUserQuery(loggedUser?.email as string);
    const userDetails: TUser = data?.data || {};
    const { followers, following } = userDetails;

    return (
        <div className="container mx-auto p-4">
            {/* Header Section with Gradient */}
            <div className="py-6 px-8 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white text-center rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold">Followers & Following</h2>
                <p className="text-sm mt-2">People following you to stay updated, and Following: Accounts you follow for their updates.</p>
            </div>

            {/* Followers Table with Gradient Background */}
            <div className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-800 dark:to-teal-700 shadow-md rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-semibold flex items-center mb-4 text-blue-700 dark:text-teal-200">
                    <FaUserFriends className="mr-2" />
                    Followers
                </h2>
                <p className="text-blue-500">Total Followers: {followers?.length}</p>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gradient-to-r from-teal-200 to-blue-200 dark:from-teal-600 dark:to-blue-600">
                                <th className="p-4 border border-gray-300 dark:border-gray-700">Image</th>
                                <th className="p-4 border border-gray-300 dark:border-gray-700">Name</th>
                                <th className="p-4 border border-gray-300 dark:border-gray-700">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {followers?.map((follower) => (
                                <tr key={follower?._id} className="hover:bg-gray-50 hover:dark:bg-gray-900">
                                    <td className="p-4 border border-gray-300 dark:border-gray-700">
                                        <Image
                                            src={follower?.image}
                                            alt={follower?.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    </td>
                                    <td className="p-4 border border-gray-300 dark:border-gray-700">{follower?.name}</td>
                                    <td className="p-4 border border-gray-300 dark:border-gray-700">{follower?.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Following Table with Gradient Background */}
            <div className="bg-gradient-to-r from-pink-100 to-yellow-100 dark:from-pink-800 dark:to-yellow-700 shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-semibold flex items-center mb-4 text-pink-700 dark:text-yellow-200">
                    <FaUserPlus className="mr-2" />
                    Following
                </h2>
                <p className="text-pink-500">Total Following: {following?.length}</p>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gradient-to-r from-yellow-200 to-pink-200 dark:from-yellow-600 dark:to-pink-600">
                                <th className="p-4 border border-gray-300 dark:border-gray-700">Image</th>
                                <th className="p-4 border border-gray-300 dark:border-gray-700">Name</th>
                                <th className="p-4 border border-gray-300 dark:border-gray-700">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {following?.map((followedUser) => (
                                <tr key={followedUser?._id} className="hover:bg-gray-50 hover:dark:bg-gray-900">
                                    <td className="p-4 border border-gray-300 dark:border-gray-700">
                                        <Image
                                            src={followedUser?.image}
                                            alt={followedUser?.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    </td>
                                    <td className="p-4 border border-gray-300 dark:border-gray-700">{followedUser?.name}</td>
                                    <td className="p-4 border border-gray-300 dark:border-gray-700">{followedUser?.email}</td>
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
