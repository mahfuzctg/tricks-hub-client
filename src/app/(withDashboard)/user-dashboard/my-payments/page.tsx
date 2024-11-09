/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { useGetPaymentHistoriesQuery } from "@/redux/features/payment/paymentApi";
import { TPayment } from "../../admin-dashboard/payment-history/page";
import { useAppSelector } from "@/redux/hooks";

export default function PaymentHistory() {
    const currentUser = useAppSelector(state => state.auth.user)
    const { data, isLoading } = useGetPaymentHistoriesQuery(currentUser?.email as string);
    const histories: TPayment[] = data?.data || []

  return (
    <section className="max-w-[1300px] mx-auto px-4 my-4 lg:my-8">
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="py-6 px-8 bg-gradient-to-r from-black to-gray-800 text-white text-center">
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-sm mt-1">Overview of your payment transactions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-600 text-left font-semibold text-[13px] md:text-sm uppercase">
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

              {histories?.map((doc: any) => (
                <tr key={doc._id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 border-r flex justify-center items-center">
                    <Image
                      width={40}
                      height={40}
                      alt="profile"
                      src={doc?.userInfo?.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 border-r text-gray-800">{doc?.userInfo?.name}</td>
                  <td className="px-6 py-4 border-r text-gray-800">{doc?.email}</td>
                  <td className="px-6 py-4 border-r text-green-500 font-semibold">{doc?.membersShip?.package?.name}</td>
                  <td className="px-6 py-4 border-r text-gray-800">${doc?.membersShip?.package?.price}</td>
                  <td className="px-6 py-4 text-gray-800">{new Date(doc?.membersShip?.exp).toLocaleDateString()}</td>
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
