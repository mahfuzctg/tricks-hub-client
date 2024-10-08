import Link from "next/link";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-500 mt-4">
          Oops! Page not found.
        </h2>
        <p className="text-gray-500 mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn btn-primary px-7 bg-gray-100 hover:bg-gray-200 text-blue-500 mx-2 border-none rounded-md">
            Home
          </Link>
          <Link href="/login" className="btn btn-secondary px-7 bg-gray-100 text-gray-500 border-none hover:bg-gray-200 mx-2 rounded-md">
            Login
          </Link>
        </div>
      </div>
   
    </div>
  );
};

export default NotFound;
