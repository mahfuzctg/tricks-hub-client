"use client";

import { useEffect, useState } from "react";
import { useGetPostsQuery } from "@/redux/features/posts/postApi";
import PostCard from "./PostCard";
import { TPost } from "../CreatePost/CreatePostModal";
import PostSkeleton from "./PostSkeleton";
import { TfiSearch } from "react-icons/tfi";
import { useInView } from "react-intersection-observer";

export default function PostSection() {
  const [filterQuery, setFilterQuery] = useState({});
  const { data, isFetching } = useGetPostsQuery({ ...filterQuery }); // No skip or limit
  const { totalPosts, posts } = data?.data || {};

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      const isFilterExist = Object.keys(filterQuery).find(option =>
        ['category', 'searchTerm', 'sortByUpvote'].includes(option)
      );

      console.log(posts?.length, totalPosts);

      if (!isFilterExist && posts?.length < totalPosts) {
        setFilterQuery({ ...filterQuery, limit: posts.length + 10 });
      }
      return;
    }
  }, [inView, filterQuery, posts, totalPosts]);

  return (
    <section className="py-6">
      <section className="my-2">
        <section>
          {/* Filtering Section with Search Field at the Start */}
          <div className="flex justify-between items-center my-3 gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-auto flex-1 md:flex-none">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                <TfiSearch />
              </span>
              <input
                onChange={(e) => setFilterQuery(prev => ({ ...prev, searchTerm: e.target.value }))}
                type="text"
                className="w-full rounded-full outline-none placeholder:text-gray-500 py-2 pl-10 pr-4 bg-white shadow-md focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>

            {/* Sort and Category Selectors */}
            <div className="flex gap-4 items-center">
              <select
                onChange={(e) => setFilterQuery(prev => ({ ...prev, sortByUpvote: e.target.value }))}
                className="p-2 shadow-md rounded-full outline-1 text-xs md:text-sm bg-white"
              >
                <option disabled selected>Sort by Upvote</option>
                <option value='-1'>Most Upvoted</option>
                <option value='1'>Most Downvoted</option>
              </select>

              <select
                onChange={(e) => setFilterQuery(prev => ({ ...prev, category: e.target.value }))}
                className="p-2 shadow-md rounded-full text-xs md:text-sm bg-white"
              >
                <option disabled selected>Select Category</option>
                <option value=''>All</option>
                <option value='Web'>Web</option>
                <option value='Software Engineering'>Software Engineering</option>
                <option value='AI'>AI</option>
                <option value='Technology'>Technology</option>
              </select>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 gap-7 mb-8">
            {/* Check if posts exist and display accordingly */}
            {posts?.length > 0 ? (
              posts.map((post: TPost) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="text-center text-xl text-gray-500 mt-6">
                {isFetching ? (
                  // Show skeleton loading state
                  [1, 2].map((num) => <PostSkeleton key={num} />)
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-2">😢</span>
                    <p className="font-semibold">Oops! No data found...</p>
                    <p className="text-gray-400 mt-1">Try adjusting your search or check back later!</p>
                  </div>
                )}
              </div>
            )}

            <div ref={ref} className="text-center text-xl text-gray-500 mt-6">
              {posts?.length < totalPosts && !isFetching && (
                <p className="font-semibold">Scroll down to load more posts</p>
              )}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
