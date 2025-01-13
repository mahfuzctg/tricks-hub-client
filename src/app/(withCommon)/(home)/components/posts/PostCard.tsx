/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { TComment, TPost } from "../CreatePost/CreatePostModal";
import { FaShare, FaFilePdf, FaProductHunt } from 'react-icons/fa';
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

import MiniUserProfile from "./MiniUserProfile";
import VoteSection from "./VoteSection";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";

import { useReactToPrint } from "react-to-print";
import { AiFillPrinter, AiOutlineEllipsis } from "react-icons/ai";
import EditCommentModal from "./EditCommentModal";
import { FaPen } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import parse from "html-react-parser";

// Import necessary components from react-share
import { 
  FacebookShareButton, // Wrapper for Facebook share functionality
  TwitterShareButton,  // Wrapper for Twitter share functionality
  WhatsappShareButton, // Wrapper for WhatsApp share functionality
  FacebookIcon,        // Facebook share icon
  TwitterIcon,         // Twitter share icon
  WhatsappIcon,         // WhatsApp share icon
  LinkedinShareButton,
  LineIcon
} from "react-share";
import { Span } from "next/dist/trace";

export default function PostCard({ post }: { post: TPost }) {
  const { register, handleSubmit, reset } = useForm();
  const user = useAppSelector((state) => state.auth.user);
  const [addComment, { isLoading: addLoading }] = useAddCommentMutation();
  const [deleteComment, { isLoading: deleteLoading }] = useDeleteCommentMutation();
  const [openEditCommentModal, setEditCommentModal] = useState(false);
  const [commentForEdit, setCommentForEdit] = useState({});

  const [showActions, setShowActions] = useState(false); // State to toggle PDF/Print icons visibility

  


    // for printing the page
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    

  // Generate PDF functionality
  const generatePDF = () => {
    if (contentRef.current) {
      import("html2canvas")
        .then((html2canvas) => {
          html2canvas
            .default(contentRef.current!, { scale: 2 })
            .then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF("p", "mm", "a4");

              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

              pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
              pdf.save(`Post_${post._id}.pdf`);
            });
        })
        .catch((error) => {
          toast.error("Failed to load dependencies for PDF generation.");
          console.error(error);
        });
    } else {
      toast.error("Content is not available for PDF generation.");
    }
  };

  const { _id, category, description, images, authorInfo, votes, voters, createdAt, isPremium } = post;

  // get comments based on the postID
  const { data } = useGetCommentsQuery({ postId: _id });
  const comments: TComment[] = data?.data || [];

  // Add comment handler
  const onSubmit = async (data: any) => {
    const newComment = {
      comment: data.newComment,
      postId: _id,
      userInfo: {
        name: user?.name,
        email: user?.email,
        image: user?.image,
      },
    };

    try {
      const response = await addComment(newComment as TComment).unwrap();
      if (response?.success) {
        reset();
        toast.success('Comment added successfully!');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  // Handle delete comment
  const handleDelete = async (commentId: string) => {
    try {
      const response = await deleteComment(commentId).unwrap();
      if (response?.success) {
        toast.success('Comment deleted successfully!');
      }
    } catch (error) {
      toast.error('Comment deleted successfully!');
    }
  };

  // Use the hook outside the function
  const [updateComment] = useUpdateCommentMutation();

  // Handle edit comment
  const handleEdit = async (commentId: string, updatedComment: string) => {
    try {
      const response = await updateComment({ id : commentId, comment: updatedComment }).unwrap();
      if (response?.success) {
        toast.success('Comment updated successfully!');
      }
    } catch (error) {
      toast.error('Error updating comment');
    }
  };

  // State to toggle comment input visibility
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Toggle comment input visibility
  const toggleCommentInput = () => {
    setShowCommentInput((prev) => !prev);
  };



  // Define share-related variables and functionality
  const postUrl = `https://tricks-hub-client.vercel.app/post/${_id}`;
  const postTitle = description.slice(0, 50); // Short description or title for the shared content

  // State for showing/hiding the share options
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Function to toggle the visibility of share options
  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  const handleShareClick = () => {
    setShowShareOptions(false); // Close options after a share button is clicked
  };


  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the description view
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  // Determine the text to display
  const descriptionPreview = isExpanded
    ? description // Show full description when expanded
    : `${description.slice(0, 200)}...`; // Show preview (first 50 characters)


  return (
    <div ref={contentRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full mx-auto lg:mb-6">
      {/* Header with User Info */}

       
      <div className="flex items-center mb-4">
        
        <section className="group relative">
          <Image
            width={300}
            height={300}
            className="size-11 lg:size-14 rounded-full object-cover"
            src={authorInfo?.image}
            alt="User Avatar"
          />
          <MiniUserProfile userInfo={post.authorInfo} />
          
        </section>

        <div className="ml-3">
          <h2 className="text-lg font-semibold dark:text-gray-300">{authorInfo?.name}</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            {category} • <time className="text-gray-500 dark:text-gray-400">
              <TimeAgo date={createdAt!} />
            </time>
          </p>
        </div>
     
        <div className="ml-auto flex items-center gap-2 relative">

             {/* Premium Icon */}
             {post.isPremium &&   <FaProductHunt className="text-gray-500 cursor-pointer text-xl" />} 
          
          

          {/* 3-dot Icon */}
          <HiDotsVertical
            className="text-gray-600 font-bold dark:text-gray-400 cursor-pointer text-2xl"
            onClick={() => setShowActions((prev) => !prev)}
          />
          
          {/* Conditional PDF/Print Icons */}
          {showActions && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-700 shadow-md rounded-md p-2 flex flex-col gap-2">
              <button
                onClick={reactToPrintFn}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-500"
              >
                <AiFillPrinter className="text-xl" />
                <span>Print</span>
              </button>
              <button
                onClick={generatePDF}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
              >
                <FaFilePdf className="text-xl text-red-500" />
                <span>PDF</span>
              </button>
            </div>
          )}
      
        </div>
      </div>
        
        {/* descriptions */}
     
        <div className="text-gray-700 dark:text-gray-400 mb-4 text-base lg:text-lg">
      {/* Render the parsed HTML content */}
      <div>{parse(descriptionPreview)}</div>

      {/* Toggle Button placed at the end of the text */}
      <button
        onClick={toggleDescription}
        className="text-gray-700 dark:text-gray-400 mb-4 text-base mt-2"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
      {/* Images Section */}
      <Link href={`/details/${_id}`}>
        <div className="pointer-events-none">
          <ImageGallery images={images} />
        </div>
      </Link>

      {/* Likes, Dislikes, Comments, Rating, and Share Section */}
      <div className="flex justify-between items-center mt-4 border-y dark:border-gray-600 py-2">
        <div className="flex space-x-6 text-gray-600">
          <VoteSection postId={_id as string} userId={user?._id as string} votes={votes!} voters={voters!} />
          <div className="flex items-center gap-3 bg-gray-200/50 dark:bg-gray-900 rounded-full px-3 py-1">
            <BiCommentDetail className="cursor-pointer text-lg xl:text-xl text-gray-500" onClick={toggleCommentInput} />
            <span className="font-semibold text-gray-600 dark:text-gray-400">{comments?.length}</span>
          </div>
        </div>
 {/* // Share button and dropdown menu in the JSX */}
<div className="relative">
  {/* Button to open/close the share options */}
  <button
    onClick={toggleShareOptions}
    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-300 transition-colors"
  >
    <FaShare className="cursor-pointer hover:scale-110 transition-transform" />
    <span>Share</span>
  </button>

  {/* Conditionally rendered share options */}
  {showShareOptions && (
    <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-700 shadow-md rounded-md p-4 flex flex-col gap-2 z-10">
      
      {/* Facebook Share */}
      <FacebookShareButton url={postUrl} onClick={handleShareClick}>
        <div className="flex items-center gap-2 cursor-pointer">
          <FacebookIcon size={32} round /> {/* Facebook Icon */}
          <span className="text-gray-700 dark:text-gray-300">Facebook</span>
        </div>
      </FacebookShareButton>
      {/* Linkedin Share */}
      <LinkedinShareButton url={postUrl}>
        <div className="flex items-center gap-2 cursor-pointer">
          <LineIcon size={32} round /> {/* Facebook Icon */}
          <span className="text-gray-700 dark:text-gray-300">Linkedin</span>
        </div>
      </LinkedinShareButton>
      
      {/* Twitter Share */}
      <TwitterShareButton url={postUrl} title={postTitle}>
        <div className="flex items-center gap-2 cursor-pointer">
          <TwitterIcon size={32} round /> {/* Twitter Icon */}
          <span className="text-gray-700 dark:text-gray-300">Twitter</span>
        </div>
      </TwitterShareButton>
      
      {/* WhatsApp Share */}
      <WhatsappShareButton url={postUrl} title={postTitle}>
        <div className="flex items-center gap-2 cursor-pointer">
          <WhatsappIcon size={32} round /> {/* WhatsApp Icon */}
          <span className="text-gray-700 dark:text-gray-300">WhatsApp</span>
        </div>
      </WhatsappShareButton>
    </div>
  )}

  
</div> 
      </div>

      {/* Main comment section */}
      <div className="flex flex-col space-y-2 pb-2 md:pb-4 my-3 relative">
        <h4 className="font-semibold text-gray-600 dark:text-gray-400 cursor-pointer">Comments</h4>

        {/* Loading white layer */}
        {(addLoading || deleteLoading) && (
          <div className="w-full h-full absolute top-0 left-0 z-50 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center">
            <ClipLoader color="#4B5563" size={35} aria-label="Loading Spinner" speedMultiplier={0.8} />
          </div>
        )}

        {comments?.slice(0, 2).map((comment: TComment) => (
          <div key={comment._id} className="flex space-x-2 ">
            {/* Edit comment modal */}
            {openEditCommentModal && <EditCommentModal setOpen={setEditCommentModal} comment={commentForEdit} currentUserId={""} postId={""} />}

            {/* User Image */}
            <Image src={comment?.userInfo?.image} alt={'user'} width={300} height={300} className="size-10 rounded-full object-cover" />

            <div className="flex flex-col flex-wrap">
              {/* User Info */}
              <div className="bg-gray-100 dark:bg-gray-900/60 flex flex-col flex-wrap rounded-xl group px-3 relative">
                <h4 className="font-semibold">{comment?.userInfo?.name}</h4>
                {/* Comment Text */}
                <span className="text-gray-700 dark:text-gray-400">{comment?.comment}</span>

                {user && comment.userInfo.email === user.email && (  // Check if the logged-in user is the creator of the comment
         <div className="p-4 hidden group-hover:flex text-gray-600 dark:text-gray-400 text-[13px] rounded-lg ml-4 absolute top-0 right-0 gap-3">
         {/* Edit Icon */}
         <div
           className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 p-3 rounded-full cursor-pointer transform hover:scale-110 transition-all duration-200 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
           title="Edit Comment"
           onClick={() => { setEditCommentModal(true); setCommentForEdit(comment); }}
         >
           <FaPen className="text-gray-600 dark:text-gray-400 hover:text-gray-500 transition-colors" />
         </div>
       
         {/* Delete Icon */}
         <div
           className="flex items-center justify-center bg-red-200 dark:bg-red-700 p-3 rounded-full cursor-pointer transform hover:scale-110 transition-all duration-200 shadow-md hover:bg-red-300 dark:hover:bg-red-600"
           title="Delete Comment"
           onClick={() => handleDelete(comment._id!)}
         >
           <RiDeleteBin4Line className="text-red-600 dark:text-red-400 hover:text-white transition-colors" />
         </div>
       </div>
       
        )}
              </div>
            </div>
          </div>
        ))}

        {/* Show Add Comment Section */}
        {showCommentInput && (
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <textarea
              {...register('newComment', { required: true })}
              className="p-2 w-full mt-2 rounded-lg dark:bg-gray-700 text-gray-500 dark:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="absolute right-4 bottom-3 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <IoSendSharp />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}