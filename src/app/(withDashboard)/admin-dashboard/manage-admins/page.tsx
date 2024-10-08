'use client'

import { useState } from "react"
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";
import { MdOutlineBlock } from "react-icons/md";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import UpdateUserModal from "../components/UpdateUserModal";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TUser } from "@/redux/features/authentication/authSlice";
import Image from "next/image";


export default function ManageAdmins() {
  
    const [openUpdateModal, setOpenUpdateModal ] = useState<boolean>(false);
    const { data, isLoading } = useGetUsersQuery({role : 'admin'});
    const [ updateUser ] = useUpdateUserMutation();
    const [ deleteUserFromDB ] = useDeleteUserMutation();
    const [updateUserEmail, setUpdateUserEmail ] = useState('')

    const users: TUser[] = data?.data || []


    // update a user
    const updateUserInfo = (userId: string, action: string) => {

      if(action === 'block'){

        Swal.fire({
          title: "Are you sure?",
          text: "Are you going to block this Admin?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes Block!"
        
        }).then( async (result) => {
          if (result.isConfirmed) {
           const response = await updateUser({ userId , payload: { isBlocked : true}}).unwrap()
           if(response.success){
            Swal.fire({
              title: "Blocked!",
              text: "The Admin has been Blocked.",
              icon: "success"
            });
           }
        
          }
        });

      }
      
      else if(action === 'activate'){
        Swal.fire({
          title: "Are you sure?",
          text: "Are you going to activate this Admin?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Activate!"
        
        }).then( async (result) => {
          if (result.isConfirmed) {
           const response = await updateUser({ userId , payload: { isBlocked : false}}).unwrap()
           if(response.success){
            Swal.fire({
              title: "Activated!",
              text: "Admin has been Activated.",
              icon: "success"
            });
           }
        
          }
        });

      }
    }


    // delete a admin
    const deleteUser = (userId: string) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Are you going to delete this Admin?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes Delete!"
        
        }).then( async (result) => {
          if (result.isConfirmed) {
           const response = await deleteUserFromDB( userId ).unwrap()
           if(response.success){
            Swal.fire({
              title: "Deleted!",
              text: "Admin has been deleted.",
              icon: "success"
            });
           }
        
          }
        });
    }

  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt"> 


   <div className="text-right mb-7">

   {/* update admin modal  */}
   {openUpdateModal && <UpdateUserModal userEmail={updateUserEmail} open={openUpdateModal} setOpen={setOpenUpdateModal}/>}
    
   </div>


<div className="flex flex-col ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-center text-sm inter-regular dark:border-neutral-500">
          <thead className="">
            <tr className="bg-gray-200 h-10 text-gray-500 text-[12px] md:text-base ">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300 rounded-l-lg">
               Image
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
           Role
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-gray-300">
           Action
              </th>
             
              
              <th scope="col" className="px-6 py-0 md:py-2 lg:py-4 border-zinc-600 "> Action </th>

              <th scope="col" className="px-6 py-0 md:py-2 lg:py-4 border-zinc-600 rounded-r-lg"> Action </th>
            
             
            </tr>
          </thead>
          <tbody className="relative">

          {isLoading && <PulseLoader
           color='#2563EB'
          className="absolute top-14 left-2/4"
           size={13}
           aria-label="Loading Spinner"
           speedMultiplier={0.7} />}
        

          {users?.map(user =>  <tr key={user._id} className="border-b ">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-300 flex items-center justify-center">
                <Image
                width={200}
                height={200}
                alt='profile'
                 src={user.image} className="size-9 md:size-12  object-contain rounded-3xl" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-gray-300">
                {user.name}
              </td>

              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-gray-300">
                {user.email}
              </td>

              <td
                className="whitespace-nowrap font-medium text-blue-600/70 text-sm md:text-lg border-r px-6 py-4 border-gray-300">
                {user.role}
              </td>
             
              
              
              <td className="whitespace-nowrap font-medium border-r text-sm md:text-lg  px-6 py-4 border-gray-300">
             
              <button className={`bg-blue-400 p-1 px-2 md:py-2  text-white rounded font-semibold transition-all hover:bg-blue-400 text-[12px] md:text-base `}
             onClick={() => {
              setUpdateUserEmail(user.email!)
              setOpenUpdateModal(true)
              }} > 
            <MdModeEdit/></button>
    
               </td>

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg  px-6 py-4 border-gray-300">

             {/* block / active user */}

             {user.isBlocked? <button className={`bg-purple-800/80 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-purple-900 text-sm `}
             onClick={() => updateUserInfo(user._id!, 'activate')} > 
             Activate</button> 
             :  
             <button className={`text-red-600 p-2 rounded font-semibold transition-all hover:text-red-700 text-xl flex items-center gap-1 mx-auto`}
             onClick={() => updateUserInfo(user._id!, 'block')} > 
             <MdOutlineBlock/> </button>}
    
               </td>

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg  px-6 py-4 border-gray-300">

             {/* delete */}

             <button className={`text-red-600  rounded font-semibold transition-all hover:text-red-700 text-2xl flex items-center gap-1 mx-auto`}
             onClick={() => deleteUser(user._id!)} > 
             <RiDeleteBack2Line/> </button>
    
               </td>
            
            </tr>)}
         
          </tbody>
        </table>
        {!users?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Users Yet </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

