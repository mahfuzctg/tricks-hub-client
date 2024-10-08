

const PostSkeleton = () => {
    return (
        <div className="p-4 mt-3 border border-gray-200 rounded-md shadow-sm w-full  mx-auto space-y-4">
        {/* <!-- User Info Skeleton --> */}
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
                <div className="w-32 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-20 h-3 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
        </div>
    
        {/* <!-- Text Content Skeleton --> */}
        <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded-md animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4"></div>
        </div>
    
        {/* <!-- Images Skeleton --> */}
        <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 h-48 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-24 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-24 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-24 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
    
        {/* <!-- Action Buttons Skeleton (Likes, Comments, Share) --> */}
        <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
                <div className="w-8 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-8 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-8 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="w-12 h-4 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
    
        {/* <!-- Comment Section Skeleton --> */}
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                    <div className="w-24 h-3 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="w-32 h-3 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default PostSkeleton;