/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { TComment, TPost } from "../CreatePost/CreatePostModal";
import { FaShare, FaThumbsUp, FaReply, FaEdit } from 'react-icons/fa';
import { RiDeleteBin4Line } from "react-icons/ri";
import { useRef, useState } from "react";
import Image from "next/image";
import TimeAgo from 'react-timeago'
import ImageGallery from "./ImageGallery";
import { IoSendSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentsQuery, useUpdateCommentMutation } from "@/redux/features/comments/commentApi";
import { BsThreeDots } from "react-icons/bs";
import MiniUserProfile from "./MiniUserProfile";
import VoteSection from "./VoteSection";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import { MdStars } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import EditCommentModal from "./EditCommentModal";
import { FaPen } from 'react-icons/fa';

export default function PostCard({ post } : { post : TPost}) {
  const { register, handleSubmit , reset} = useForm();
  const user = useAppSelector(state => state.auth.user)
  const [ addComment, { isLoading : addLoading, } ] = useAddCommentMutation();
  const [ deleteComment, { isLoading: deleteLoading} ] = useDeleteCommentMutation();
  const [ openEditCommentModal, setEditCommentModal ] = useState(false);
  const [ commentForEdit, setCommentForEdit ] = useState({});

  // for printing the page 
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const {_id, category, description, 
    images, authorInfo, votes, voters, createdAt, isPremium} = post;

  // get comments based on the postID 
  const { data  } = useGetCommentsQuery({ postId : _id });
  const comments : TComment[] = data?.data || [];

  const onSubmit = async (data: any ) => {
    const newComment  = {
      comment : data.newComment,
      postId : _id,
      userInfo  : {
        name : user?.name,
        email : user?.email,
        image : user?.image
      },
    }

    try {
      const response = await addComment(newComment as TComment).unwrap();
      if(response?.success){
        reset();
        toast.success('Comment added successfully!');
      }
    } catch(error){
      toast.error('Something went wrong');
      console.log(error);
    }
  }

  const handleDelete = async (commentId: string) => {
    try {
      const response = await deleteComment(commentId).unwrap();
      if(response?.success) {
        toast.success('Comment deleted successfully!');
      }
    } catch (error) {
      toast.error('Error deleting comment');
    }
  }

  const handleEdit = async (commentId: string, updatedComment: string) => {
    try {
      const response = await useUpdateCommentMutation({ id: commentId, comment: updatedComment }).unwrap();
      if(response?.success) {
        toast.success('Comment updated successfully!');
      }
    } catch (error) {
      toast.error('Error updating comment');
    }
  }

  // State to toggle comment input visibility
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Toggle comment input visibility
  const toggleCommentInput = () => {
    setShowCommentInput(prev => !prev);
  };

  return (
    <div ref={contentRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full mx-auto lg:mb-6">
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
          <h2 className="text-lg font-semibold dark:text-gray-300">{authorInfo?.name}</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">{category} • <time className="text-gray-500 dark:text-gray-400">
            <TimeAgo date={createdAt!} />
          </time></p>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          {isPremium && <MdStars className="text-orange-500 cursor-pointer text-2xl" />}
          <button onClick={()=> reactToPrintFn()}> <AiFillPrinter className="text-gray-600 dark:text-gray-400 cursor-pointer text-2xl "/></button>
        </div>
      </div>
      
      {/* Post Description */}
      <div className="text-gray-700 dark:text-gray-400 mb-4 text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: description }}></div>

      {/* Images Section */}
      <Link href={`/details/${_id}`}>
        <div className="pointer-events-none">
          <ImageGallery images={images} />
        </div>
      </Link>

      {/* Likes, Dislikes, Comments, Rating, and Share Section */}
      <div className="flex justify-between items-center mt-4 border-y dark:border-gray-600 py-2">
        <div className="flex space-x-6 text-gray-600">
          <VoteSection postId={_id as string} userId={user?._id as string} votes={votes!} voters={voters!}/>
          <div className="flex items-center gap-3 bg-gray-200/50 dark:bg-gray-900 rounded-full px-3 py-1">
            <BiCommentDetail className="cursor-pointer text-lg xl:text-xl text-gray-500" onClick={toggleCommentInput} />
            <span className="font-semibold text-gray-600 dark:text-gray-400">{comments?.length}</span>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-300 transition-colors">
          <FaShare className="cursor-pointer hover:scale-110 transition-transform" />
          <span>Share</span>
        </button>
      </div>

      {/* Main comment section */}
      <div className="flex flex-col space-y-2 pb-2 md:pb-4 my-3 relative">
        <h4 className="font-semibold text-gray-600 dark:text-gray-400 cursor-pointer">View more comments</h4>

        {/* Loading white layer */}
        {(addLoading || deleteLoading) && <div className="w-full h-full absolute top-0 left-0 z-50 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center"> 
          <ClipLoader color='#4B5563' size={35} aria-label="Loading Spinner" speedMultiplier={0.8} />
        </div>}

        {comments?.slice(0, 2).map((comment: TComment) => (
          <div key={comment._id} className="flex space-x-2 ">
            {/* Edit comment modal */}
            {openEditCommentModal && <EditCommentModal setOpen={setEditCommentModal} comment={commentForEdit} />}

            {/* User Image */}
            <Image src={comment?.userInfo?.image} alt={'user'} width={300} height={300} className="size-10 rounded-full object-cover" />

            <div className="flex flex-col flex-wrap">
              {/* User Info */}
              <div className="bg-gray-100 dark:bg-gray-900/60 flex flex-col flex-wrap rounded-xl group px-3 relative">
                <h4 className="font-semibold">{comment?.userInfo?.name}</h4>
                {/* Comment Text */}
                <span className="text-gray-700 dark:text-gray-400">{comment?.comment}</span>

                {user && (
                  <>
                    <div className="p-2 hidden group-hover:flex text-gray-600 dark:text-gray-400 text-[13px] rounded-lg ml-2 absolute top-0 right-6">
                      <FaPen className="cursor-pointer" onClick={() => { setEditCommentModal(true); setCommentForEdit(comment) }} />
                      <RiDeleteBin4Line onClick={() => handleDelete(comment._id!)} className="cursor-pointer" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Show Add Comment Section */}
        {showCommentInput && (
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <textarea {...register("newComment", { required: true })}
              className="p-2 w-full mt-2 rounded-lg dark:bg-gray-700 text-gray-500 dark:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Add a comment..." />
            <button type="submit" className="absolute right-4 bottom-3 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <IoSendSharp />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
