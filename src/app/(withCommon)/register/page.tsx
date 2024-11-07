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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    // Uploading Image 
    const imageURL = await uploadImage(data.image);
    if (!imageURL) return toast.error('Image not uploaded');

    const userData = {
      ...data,
      role: 'user',
      image: imageURL,
    };

    const result: any = await signUp(userData);

    if (result?.error?.data?.message) {
      toast.error('Email already exists');
      setLoading(false);
      return;
    } else if (result?.data?.success) {
      toast.success('Registered Successfully! Please Login');
      router.push('/login');
    }
  };

  // Get the temporary preview image 
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
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="text-center pb-5">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">🌟 Create your account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="relative flex items-center mt-4">
            <input
              type="text"
              placeholder="👤 Your Name"
              className="w-full py-3 pl-12 pr-3 border-2 rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 border-gray-300 text-gray-700 focus:border-blue-600"
              {...register('name', { required: true, minLength: 3, maxLength: 20 })}
            />
            <span className="text-2xl absolute left-4 text-gray-400"> <IoPersonOutline /></span>
          </div>
          <span className="text-red-400 font-semibold text-sm p-1">{errors.name && 'Name must be 3-20 characters'}</span>

          {/* Email Field */}
          <div className="relative flex items-center mt-4">
            <input
              type="email"
              placeholder="✉️ Email"
              className="w-full py-3 pl-12 pr-3 border-2 rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 border-gray-300 text-gray-700 focus:border-blue-600"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            <span className="text-2xl absolute left-4 text-gray-400"> <AiOutlineMail /></span>
          </div>
          <span className="text-red-400 font-semibold text-sm p-1">{errors.email && 'Invalid email address'}</span>

          {/* Password Field without Validation */}
          <div className="relative flex items-center mt-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="🔒 Password"
              className="w-full py-3 pl-12 pr-12 border-2 rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 border-gray-300 text-gray-700 focus:border-blue-600"
              {...register('password', { required: true })}  // Only require password, no additional validation
            />
            <span className="text-2xl absolute left-4 text-gray-400"><GoUnlock /></span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <span className="text-red-400 font-semibold text-sm p-1">
            {errors.password && 'Password is required'}
          </span>

          {/* Image Upload Field */}
          <div className="relative flex items-center mt-4">
            <input
              {...register('image', { required: true })}
              onChange={(e) => handleImageChange(e)}
              type="file"
              className={`file-input ${imagePreview ? 'h-20 pl-20' : 'pl-8 h-14'} file-input-ghost w-full bg-white dark:bg-gray-900 outline-dashed outline-2 rounded-md outline-gray-300/40 dark:outline-gray-700`}
            />
            <span className="text-2xl absolute left-4 text-gray-400">
              {imagePreview ? (
                <Image width={300} height={300} alt="preview" className="size-16 object-cover rounded-md" src={imagePreview} />
              ) : <PiImage />}
            </span>
          </div>
          <span className="text-red-400 font-semibold text-sm p-1">{errors.image && 'Image is required'}</span>

          {/* Terms Checkbox */}
          <div className="mt-4">
            <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold text-sm">
              <input type="checkbox" {...register('terms', { required: true })} />
              📜 I agree to the Terms and Conditions
            </label>
            <span className="text-red-400 font-semibold text-sm p-1">{errors.terms && 'You must agree to the terms'}</span>
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Submit Button */}
          <div className="mt-6">
            <button className="bg-gray-800 dark:bg-gray-800 w-full p-3 text-zinc-200 rounded-md font-semibold flex justify-center items-center hover:bg-zinc-600 text-sm md:text-base transition-all" type="submit">
              {loading ? <ClipLoader color='#ffffff' loading={loading} size={25} /> : 'Register'}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-2 text-center">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Already Have An Account? <Link href='/login' className="text-blue-600"> Login</Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
