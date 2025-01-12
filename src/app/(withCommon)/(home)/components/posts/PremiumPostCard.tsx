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
import { HiDotsVertical } from "react-icons/hi";

// Import necessary components from react-share
import { 
  FacebookShareButton, 
  TwitterShareButton,  
  WhatsappShareButton, 
  FacebookIcon,        
  TwitterIcon,         
  WhatsappIcon,         
  LinkedinShareButton,
  LineIcon
} from "react-share";

export default function PremiumPostCard({ post }: { post: TPost }) {
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
  const postTitle = description.slice(0, 100); // Short description or title for the shared content

  // State for showing/hiding the share options
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Function to toggle the visibility of share options
  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  const handleShareClick = () => {
    setShowShareOptions(false); // Close options after a share button is clicked
  };

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
          {isPremium && (
            <FaProductHunt className="text-gray-500 cursor-pointer text-2xl" />
          )}

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
          <VoteSection postId={_id as string} userId={user?._id as string} votes={votes!} voters={voters!} />
          <div className="flex items-center gap-3 bg-gray-200/30 dark:bg-gray-700/40 rounded-xl text-sm p-2">
            <BiCommentDetail className="text-lg" />
            <button
              className="text-green-500"
              onClick={toggleCommentInput}
            >
              {comments.length} Comments
            </button>
          </div>
        </div>
        
        {/* Share Button */}
        <div className="flex items-center gap-3">
          <button className="text-gray-500" onClick={toggleShareOptions}>
            <FaShare className="text-lg" />
          </button>
          {showShareOptions && (
            <div className="bg-white dark:bg-gray-700 p-2 shadow-md rounded-md absolute right-0 top-full mt-2 flex items-center gap-3">
              <FacebookShareButton url={postUrl} quote={postTitle}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={postUrl}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <TwitterShareButton url={postUrl}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <LinkedinShareButton url={postUrl}>
                <LineIcon size={32} round={true} />
              </LinkedinShareButton>
            </div>
          )}
        </div>
      </div>

      {/* Comment Section */}
      {showCommentInput && (
        <div className="mt-6">
          <form
            className="flex gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("newComment", { required: true })}
              type="text"
              className="bg-gray-200 dark:bg-gray-800 p-3 w-full rounded-md"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="text-blue-600"
            >
              <IoSendSharp className="text-2xl" />
            </button>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="mt-6 space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <div className="flex items-center gap-2">
              <Image
                src={comment.userInfo.image}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-sm">
                <h4 className="font-semibold">{comment.userInfo.name}</h4>
                <TimeAgo date={comment.createdAt} />
              </div>
            </div>
            <div className="text-sm dark:text-gray-400 w-full">
              {comment.comment}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button onClick={() => handleEdit(comment._id, comment.comment)}>
                <FaPen className="text-blue-500" />
              </button>
              <button onClick={() => handleDelete(comment._id)}>
                <RiDeleteBin4Line className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
