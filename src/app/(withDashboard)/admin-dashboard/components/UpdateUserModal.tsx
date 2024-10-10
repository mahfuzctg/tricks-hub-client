/* eslint-disable @typescript-eslint/no-explicit-any */

import {useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useEffect } from "react";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/redux/features/authentication/authSlice";
import Image from "next/image";



type TModalProps = {
    userEmail : string,
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}


export default function UpdateUserModal({ open, setOpen, userEmail} : TModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const [ updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const { data, isLoading: dataLoading , isSuccess} = useGetSingleUserQuery(userEmail);
  const user : TUser = data?.data;



    // Set the default values dynamically
    useEffect(() => {
      if(isSuccess){
        reset({
          name : user.name,
        email : user.email,
        role : user.role,
        image : user.image,
        });
      }
    }, [reset, user, isSuccess]);


  const onSubmit = async (data: any) => {
    
    const userData : Partial<TUser> = {
    name : data.name,
     email : data.email,
     role : data.role,
     image : data.image,
    }

  try {
    const response =  await updateUser({
      userId : user._id!,
      payload : userData,
    }).unwrap();

  if(response?.success){
    // close the modal 
    setOpen(false)
    // show a toast 
    toast.success('User updated successfully')
  }
  }catch(error){
    toast.error('Something went wrong')
    console.log(error)
  }
 
  }
  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">  
       
       <form className="w-[400px] md:w-[530px] p-7 bg-white rounded-xl relative" onSubmit={handleSubmit(onSubmit)}>

        {/* loading white layer  */}
      {dataLoading || updateLoading? <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#2563EB'
          //  loading={dataLoading || updateLoading}
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div> : ""}

        <div className="">
            <Image 
            width={300}
            height={300}
            alt="profile"
             src={user?.image} className="size-24 object-cover rounded-xl mx-auto" />
        </div>


        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Name</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm"  {...register("name")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Email</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm"  {...register("email")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Role</label>
         <select className="w-full outline p-2 mt-3 outline-black/20 rounded-sm outline-1 text-xs md:text-sm " {...register("role")} >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
              
        </select>

        </div>


        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Profile Image</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("image")} />
        </div>


<button type="submit" className="px-8 text-sm lg:text-base mt-6 mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-blue-600 hover:bg-blue-700 ">Modify</button>

<button onClick={() => setOpen(!open)} className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-gray-600 rounded transition bg-gray-200  "> Close </button>
</form>
       
       </section>
  )
}
