'use client'

import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { useGetPaymentHistoriesQuery } from "@/redux/features/payment/paymentApi";
import { useAppSelector } from "@/redux/hooks";

// Define the type for the payment history object
interface TUserInfo {
  image: string;
  name: string;
}

interface TPackage {
  name: string;
  price: number;
}

interface TMembership {
  package: TPackage;
  exp: string;
}

interface TPayment {
  _id: string;
  email: string;
  userInfo: TUserInfo;
  membersShip: TMembership;
}

export default function PaymentHistory() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetPaymentHistoriesQuery(currentUser?.email as string);
  const histories: TPayment[] = data?.data || [];

  return (
    <section className="max-w-[1300px] mx-auto px-4 my-4 lg:my-8">
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section with Gradient */}
        <div className="py-6 px-8 bg-gradient-to-r from-blue-600 to-indigo-800 text-white text-center">
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-sm mt-1">Overview of your payment transactions</p>
        </div>

        {/* Summary Cards with Gradient Background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4 rounded-lg flex items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Total Payments</h3>
              <p className="text-lg font-bold text-white">{histories?.length || 0}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 p-4 rounded-lg flex items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Total Spent</h3>
              <p className="text-lg font-bold text-white">
                ${histories
                  ?.reduce((total, doc) => total + (doc.membersShip.package.price || 0), 0)
                  .toFixed(2) || 0}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-600 p-4 rounded-lg flex items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Next Expiry</h3>
              <p className="text-lg font-bold text-white">
                {histories?.[0]?.membersShip?.exp
                  ? new Date(histories[0]?.membersShip?.exp).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto p-6">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-b">
              <tr className="text-white text-left font-semibold text-[13px] md:text-sm uppercase">
                <th scope="col" className="px-6 py-4 border-r">Image</th>
                <th scope="col" className="px-6 py-4 border-r">Name</th>
                <th scope="col" className="px-6 py-4 border-r">Email</th>
                <th scope="col" className="px-6 py-4 border-r">Package</th>
                <th scope="col" className="px-6 py-4 border-r">Total</th>
                <th scope="col" className="px-6 py-4">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-10 text-center">
                    <PulseLoader color="#2563EB" size={13} aria-label="Loading Spinner" speedMultiplier={0.7} />
                  </td>
                </tr>
              )}

              {histories?.map((doc) => (
                <tr key={doc._id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 border-r flex justify-center items-center">
                    <Image
                      width={40}
                      height={40}
                      alt="profile"
                      src={doc.userInfo.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 border-r text-gray-800">{doc.userInfo.name}</td>
                  <td className="px-6 py-4 border-r text-gray-800">{doc.email}</td>
                  <td className="px-6 py-4 border-r text-green-500 font-semibold">
                    {doc.membersShip.package.name}
                  </td>
                  <td className="px-6 py-4 border-r text-gray-800">
                    ${doc.membersShip.package.price}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(doc.membersShip.exp).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {!isLoading && !histories?.length && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    No Payments Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
