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
import { FiEye, FiEyeOff } from "react-icons/fi";  // Import eye icons
import SocialLogin from "@/app/components/Shared/SocialLogin";

type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({ setOpen }: TProps) {
  const [errors, setErrors] = useState({ emailError: '', passwordError: '' });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [demoUser, setDemoUser] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);  // State to toggle password visibility

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');

    const res: any = await login({ email, password });

    if (res?.error?.data?.message === 'user not exist') {
      setErrors({ ...errors, emailError: 'Incorrect Email 😞' });
      setLoading(false);
    }
    else if (res?.error?.data?.message === 'Password incorrect') {
      setErrors({ ...errors, passwordError: 'Incorrect Password 🔒' });
      setLoading(false);
    }
    else if (res?.data?.success) {
      const userImage = res?.data?.data?.image;
      const name = res?.data?.data?.name;

      const decoded: TJwtDecoded = jwtDecode(res.data.token);
      dispatch(setUser({
        user: { ...decoded, image: userImage, name },
        token: res.data.token
      }));

      Cookies.set('accessToken', res?.data?.token, { expires: 1 });

      toast.success('Logged In Successfully 🎉');
      setLoading(false);
      if (typeof setOpen === 'function') setOpen(false);
      router.push('/');
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-white to-gray-200 shadow-lg rounded-lg">
      <div className="hero-content flex-col w-full md:w-96 p-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center text-gray-700">

          {/* Login with Demo Account */}
          <div className="border-b-2 pb-4 mb-6">
            <h1 className="text-lg lg:text-xl text-gray-600 font-semibold mb-4">Login For Testing 🚀</h1>

            <div className="flex justify-center gap-4">
              <button onClick={() => setDemoUser({ email: 'testUser@gmail.com', password: '12345En$' })} className="bg-gray-300 hover:bg-gray-200 p-3 rounded-md text-gray-700 font-medium text-sm shadow-md">Login As User 👤</button>
              <button onClick={() => setDemoUser({ email: 'testAdmin@gmail.com', password: '12345En$' })} className="bg-gray-300 hover:bg-gray-200 p-3 rounded-md text-gray-700 font-medium text-sm shadow-md">Login As Admin 🛠️</button>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl text-gray-800 font-bold mb-8">Login to your Account 🔑</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              onChange={() => setErrors({ emailError: '', passwordError: '' })}
              type="email"
              placeholder="Email 📧"
              className="w-full py-3 pl-12 pr-3 outline-none border-2 border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-blue-500"
              name="email"
              defaultValue={demoUser?.email || ""}
            />
            <span className="text-2xl absolute left-4 text-gray-400">
              <AiOutlineMail />
            </span>
            {errors?.emailError && <span className="text-red-500 text-sm">{errors?.emailError}</span>}
          </div>

          <div className="relative">
            <input
              onChange={() => setErrors({ emailError: '', passwordError: '' })}
              type={passwordVisible ? 'text' : 'password'}  // Toggle type based on visibility state
              placeholder="Password 🔑"
              className="w-full py-3 pl-12 pr-3 outline-none border-2 border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-blue-500"
              name="password"
              defaultValue={demoUser?.password || ""}
            />
            <span className="text-2xl absolute left-4 text-gray-400">
              <GoUnlock />
            </span>
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}  // Toggle password visibility
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />} {/* Show different icons based on visibility */}
            </span>
            {errors?.passwordError && <span className="text-red-500 text-sm">{errors?.passwordError}</span>}
          </div>

          <SocialLogin />

          <div className="form-control">
            <button
              className="bg-black hover:bg-gray-700 w-full p-3 text-white rounded-md font-semibold transition-all flex justify-center items-center"
              type="submit"
            >
              {loading ? (
                <ClipLoader
                  color='#ffffff'
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  speedMultiplier={0.8}
                />
              ) : (
                'Login 🚀'
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <h4 className="font-semibold">
              Don't have an account?{' '}
              <Link href='/register'>
                <span className="text-blue-500 hover:text-blue-400">Register ✍️</span>
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
