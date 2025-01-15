'use client'

import { FaCheckCircle } from 'react-icons/fa';
import { BsEnvelopeFill, BsThreeDots } from 'react-icons/bs';
import { useFollowUserMutation, useGetSingleUserQuery, useUnFollowUserMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/redux/features/authentication/authSlice';
import Image from 'next/image';
import { MdModeEdit } from "react-icons/md";
import CreatePost from '../../(home)/components/CreatePost/CreatePost';

import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import { RiUserUnfollowLine } from "react-icons/ri";
import { useState } from 'react';
import EditProfileModal from '../components/EditProfileModal';
import Followers from '../components/Followers';
import MyPosts from '../components/MyPosts';

const Profile = ({ params} : { params: { userEmail: string}}) => {
  const { userEmail } = params;

    const loggedUser = useAppSelector(state => state.auth.user)
    const [ editModal, setEditModal ] = useState(false);

    const { data } = useGetSingleUserQuery(userEmail);
    const userDetails : TUser = data?.data || {};


    const {email, image,memberShip,name, coverImg , followers, following} = userDetails;
  

        // follow and unfollow 
        const [ followUser , { isLoading: followLoading }] = useFollowUserMutation();
        const [ unfollowUser , { isLoading: unFollowLoading }] = useUnFollowUserMutation();
    



    const handleFollow = async () => {
      try{
          const response = await followUser({
              userId : loggedUser?._id as string ,
              targetedUserId : userDetails?._id as string ,
          })
          if(response?.success){
              toast.success('You followed the user')
            }

      }catch(error){
          toast.error("Something went wrong")
          console.log(error)
      }
  }

    const handleUnfollow = async () => {
      try{
          const response = await unfollowUser({
              userId : loggedUser?._id as string ,
              targetedUserId : userDetails?._id as string ,
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
        <div className=" md:bg-white  p-2 md:p-4 rounded-lg ">
        {/* Cover Photo */}
        <div className="relative">
          <Image
            src={coverImg || 'https://i.postimg.cc/N0ZB4gJ3/3ac7072a310f60109fc04e3d4f469bbe.jpg'}
            alt="Cover"
            width={600}
            height={600}
            className="w-full h-28 md:h-44 lg:h-52 object-cover object-center rounded-t-lg"
          />
          <div className="relative lg:left-4 -top-2 md:-top-7 flex items-center space-x-4">
            <Image
             src={image}
              alt="Profile"
              width={300}
              height={300}
              className="size-20 md:size-36 rounded-full border-4 boder-gray-200  object-cover "
            />
            <div>
              <h1 className=  "text-xl md:text-2xl font-bold flex items-center">
                {name}
                {memberShip && <FaCheckCircle className="text-gray-800 ml-2" />}
              </h1>
              <p className="text-gray-600 ">{email}</p>
            </div>
          </div>
        </div>

        {/* Open Edit Modal  */}
        {editModal && <EditProfileModal open={editModal} setOpen={setEditModal}/>}
  
        {/* Profile Details */}
        <div className="flex justify-between">

        {loggedUser?.email !== userDetails.email &&   <div className="flex items-center gap-3">

          {userDetails?.followers?.find(follower => follower?.email === loggedUser?.email) ? <>
          
          <button onClick={handleUnfollow}
             className="bg-gray-200   px-2 md:px-4 py-2 text-sm md:text-base rounded-lg flex items-center font-semibold gap-2">
            {!(followLoading || unFollowLoading) && <RiUserUnfollowLine />}  {(followLoading || unFollowLoading)?  <ClipLoader
           color='#171A16'
           size={16}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> : 'Unfollow'}
          </button></> 
          
          : 
          <><button onClick={handleFollow} className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 text-sm md:text-base rounded-lg flex items-center font-semibold gap-2">
           
          {(followLoading || unFollowLoading)?  <ClipLoader
           color='#ffffff'
           size={16}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> : 'Follow'}
          </button></>}


            <button className="bg-gray-200  px-2 md:px-4 py-2 text-sm md:text-base rounded-lg flex items-center font-semibold">
              <BsEnvelopeFill className="mr-2" />
             
              Message
            </button>
          </div>}

          <div className="space-y-1 flex items-center">
           {loggedUser?.email === userDetails?.email &&  <button onClick={()=> setEditModal(true)} className="bg-gray-200   px-2 md:px-4 py-2 text-sm md:text-base rounded-lg flex items-center font-semibold">
              <MdModeEdit className="mr-2" />
             Edit Profile
            </button>}
            <button className="bg-gray-200  px-2 md:px-4 h-full hidden md:block  text-sm md:text-base rounded-lg ml-2">
              <BsThreeDots />
            </button>
          </div>
        </div>

   
      {console.log(userDetails?.email)}
      <Followers followers={followers} following={following} ranDomUserEmail={userDetails?.email}/>
  
  
        {/* Membership Section */}
      {memberShip &&   <div className={`mt-4 mb-8 p-4 bg-white rounded-lg shadow`}>
          <h2 className="text-lg text-gray-600 font-bold ">Membership</h2>
          <div className="flex items-center mt-2">
            <div className="text-gray-600 font-bold text-xl">{memberShip?.package?.name}</div>
            <span className="ml-auto bg-white  py-1 px-3 rounded-md text-gray-500  font-semibold">Developer</span>
          </div>
          <p className="text-gray-500 mt-2 ">
           You are well on your way to mastering your membership benefits! Keep it up!
          </p>
        </div>}

        {/* create post section  */}
        {loggedUser?.email === userDetails?.email && <CreatePost/>
        }

        {/* user posts  */}
        <MyPosts userEmail={userDetails?.email} />
      </div>
    );
};

export default Profile;