import { FaEnvelope, FaUser } from "react-icons/fa";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { ApiResponse, TUser,  } from "@/types"; 
import { useFollowUserMutation, useGetSingleUserQuery } from "@/redux/features/user/userApi";

const MiniUserProfile = ({
  userInfo,
}: {
  userInfo: {
    email: string;
    image: string;
    name: string;
    role: string;
    authorId: string;
    authorEmail: string;
  };
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [followUser, { isLoading }] = useFollowUserMutation();

  // Get the author data to check if the currentUser follows them
  const { data } = useGetSingleUserQuery(userInfo?.authorEmail);
  const latestAuthorData: TUser = data?.data || {};

  const handleFollow = async () => {
    try {
      const response = (await followUser({
        userId: user?._id as string,
        targetedUserId: userInfo.authorId,
      })) as ApiResponse<TUser>;

      if (response.success) {
        toast.success("You followed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <section className="hidden absolute top-8 left-0 group-hover:block">
      <div className="mt-7">
        <div className="bg-white shadow-2xl border-t-4 border-gray-100 rounded-lg w-80 p-4">
          <div className="flex items-center">
            <Image
              width={300}
              height={300}
              src={userInfo?.image}
              alt="User"
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="font-bold text-lg">{userInfo?.name}</h2>
              <p className="text-gray-500 flex items-center capitalize">
                <FaUser className="mr-2" /> {userInfo?.role}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaEnvelope className="mr-2" /> {userInfo?.email}
              </p>
            </div>
          </div>

          {/* Buttons */}
          {user?.email === userInfo?.email ? (
            <div className="flex mt-4 space-x-2">
              <button className="flex-1 font-semibold bg-gray-600 hover:bg-gray-500 text-white py-1 px-4 rounded-full">
                Create Post
              </button>
              <Link href={`/profile/${userInfo?.email}`}>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded-full font-semibold">
                  View Profile
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex mt-4 space-x-2">
              {/* Follow/Following Button */}
              {latestAuthorData?.followers?.includes(user?._id as string) ? (
                <button className="flex-1 bg-gray-500 text-white py-1 px-4 rounded-full font-semibold">
                  Following
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="flex-1 font-semibold bg-gray-600 hover:bg-gray-500 text-white py-1 px-4 rounded-full"
                >
                  {isLoading ? (
                    <ClipLoader
                      color="#ffffff"
                      size={16}
                      aria-label="Loading Spinner"
                      speedMultiplier={0.8}
                    />
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
              <Link href={`/profile/${userInfo?.email}`}>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded-full font-semibold">
                  View Profile
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MiniUserProfile;
