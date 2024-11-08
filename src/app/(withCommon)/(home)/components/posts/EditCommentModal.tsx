/* eslint-disable @typescript-eslint/no-explicit-any */

import {useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { FaPen } from 'react-icons/fa';
import { useUpdateCommentMutation } from "@/redux/features/comments/commentApi";
import { TComment } from "../CreatePost/CreatePostModal";


type TModalProps = {
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
  comment : Partial<TComment>;
}

type FormData = {
    modifiedComment: string;
  };

export default function EditCommentModal({ setOpen, comment} : TModalProps) {

  const { register, handleSubmit} = useForm<FormData>({
    defaultValues: {
        modifiedComment : comment?.comment,
      },
  });
  const [ updateComment, { isLoading} ] = useUpdateCommentMutation();



  const onSubmit = async (data: any ) => {
  const modifiedComment = {
    comment : data.modifiedComment,
  }
  try {
    const response =  await updateComment({
      commentId :  comment?._id as string,
      payload : modifiedComment,
    }).unwrap();

  if(response?.success){
    // close the modal 
    setOpen(false)
    // show a toast 
    toast.success('Edited')
  }
  }catch(error){
    toast.error('Something went wrong')
    console.log(error)
  }
  }



  return (
    <section className="fixed h-screen inset-0 z-50 shadow-2xl rounded-lg  flex justify-center overflow-y-auto bg-black/20 dark:backdrop-blur-sm w-screen px-5 md:px-0">  
       
       <form className="w-[400px] h-fit bg-white dark:bg-gray-700 rounded-md relative top-[40%] py-3" onSubmit={handleSubmit(onSubmit)}>

        {/* loading white layer  */}
      {isLoading && <div className="w-full h-full top-0 left-0 right-0 bottom-0 z-50 bg-white/80 dark:bg-gray-900/50 absolute rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#3B82F6'
           size={40}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}


<div className="p-2 space-y-6">
      {/* Comment Input */}
      <div className="flex items-center space-x-3">
        <FaPen className="text-blue-500 text-xl" />
        <textarea rows={4} {...register("modifiedComment")}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md focus:outline-none"
        />
      </div>
    </div>
       


<button type="submit" className="px-8 text-sm lg:text-base mb-5 md:mb-4
 mx-3 py-1 font-semibold text-white rounded transition bg-blue-600 hover:bg-blue-700 ">Edit</button>

<button onClick={() => setOpen(false)} className="px-8 text-sm lg:text-base mr-3 py-1  font-semibold text-gray-600 rounded transition bg-gray-200 hover:bg-gray-300 "> Close </button>
</form>
       
       </section>
  )
}
