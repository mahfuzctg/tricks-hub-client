"use client";

import { useState } from "react";
import { useGetPostsQuery } from "@/redux/features/posts/postApi";
import { TfiSearch } from "react-icons/tfi";
import { TPost } from "@/app/(withCommon)/(home)/components/CreatePost/CreatePostModal";
import { useAppSelector } from "@/redux/hooks";
import PostSkeleton from "@/app/(withCommon)/(home)/components/posts/PostSkeleton";
import MiniPostCard from "../../admin-dashboard/components/MiniPostCard";

export default function PostSection() {
  const user = useAppSelector((state) => state.auth.user);
  const [filterQuery, setFilterQuery] = useState({ userEmail: user?.email });
  const { data, isFetching } = useGetPostsQuery({ ...filterQuery });
  const posts = data?.data?.posts || [];

  return (
    <section className="my-4">
      <section>
        {/* Filtering Section */}
        <div className="flex flex-wrap justify-between gap-4 md:gap-6 mt-4">
          {/* Search Input for Large Screens */}
          <div className="relative flex items-center w-full md:w-72 shadow-lg rounded-lg p-3">
            <span className="absolute left-4 text-gray-500">
              <TfiSearch />
            </span>
            <input
              onChange={(e) =>
                setFilterQuery((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
              type="text"
              className="w-full py-2 pl-10 pr-3 rounded-lg border border-gray-300 outline-none placeholder:text-gray-500"
              placeholder="Search..."
            />
          </div>

          {/* Sorting by Upvote */}
          <div className="w-full md:w-auto">
            <select
              onChange={(e) =>
                setFilterQuery((prev) => ({ ...prev, sortByUpvote: e.target.value }))
              }
              className="w-full md:w-auto p-3 rounded-lg bg-white shadow-lg border border-gray-300 text-sm"
            >
              <option disabled selected>
                Sort by Upvote
              </option>
              <option value="-1">Most Upvoted</option>
              <option value="1">Most Downvoted</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <select
              onChange={(e) =>
                setFilterQuery((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full md:w-auto p-3 rounded-lg bg-white shadow-lg border border-gray-300 text-sm"
            >
              <option disabled selected>
                Select Category
              </option>
              <option value="">All</option>
              <option value="Web">Web</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI">AI</option>
              <option value="Technology">Technology</option>
              <option value="Reality">Reality</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 ">
          {posts.length > 0 ? (
            posts.map((post: TPost) => <MiniPostCard key={post._id} post={post} />)
          ) : (
            // Display message when there are no posts and fetching is complete
            !isFetching && (
              <p className="text-2xl font-bold mt-10 text-gray-600 text-center">
                You do not have any posts, create one and connect with us! 🌟
              </p>
            )
          )}

          {/* Card Placeholders while fetching */}
          {isFetching && [1, 2].map((num) => <PostSkeleton key={num} />)}
        </div>
      </section>
    </section>
  );
}
