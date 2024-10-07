/* eslint-disable @typescript-eslint/no-explicit-any */

import {useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { FaPen, FaImage, FaListAlt, FaAlignLeft } from 'react-icons/fa';
import { useCreatePostMutation } from "@/redux/features/posts/postApi";
import { useAppSelector } from "@/redux/hooks";
import { TfiLayoutListPost } from "react-icons/tfi";
import { TUser } from "@/redux/features/authentication/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";
import TextEditor from "./TextEditor";
import { useState } from "react";

export type TComment = {
  _id? : string;
  comment : string,
  postId : string,
  userInfo  : {
    name : string,
    email : string,
    image : string
  },
  createdAt? : string,
  updatedAt? : string,
 
}

// type for post
export type TPost = {
    _id? : string,
    title : string;
    category : string;
    votes?: number
    voters?: [{ 
      userId: string, 
      voteType: string 
    }],
    description : string;
    images : string[];
    comments? : TComment[];
    authorInfo : {
      name : string;
      email: string;
      image : string;
      role :string;
      authorId : string;
      authorEmail : string;
    }
    isPremium? : boolean;
    createdAt? : string,
    updatedAt? : string,
};

type TModalProps = {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}


export default function CreatePostModal({ open, setOpen} : TModalProps) {

  const { register, handleSubmit} = useForm();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const user = useAppSelector(state => state.auth.user)

  // only for checking the membership in the userData 
  const { data } = useGetSingleUserQuery(user?.email as string);
  const userFromDB : TUser = data?.data || {};

  // description from the text editor 
  const [latestDescription, setLatestDescription] = useState('');
 


  const onSubmit = async (data: any ) => {
  
  const postData : TPost = {
    title : data.title,
    category : data.category,
    description : latestDescription,
    images : [],
    isPremium : data.premium === 'premium'? true : false,
    authorInfo : {
      name: user?.name as string,
      email: user?.email as string,
      image : user?.image as string,
      role : user?.role as string,
      authorId : user?._id as string,
      authorEmail : user?.email as string,
    },
  }
  if(data.image1) postData.images.push(data.image1)
  if(data.image2) postData.images.push(data.image2)
  if(data.image3) postData.images.push(data.image3)

  try {
    const response =  await createPost(postData).unwrap();

  if(response?.success){
    // close the modal 
    setOpen(false)
    // show a toast 
    toast.success('You created a new post')
  }
  }catch(error){
    toast.error('Something went wrong')
    console.log(error)
  }
 
  }


  return (
    <section className="w-screen absolute top-0 left-0 right-0 bottom-0 z-50  bg-black/20 backdrop-blur-sm flex justify-center py-10 overflow-y-auto">  
       
       <form className="w-[400px] md:w-[700px] h-fit bg-white rounded-md relative" onSubmit={handleSubmit(onSubmit)}>

        {/* loading white layer  */}
      {isLoading && <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-50 bg-white/80 rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#3B82F6'
           loading={isLoading}
          //  cssOverride={override}
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}


<div className="p-6 space-y-6">
      {/* Title Input */}
      <div className="flex items-center space-x-3">
        <FaPen className="text-blue-500 text-xl" />
        <input {...register("title")}
          type="text"
          placeholder="Post Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Input */}
      <div className="flex items-center space-x-3">
        <FaListAlt className="text-green-500 text-xl" />
       

        <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-400" {...register("category")} >
              <option disabled selected>Select Category</option>
              <option value='Web'>Web</option>
              <option value='Software Engineering'>Software Engineering</option>
              <option value='AI'>AI</option>
              <option value='TEchnology'>Technology</option>
        </select>

      </div>

        {/* Premium Selection  */}
        
     {userFromDB?.memberShip &&  <div className="flex items-center gap-10">
        <label className=" text-gray-500 font-semibold flex items-center gap-3"> <TfiLayoutListPost className="text-purple-600 text-xl" /> Content</label>
        
        <div className="flex space-x-4 items-center">
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value={'premium'} 
              {...register('premium', { required: 'Please choose an option' })} 
              className="form-radio" 
            />
            <span>Premium</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              value="free" 
              defaultChecked
              {...register('premium', { required: 'Please choose an option' })} 
              className="form-radio" 
            />
            <span>Free</span>
          </label>
        </div>

      </div>
}


      {/* Description Input */}
      <div className="flex items-center space-x-3">
        <FaAlignLeft className="text-yellow-500 text-xl" />
         <TextEditor setLatestDescription={setLatestDescription} />
      </div>
    

      {/* Images Input */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <FaImage className="text-red-500 text-xl" />
          <input {...register("image1")}
            type="text"
            placeholder="Image URL 1"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <FaImage className="text-red-500 text-xl" />
          <input {...register("image2")}
            type="text"
            placeholder="Image URL 2"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <FaImage className="text-red-500 text-xl" />
          <input {...register("image3")}
            type="text"
            placeholder="Image URL 3"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
       


<button type="submit" className="px-8 text-sm lg:text-base mb-5 md:mb-4 mx-3 py-2 md:py-2 font-semibold text-white rounded transition bg-blue-600 hover:bg-blue-700 "> Create</button>

<button onClick={() => setOpen(!open)} className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-gray-600 rounded transition bg-gray-200 hover:bg-gray-300 "> Close </button>
</form>
       
       </section>
  )
}
