/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FieldValues, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { GoUnlock } from "react-icons/go";
import { PiImage } from "react-icons/pi";
import { useSignUpMutation } from "@/redux/features/authentication/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import uploadImage from "@/utils/uploadImage";
import Image from "next/image";
import SocialLogin from "@/app/components/Shared/SocialLogin";



export default function Register() {
  const { register, handleSubmit, formState: {errors}} = useForm();
  const [ loading , setLoading ] = useState(false)
  const [ signUp ] = useSignUpMutation(); 
  const router = useRouter()
  const [ imagePreview , setImagePreview ] = useState("")


    const onSubmit = async (data: FieldValues) => {
      setLoading(true)

      // uploading Image 
      const imageURL = await uploadImage(data.image)
      if(!imageURL)return toast.error('Image not uploaded');

      const userData = {
        ...data,
        role :'user',
        image : imageURL,
       }

 const result : any = await signUp({
      ...userData,
      role :'user',
     })

     if(result?.error?.data?.message){
      toast.error('Email is already exist')
      setLoading(false)
      return;
     }
     else if(result?.data?.success)
      toast.success('Registered Successfully! Please Login')
      router.push('/login');
    }

  // get the temporaray preview image 
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  

  return (
    <div className="hero h-[730px] dark:bg-gray-800/20 md:h-[790px] md:px-4 ">
    <div className="hero-content flex-col w-full gap-0">

    <div className="text-center lg:text-left pt-5 rounded-l-lg">
        <h1 className="text-[27px] lg:text-[34px] font-bold text-gray-800 text-center  carter-one-regular mb-3 dark:text-gray-400"> Create your account</h1>
      </div>

      <div className="rounded flex-shrink-0 w-full max-w-2xl ">
        <div className= "md:p-6">


        <form onSubmit={handleSubmit(onSubmit)} className="">
            
          <div >
           <div className="relative flex items-center">
           <input type="text" placeholder="Your Name" className="w-full py-3 pl-12 pr-3 outline-none border-2 rounded-md bg-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 border-gray-200 text-gray-700 focus:border-blue-600 " {...register('name',{required: true, minLength: 3, maxLength: 20})} />

         <span className="text-2xl absolute left-4 text-gray-300"> <IoPersonOutline/></span>
           </div>

            <span className="text-red-400 font-semibold text-sm p-1"> {errors.name?.type === 'required' && 'Name is required'} {errors.name?.type === 'minLength' && 'Name Must Have 3 Characters'} {errors.name?.type === 'maxLength' && 'Name Maximum 20 Characters'}  </span>
          </div>


          <div className="">
           <div   className="relative flex items-center">
           <input type="email" placeholder="Email" className="w-full py-3 pl-12 pr-3 outline-none border-2 rounded-md bg-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 border-gray-200 text-gray-700 focus:border-blue-600 " {...register('email', {required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
            <span className="text-2xl absolute left-4 text-gray-300"> <AiOutlineMail/></span>
           </div>

            <span className="text-red-400 font-semibold text-sm p-1">{errors.email?.type === 'required' && 'Email is required'} {errors.email?.type === 'pattern' && 'Please input a valid email'}</span>
          </div>


          <div className="">
           <div  className="relative flex items-center">
           <input type="text" placeholder="Password" className="w-full py-3 pl-12 pr-3 outline-none border-2 rounded-md bg-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 border-gray-200 text-gray-700 focus:border-blue-600 " {...register('password', {required: true, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,8}$/ })} />
            <span className="text-2xl absolute left-4 text-gray-300"> <GoUnlock/></span>
           </div>

            <span className="text-red-400 font-semibold text-sm p-1"> {errors.password?.type === 'required' && 'Password is required'} {errors.password?.type === 'pattern' && 'Min 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, min 6 characters, max 8 characters.'} </span>
          
          </div>

          <div className="">
           <div className="relative flex items-center">
           <input {...register('image', {required: true })}  onChange={(e) => handleImageChange(e)} type="file" className={`file-input ${imagePreview? 'h-20 pl-20 ': 'pl-8 h-14'} file-input-ghost w-full  bg-white  dark:bg-gray-900  outline-dashed outline-2 rounded-md outline-gray-300/40 dark:outline-gray-700`} />
          
            <span className="text-2xl absolute left-4 text-gray-300"> 

              {imagePreview? <div><Image
            width={300} height={300} alt="preview"
            className="size-16 object-cover rounded-md"
             src={imagePreview}/>
            </div> :   <PiImage/>}

              </span>
           </div>
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.image?.type === 'required' && 'Image is required'}  </span>
     
          </div>

          <div className="">
        <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold text-sm">
          <input
            type="checkbox"
            {...register('terms', { required: true })}
          />
          I agree to the Terms and Conditions
        </label>
        <span className="text-red-400 font-semibold text-sm p-1"> {errors.terms?.type === 'required' && 'You must agree to the terms'}  </span>
      </div>
      <SocialLogin/>

          <div className="mt-6">
            <button className="bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 w-full p-3 text-zinc-200 rounded-md font-semibold transition-all flex justify-center items-center hover:bg-zinc-600 text-sm md:text-base" type="submit"> {loading? <ClipLoader
           color='#ffffff'
           loading={loading}
          className=""
           size={25}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> : 'Register'} 
     </button>
          </div>

          <div className="mt-2">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400"> Already Have An Account? <Link href='/login'> <span className="text-blue-600"> Login</span></Link> </h4>
            </div>
         
          
        </form>

        </div>
       
      </div>
    </div>
  </div>
  )
}
