import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        {/* 404 Heading with animation */}
        <h1 className="text-9xl font-extrabold text-red-600 animate-pulse">404</h1>
        
        {/* Oops Text */}
        <h2 className="text-3xl font-semibold text-gray-700 mt-4 flex items-center justify-center">
          Oops! <span className="ml-2">😬</span> Page not found.
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          The page you&apos;re looking for isn&apos;t available right now. It may have been moved, renamed, or is currently down for maintenance. Please check the URL or go back to the homepage.
        </p>

        {/* Button Section */}
        <div className="mt-8 space-x-4">
          {/* Home Button */}
          <Link href="/" passHref>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-md shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105">
              Go Home
            </button>
          </Link>

          {/* Login Button */}
          <Link href="/login" passHref>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
