import { useGetPostsQuery } from "@/redux/features/posts/postApi";

import { TPost } from "../../(home)/components/CreatePost/CreatePostModal";
import PostCard from "../../(home)/components/posts/PostCard";
import PostSkeleton from "../../(home)/components/posts/PostSkeleton";


const MyPosts = ({userEmail} : { userEmail : string}) => {
    const { data , isFetching } = useGetPostsQuery({ userEmail});
    const { posts} = data?.data || {};

    return (
          <>
           {/* Grid section  */}
           <div className="grid grid-cols-1 gap-7  mb-8 ">
           {posts?.map((post: TPost) => <PostCard key={post._id} post={post} /> )}

           {/* Card placeholder  */}
           {isFetching && [1, 2, 3, 4].map((num) => <PostSkeleton key={num} /> )}
       </div> 

         {/* no posts direction  */}
       { (!posts || !posts.length) && <p className="text-lg mt-4 text-gray-500 text-center">No Posts</p>}</>

    );
};

export default MyPosts;