/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useLoginMutation } from "@/redux/features/authentication/authApi";
import { setUser } from "@/redux/features/authentication/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TJwtDecoded } from "@/types";

import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GoUnlock } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import SocialLogin from "@/app/components/Shared/SocialLogin";
import { jwtDecode } from "jwt-decode";

// Define response types for login mutation
type LoginResponse = {
  success: boolean;
  data: {
    image: string;
    name: string;
  };
  token: string;
};

type LoginErrorResponse = {
  message: string;
};

type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setOpen }: TProps) {
  const [errors, setErrors] = useState({ emailError: '', passwordError: '' });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Demo credentials for testing
  const [demoUser, setDemoUser] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    try {
      const res: any = await login({ email, password });

      if ('error' in res) {
        const errorMessage = (res.error as LoginErrorResponse)?.message;
        if (errorMessage === 'user not exist') {
          setErrors({ ...errors, emailError: 'Incorrect Email 😞' });
        } else if (errorMessage === 'Password incorrect') {
          setErrors({ ...errors, passwordError: 'Incorrect Password 🔒' });
        }
        setLoading(false);
        return;
      }

      if ((res.data as LoginResponse)?.success) {
        const userImage = res.data.data.image;
        const name = res.data.data.name;

        // Decode the JWT token
        const decoded: TJwtDecoded = jwtDecode(res.data.token);
        dispatch(setUser({
          user: { ...decoded, image: userImage, name },
          token: res.data.token
        }));

        // Set token to cookies for middleware access
        Cookies.set('accessToken', res.data.token, { expires: 1 });

        toast.success('Logged In Successfully 🎉');
        setLoading(false);
        if (typeof setOpen === 'function') setOpen(false);
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen  flex items-center justify-center py-16 px-4">
      <div className="hero-content w-full md:w-96 bg-white p-8 rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl text-black font-semibold mb-6 uppercase">Login Please</h1>
          <div className="border-b-2 pb-4 mb-6">
            <h2 className="text-sm text-gray-600 font-medium">Login with Demo Account</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setDemoUser({ email: 'mahfuz@gmail.com', password: 'xyz1234' })}
                className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md text-black font-medium text-sm shadow-md transition-colors"
              >
                Login As User
              </button>
              <button
                onClick={() => setDemoUser({ email: 'admin@gmail.com', password: 'xyz1234' })}
                className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md text-black font-medium text-sm shadow-md transition-colors"
              >
                Login As Admin
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative flex items-center">
            <input
              onChange={() => setErrors({ emailError: '', passwordError: '' })}
              type="email"
              placeholder="Email Address"
              className="w-full items-center py-3 pl-12 pr-3 outline-none border-2 border-gray-300 rounded-md bg-gray-50 text-black focus:border-blue-500"
              name="email"
              defaultValue={demoUser?.email || ""}
            />
            <span className="text-2xl absolute left-4 text-gray-500 items-center">
              <AiOutlineMail />
            </span>
            {errors?.emailError && <span className="text-red-500 text-sm">{errors?.emailError}</span>}
          </div>

          <div className="relative flex items-center">
            <input
              onChange={() => setErrors({ emailError: '', passwordError: '' })}
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 pr-3 outline-none border-2 border-gray-300 rounded-md bg-gray-50 text-black focus:border-blue-500"
              name="password"
              defaultValue={demoUser?.password || ""}
            />
            <span className="text-2xl absolute left-4 text-gray-500">
              <GoUnlock />
            </span>
            {errors?.passwordError && <span className="text-red-500 text-sm">{errors?.passwordError}</span>}
          </div>

          <SocialLogin />

          <div className="form-control">
            <button
              className="bg-black hover:bg-gray-700 w-full py-3 text-white rounded-md font-semibold transition-all flex justify-center items-center"
              type="submit"
            >
              {loading ? (
                <ClipLoader
                  color="#ffffff"
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  speedMultiplier={0.8}
                />
              ) : (
                'Login'
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <h4 className="font-semibold">
              Don&apos;t have an account?{' '}
              <Link href="/register">
                <span className="text-black hover:text-gray-700">Register</span>
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
