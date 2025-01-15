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
        {/* Header Section */}
        <div className="py-6 px-8 bg-white text-black text-center">
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-sm mt-1">Overview of your payment transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="bg-white p-4 rounded-lg flex items-center border border-black">
            <div>
              <h3 className="text-xl font-semibold text-black">Total Payments</h3>
              <p className="text-lg font-bold text-black">{histories?.length || 0}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex items-center border border-black">
            <div>
              <h3 className="text-xl font-semibold text-black">Total Spent</h3>
              <p className="text-lg font-bold text-black">
                ${histories
                  ?.reduce((total, doc) => total + (doc.membersShip.package.price || 0), 0)
                  .toFixed(2) || 0}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg flex items-center border border-black">
            <div>
              <h3 className="text-xl font-semibold text-black">Next Expiry</h3>
              <p className="text-lg font-bold text-black">
                {histories?.[0]?.membersShip?.exp
                  ? new Date(histories[0]?.membersShip?.exp).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto p-6">
          <table className="min-w-full text-sm text-black">
            <thead className="bg-white text-black border-b">
              <tr className="text-left font-semibold text-[13px] md:text-sm uppercase">
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
                    <PulseLoader color="#000" size={13} aria-label="Loading Spinner" speedMultiplier={0.7} />
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
                  <td className="px-6 py-4 border-r text-black">{doc.userInfo.name}</td>
                  <td className="px-6 py-4 border-r text-black">{doc.email}</td>
                  <td className="px-6 py-4 border-r text-black font-semibold">
                    {doc.membersShip.package.name}
                  </td>
                  <td className="px-6 py-4 border-r text-black">
                    ${doc.membersShip.package.price}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {new Date(doc.membersShip.exp).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {!isLoading && !histories?.length && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-black">
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
