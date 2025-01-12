/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PulseLoader } from "react-spinners";
import Image from "next/image";
import { useGetPaymentHistoriesQuery } from "@/redux/features/payment/paymentApi";
import { TUser } from "@/redux/features/authentication/authSlice";


export type TPayment = {
    _id : string;
    email: string;
    cost: number,
    membersShip : {
    package : object;
    takenDate : string;
    userInfo : TUser;
    exp : string ,
    _id: string;

    email: string;
  
},
    transactionId : string
}


export default function  PaymentHistory() {
    const { data, isLoading } = useGetPaymentHistoriesQuery("");
    const histories : TPayment[] = data?.data || []

  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 


<div className="flex flex-col ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-center text-sm inter-regular dark:border-neutral-500">
          <thead className="">
            <tr className="bg-gray-200 h-8 text-gray-500 text-[12px] md:text-base ">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300 rounded-l-lg">
               Img
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300">
              Name
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300">
            Email
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300">
           Package
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300">
          Total
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300">
          Expiry Date
              </th>
             
             
            
            </tr>
          </thead>
          <tbody className="relative">

          {isLoading && <PulseLoader
           color='#2563EB'
          className="absolute top-14 left-2/4"
           size={13}
           aria-label="Loading Spinner"
           speedMultiplier={0.7} />}
        

          {histories?.map((doc : any) =>  <tr key={doc._id} className="border-b ">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300 flex items-center justify-center">
                <Image
                width={200}
                height={200}
                alt='profile'
                 src={doc?.userInfo?.image} className="size-9 md:size-12  object-contain rounded-3xl" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-gray-300">
                {doc?.userInfo?.name}
              </td>

              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-gray-300">
                {doc?.email}
              </td>

              <td
                className="whitespace-nowrap font-medium text-orange-500 text-sm md:text-lg border-r px-6 py-4 border-gray-300">
                {doc?.membersShip?.package?.name}
              </td>
              <td
                className="whitespace-nowrap font-medium text-zinc-400 text-sm md:text-lg border-r px-6 py-4 border-gray-300">
                {doc?.membersShip?.package?.price}$
              </td>

              <td
                className="whitespace-nowrap font-medium text-zinc-400 text-sm md:text-lg border-r px-6 py-4 border-gray-300">
                {new Date(doc?.membersShip?.exp).toLocaleDateString()}
              </td>
            </tr>)}
         
          </tbody>
        </table>
        {!histories?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Payments Yet </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

