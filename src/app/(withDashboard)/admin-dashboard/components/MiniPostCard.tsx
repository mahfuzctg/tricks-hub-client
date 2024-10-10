/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {  FaShare } from 'react-icons/fa';
import Image from "next/image";
import TimeAgo from 'react-timeago'
import { useAppSelector } from "@/redux/hooks";
import {useGetCommentsQuery} from "@/redux/features/comments/commentApi";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import { MdStars } from "react-icons/md";
import { TComment, TPost } from '@/app/(withCommon)/(home)/components/CreatePost/CreatePostModal';
import MiniUserProfile from '@/app/(withCommon)/(home)/components/Posts/MiniUserProfile';
import VoteSection from '@/app/(withCommon)/(home)/components/Posts/VoteSection';
import { MdModeEdit } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from 'react';
import UpdatePostModal from '@/app/(withCommon)/(home)/components/CreatePost/UpdatePostModal';
import { useDeletePostMutation } from '@/redux/features/posts/postApi';
import { toast } from 'sonner';



export default function MiniPostCard({ post } : { post : TPost}) {
  const user = useAppSelector(state => state.auth.user);
  const [updateModal, setUpdateModal ] = useState(false);
  const [ deletePost] = useDeletePostMutation();



 const {_id, title,  category,   images, authorInfo, votes, voters, createdAt, isPremium} = post;


    // get comments based on the postID 
    const { data  } = useGetCommentsQuery({ postId : _id});
    const comments : TComment[] = data?.data || [];
    

    // delete a post 
    const handleDelete = (postId: string) => {
    try {
      const response = deletePost(postId).unwrap();
  
    if(response?.success){
      // show a toast 
      toast.success('Deleted successfully')
    }
    }catch(error){
      toast.error('Something went wrong')
      console.log(error)
    }
    }

 
  return (
    <div  className="bg-white rounded-xl shadow-md p-6 pb-2 w-full mx-auto mt-6">

    {/* POST UPDATE MODAL  */}
      {updateModal &&  <UpdatePostModal open={updateModal} setOpen={setUpdateModal} postId={_id as string} />}

    {/* Header with User Info */}
  
   <div className="flex items-center mb-4">
      <section className="group relative">
      <Image width={300} height={300}
        className="size-11 lg:size-14 rounded-full object-cover"
        src={authorInfo?.image}
        alt="User Avatar"
      />
       <MiniUserProfile userInfo={post.authorInfo}/>
      </section>

      <div className="ml-3">
        <h2 className="text-lg font-semibold">{authorInfo?.name}</h2>
        <p className="text-sm md:text-base text-gray-500">{category} • <time className=" text-gray-500">
      <TimeAgo date={createdAt!} />
      </time></p>
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-4">
        
        {isPremium && <MdStars className="text-orange-500 cursor-pointer text-2xl" />}

        <button onClick={() => setUpdateModal(true)}> <MdModeEdit className="text-gray-600 cursor-pointer text-2xl "/></button>

        <button onClick={() => handleDelete(_id!)}> <RiDeleteBinLine className="text-gray-600 cursor-pointer text-2xl "/></button>

      </div>
    </div>

    {/* Post title*/}
    <p className=" text-gray-500 mb-4 text-base lg:text-lg font-semibold">
     {title}
      <Link href={`/details/${_id}`} className="text-blue-500 pl-2">
        See more..
      </Link>
    </p>


    {/* Images Section */}
    <Link href={`/details/${_id}`}>
       <Image
       width={300}
       height={300}
       alt='image'
       className='rounded-xl h-28 w-full md:w-fit object-cover object-top' 
       src={images[0]}/>
     </Link>
 

  {/* Likes, Dislikes, Comments, Rating, and Share Section */}
  <div className="flex justify-between items-center mt-4 border-t py-2">
        <div className="flex space-x-6 text-gray-600">

          <VoteSection postId={_id as string} userId={user?._id as string} votes={votes} voters={voters}/>
         
          <div className="flex items-center gap-3 bg-gray-200/50 rounded-full px-3 py-1">
            <BiCommentDetail className="cursor-pointer text-lg xl:text-xl text-gray-500" />
            <span className="font-semibold text-gray-600">{comments?.length}</span>
          </div>
          
        </div>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <FaShare className="cursor-pointer hover:scale-110 transition-transform" />
          <span>Share</span>
        </button>
      </div>

  </div>
  )
}
