"use client";

import { useEffect, useState } from "react";
import { useGetPostsQuery } from "@/redux/features/posts/postApi";
import { TfiSearch } from "react-icons/tfi";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { TPost } from "../(home)/components/CreatePost/CreatePostModal";
import PostSkeleton from "../(home)/components/posts/PostSkeleton";
import PostCard from "../(home)/components/posts/PostCard";

export default function PremiumPostSection() {
  const [filterQuery, setFilterQuery] = useState({
    limit: 10,
    searchTerm: "",   // To store the search term
    sortByUpvote: "", // To store the sort option for upvotes
    category: "",     // To store the category filter
  });

  const { data, isFetching } = useGetPostsQuery(filterQuery);
  const { totalPosts, posts } = data?.data || {};

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && !isFetching && posts?.length < totalPosts) {
      setFilterQuery((prev) => ({
        ...prev,
        limit: prev.limit + 4,
      }));
    }
  }, [inView, posts, totalPosts, isFetching]);

  // Filter only premium posts
  const premiumPosts = posts?.filter((post: TPost) => post.isPremium);

  return (
    <section className="py-6">
      <section className="my-2">
        <div className="flex justify-between items-center my-3 gap-4">
          <div className="relative w-full md:w-auto flex-1 md:flex-none">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
              <TfiSearch />
            </span>
            <input
              onChange={(e) => setFilterQuery((prev) => ({ ...prev, searchTerm: e.target.value }))}
              type="text"
              className="w-full rounded-full outline-none placeholder:text-gray-500 py-2 pl-10 pr-4 bg-white shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>

          <div className="flex gap-4 items-center">
            <select
              onChange={(e) => setFilterQuery((prev) => ({ ...prev, sortByUpvote: e.target.value }))}
              className="p-2 shadow-md rounded-full outline-1 text-xs md:text-sm bg-white"
            >
              <option disabled selected>Sort by Upvote</option>
              <option value="-1">Most Upvoted</option>
              <option value="1">Most Downvoted</option>
            </select>

            <select
              onChange={(e) => setFilterQuery((prev) => ({ ...prev, category: e.target.value }))}
              className="p-2 shadow-md rounded-full text-xs md:text-sm bg-white"
            >
              <option disabled selected>Select Category</option>
              <option value="">All</option>
              <option value="Web">Web</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI">AI</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 mb-8">
          {premiumPosts?.length > 0 ? (
            premiumPosts.map((post: TPost) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="text-center text-xl text-gray-500 mt-6">
              {isFetching ? (                        
                [1, 2].map((num) => <PostSkeleton key={num} />)
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">😢</span>
                  <p className="font-semibold">No premium posts found...</p>
                  <p className="text-gray-400 mt-1">Check back later for more premium content!</p>
                </div>
              )}
            </div>
          )}

          <motion.div
            ref={ref}
            className="text-center text-xl text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {premiumPosts?.length < totalPosts && !isFetching && (
              <motion.p
                className="font-semibold text-gray-500"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Scroll down to load more premium posts...
              </motion.p>
            )}

            {isFetching && (
              <div className="flex justify-center items-center mt-4">
                <FaSpinner className="animate-spin text-gray-500" size={30} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </section>
  );
}
