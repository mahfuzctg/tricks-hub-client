/* eslint-disable @typescript-eslint/no-explicit-any */

import {useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { FaPen, FaCheckCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, TUser } from "@/redux/features/authentication/authSlice";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import uploadImage from "@/utils/uploadImage";


type TModalProps = {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
}


export default function EditProfileModal({ open, setOpen} : TModalProps) {

  const { register, handleSubmit, reset} = useForm();
  const [updateUser] = useUpdateUserMutation();
  const currentUser = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth)
  const [ coverPreview , setCoverPreview ] = useState("")
  const [ profilePreview , setProfilePreview ] = useState("")
  const [ submitLoading, setSubmitLoading ] = useState(false);



  // only for checking the membership in the userData 
  const { data, isSuccess, isLoading: dataGettingLoading } = useGetSingleUserQuery(currentUser?.email as string);
  const userFromDB : TUser = data?.data;

  
    // Set the default values dynamically
    useEffect(() => {
        if(isSuccess){
          reset({
            name : userFromDB.name,
          });
        }
      }, [reset, userFromDB, isSuccess]);

      const [ profileImageFile, setProfileImage ] = useState <any>(undefined);
      const [ coverImageFile, setCoverImage ] = useState<any>(undefined);


  const onSubmit = async (data: any ) => {
    setSubmitLoading(true);
    let coverImage;
    let profileImage;

//  upload cover image 
    if(coverImageFile){
      coverImage =  await uploadImage(coverImageFile);
    }else{coverImage = userFromDB?.coverImg}
   
  
    // upload profile image 
    if(profileImageFile){
      profileImage = await uploadImage(profileImageFile);
    }else{profileImage = userFromDB?.image}
  
  const userNewData = {
    userId : currentUser?._id as string,
    payload : {
        name : data.name,
        image : profileImage,
        coverImg : coverImage,
    }
  }

  try {
    const response =  await updateUser(userNewData).unwrap();

  if(response?.success){

    dispatch(setUser({
        ...auth, user : {...auth.user, 
            name: response?.data?.name,
            image : response?.data?.image ,
            coverImg :  response?.data?.coverImg
         }
      }))
    // close the modal 
    setOpen(false)
    // show a toast 
    toast.success('Info Updated Successfully')
    setSubmitLoading(false)
  }
  }catch(error){
    toast.error('Something went wrong')
    console.log(error)
    setSubmitLoading(false)
  }
  }

    // get the temporaray preview image 
    const handleCoverPreview = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setCoverPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    // get the temporaray preview image 
    const handleProfilePreview = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setProfilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <section className="w-screen absolute top-0 left-0 right-0 bottom-0 z-50  bg-black/20 backdrop-blur-sm flex justify-center py-10 overflow-y-auto px-4">  
       
       <form className="w-full md:w-[620px] h-fit p-6 bg-white rounded-xl relative" onSubmit={handleSubmit(onSubmit)}>

        {/* loading white layer  */}
      {(submitLoading || dataGettingLoading) && <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-50 bg-white/80 rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#3B82F6'
          //  cssOverride={override}
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}


       {/* User Images and cover */}
       <div className="relative">
          <Image
            src={coverPreview || userFromDB?.coverImg as string}
            alt="Cover"
            width={600}
            height={600}
            className="w-full h-28 md:h-36 object-cover rounded-t-xl"
          />
           
      <div className="flex items-center relative -top-10 justify-end bg-black/5 py-1">
        <label htmlFor='cover' className="relative -top-1 right-7"><MdPhotoCamera className="text-4xl text-gray-300 p-2 bg-gray-900 rounded-md  opacity-70"/> </label>
           <input id="cover"  onChange={(e) => {
            handleCoverPreview(e);
            setCoverImage(e?.target?.files)
           }} type="file" className={`hidden`} />
          </div>

          <div className="relative lg:left-4 -top-4 md:-top-4 flex items-center space-x-4">
            <Image
             src={profilePreview || userFromDB?.image}
              alt="Profile"
              width={300}
              height={300}
              className="size-24 md:size-28 rounded-full border-4 border-white object-cover"
            />
            <div>
              <h1 className=  "text-xl md:text-2xl font-bold flex items-center">
                {userFromDB?.name}
                {userFromDB?.memberShip && <FaCheckCircle className="text-blue-500 ml-2" />}
              </h1>
              <p className="text-gray-600">{userFromDB?.email}</p>
            </div>
          </div> 

          <div className="flex items-center relative justify-end ">
        <label htmlFor='image1' className="absolute -top-24 right-7"><MdPhotoCamera className="text-4xl text-gray-800 size-10 p-2 bg-black/10 rounded-md  opacity-70"/> </label>
           <input  onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleProfilePreview(e);
            setProfileImage(e?.target?.files)
           }} type="file" className={`hidden`} id="image1" />
          </div>
        </div>


<div className="pb-6 space-y-6">
      {/* Title Input */}
      <div className="flex items-center space-x-3">
        <FaPen className="text-blue-500 text-xl" />
        <input {...register("name")}
          type="text"
          placeholder="Full name"
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    </div>
       


<button type="submit" className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-blue-600 hover:bg-blue-700 ">Update</button>

<button onClick={() => setOpen(!open)} className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-gray-600 rounded transition bg-gray-200 hover:bg-gray-300 "> Close </button>
</form>
       
       </section>
  )
}
