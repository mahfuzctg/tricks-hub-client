'use client';

import { useAppSelector } from "@/redux/hooks";
import CreatePost from "./components/CreatePost/CreatePost";
import PostSection from "./components/posts/PostSection";


// import PostSection from "./components/Posts/PostSection";


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