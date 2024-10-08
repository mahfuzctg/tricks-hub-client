/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useLoginMutation } from "@/redux/features/authentication/authApi";
import { setUser } from "@/redux/features/authentication/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TJwtDecoded } from "@/types";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GoUnlock } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import SocialLogin from "@/app/components/Shared/SocialLogin";


export default function Login({setOpen} : { setOpen: React.Dispatch<boolean>}) {

  const [ errors, setErrors] = useState({emailError: '', passwordError: ''})
  const [ login ] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ loading , setLoading ] = useState(false)



  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true)

    const form  = new FormData(e.target);
    const email = form.get('email')
    const password = form.get('password')


    const res : any = await login({ email, password})

    if(res?.error?.data?.message === 'user not exist'){
      setErrors({...errors, emailError: 'Incorrect Email'})
      setLoading(false);
    }
    else if(res?.error?.data?.message === 'Password incorrect'){
      setErrors({...errors, passwordError: 'Incorrect Password'})
      setLoading(false);
    }
   else if(res?.data?.success){
    const userImage = res?.data?.data?.image;
    const name = res?.data?.data?.name;

    // decode the jwt token 
    const decoded : TJwtDecoded = jwtDecode(res.data.token);
    dispatch(setUser({
      user : { ...decoded, image : userImage, name },
      token : res.data.token
    }))
    // setting up token to the Cookie manually, this token is for accessing in the middleware of Next js.
    Cookies.set('accessToken', res?.data?.token, { expires: 1 });

    toast.success('Logged In Successfully')
    setLoading(false);
    if(typeof setOpen === 'function')setOpen(false)
    const role = decoded?.role;
    role === 'user'? router.push('/')  :  router.push('/');
    
   }
}


  return(
    <div className="hero h-[600px] pb-32 md:pb-0 md:h-[600px] ">

    <div className="hero-content flex-col w-full p-0">

      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl text-gray-700  px-6 py-3 font-bold text-center carter-one-regular">Login your account</h1>
      </div>

      <div className="rounded-md flex-shrink-0 w-full max-w-2xl  ">
        <div className="p-6">


        <form onSubmit={handleLogin} className="text-white">

          <div className="mb-5">
           <div className="relative flex items-center">
           <input onChange={() => setErrors({emailError:'', passwordError: ''})}  type="email" placeholder="Email" className="w-full py-3 pl-12 pr-3 outline-none border-2 rounded-md bg-white border-gray-200 text-gray-700 focus:border-blue-600 " name="email" />
           <span className="text-2xl absolute left-4 text-gray-300"> <AiOutlineMail/></span>
           </div>

            {errors?.emailError && <span className="text-red-600"> {errors?.emailError} </span>}
          </div>


          <div className="mb-4">
            <div className="relative flex items-center">
            <input  onChange={() => setErrors({emailError:'', passwordError: ''})} type="text" placeholder="Password" className="w-full py-3 pl-12 pr-3 outline-none border-2 rounded-md bg-white border-gray-200 text-gray-700 focus:border-blue-600 " name="password" />
            <span className="text-2xl absolute left-4 text-gray-300"> <GoUnlock/></span>
            </div>

            {errors?.passwordError && <span className="text-red-600"> {errors?.passwordError}</span>}


          </div>
          <SocialLogin/>

          <div className="form-control mt-6">
            <button className="bg-gray-800 w-full p-3 text-zinc-200 rounded-md font-semibold transition-all flex justify-center items-center hover:bg-zinc-600 text-sm md:text-base" type="submit">{loading? <ClipLoader
           color='#ffffff'
           loading={loading}
          className=""
           size={25}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> : 'Login'}  </button>
          </div>

          <div className="mt-2">
                <h4 className="text-sm font-semibold text-gray-500">Don't Have An Account? <Link href='/register'> <span className="text-blue-600">Register</span></Link> </h4>
            </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
