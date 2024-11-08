import { TUser } from "@/redux/features/authentication/authSlice";
import { useUnFollowUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { RiUserUnfollowLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

type TProps = {
    followers : TUser[];
    following : TUser[];
    ranDomUserEmail : string;
}

const Followers  = ({ followers, following, ranDomUserEmail} : TProps) => {
  const loggedUser = useAppSelector(state => state.auth.user)
  const [ unfollowUser , { isLoading: unFollowLoading }] = useUnFollowUserMutation();


  const handleUnfollow = async (targetedId) => {
    try{
        const response = await unfollowUser({
            userId : loggedUser?._id as string ,
            targetedUserId : targetedId ,
        })
        if(response?.success){
            toast.success('You unfollowed the user')
          }

    }catch(error){
        toast.error("Something went wrong")
        console.log(error)
    }
}


    return (
  
        <div className="flex flex-col gap-5 mt-3">
         
  
          {/* Following Section */}
         {following?.length?  <div className="lg:hidden bg-white dark:bg-gray-900/60 md:bg-gray-100/50 p-6 rounded-lg relative">

          {unFollowLoading && <div className="w-full h-full absolute top-0 left-0 z-50 right-0 bottom-0 bg-white/80 dark:bg-gray-800/70 rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#3B82F6'
           size={38}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}

            <h2 className="text-lg text-gray-600 dark:text-gray-400 font-semibold mb-4">Following ({following?.length})</h2>
            <div className="space-y-4 max-h-28 overflow-y-scroll">
              {following?.map(user => (
                <div key={user?.id} className="flex items-center space-x-4 pb-2 border-b dark:border-gray-700 ">
                  <Image width={50} height={50}
                    src={user?.image}
                    alt={user?.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="w-full flex items-center justify-between gap-3">
                    <p className="font-medium text-gray-600 dark:text-gray-400">{user?.name}</p>

                {loggedUser?.email === ranDomUserEmail && 
                    <button
                    onClick={()=> handleUnfollow(user?._id)} 
                     className="bg-blue-500 dark:bg-blue-600 text-white px-2 md:px-3 py-2 text-sm md:text-sm rounded-md flex items-center font-semibold">
              <RiUserUnfollowLine className="mr-2" />
             Unfollow
            </button>}

                  </div>
                </div>
              ))}
            </div>
          </div> : ""}

           {/* Followers Section */}
         {followers?.length?  <div className="bg-white dark:bg-gray-900/60 md:bg-gray-100/50 p-6 rounded-lg">
            <h2 className="text-lg text-gray-600 dark:text-gray-400 font-semibold mb-4">Followers ({followers?.length}) </h2>
            <div className="space-y-4 max-h-28 overflow-y-scroll">
              {followers?.map(follower => (
                <div key={follower?._id} className="flex items-center space-x-4 border-b dark:border-gray-700 rounded-md pb-1">
                  <Image width={50} height={50}
                    src={follower?.image}
                    alt={follower?.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-600 dark:text-gray-400">{follower?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> : ""}
        </div>
    );
  };
  
  export default Followers;
  