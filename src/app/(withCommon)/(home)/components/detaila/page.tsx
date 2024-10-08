'use client';

import { useAppSelector } from "@/redux/hooks";
import CreatePost from "../CreatePost/CreatePost";
import PostSection from "../posts/PostSection";



const Home = () => {
    const currentUser = useAppSelector(state => state.auth.user)
    return (
        <>
          {currentUser && <CreatePost/>}
           <PostSection/>
        </>
    );
};

export default Home;