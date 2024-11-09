'use client'
import LoginModal from "@/app/components/Shared/Ui/LoginModal";
import { useVotePostMutation } from "@/redux/features/posts/postApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import like/dislike icons
import { PulseLoader } from "react-spinners";

const VoteSection = ({ postId, userId, votes, voters }: { postId: string, userId: string, votes: number, voters: object[] }) => {

  const [votePost, { isLoading }] = useVotePostMutation();
  const currentUser = useAppSelector(state => state.auth.user)
  const [givenVote, setGivenVote] = useState<object>();
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const isExistVote = voters?.find(voter => voter?.userId === currentUser?._id);
    setGivenVote(isExistVote);
  }, [voters, votes, currentUser, givenVote]);

  const handleVote = async (voteType: string) => {
    if (!currentUser) {
      return setLoginModal(true);
    }

    try {
      await votePost({ postId, userId, voteType }).unwrap();
    }
    catch (err) {
      console.error('Error voting:', err);
    }
  };

  return (
    <section>

      {loginModal && <LoginModal open={loginModal} setOpen={setLoginModal} />}

      <div className={`flex items-center gap-2 bg-gray-200/50 rounded-full px-3 py-1 relative`}>

        {/* loading */}
        {isLoading && <div className="w-full h-full bg-gray-100 absolute inset-0 rounded-full flex items-center justify-center">
          <PulseLoader
            color='#B1B4B9'
            size={5}
            aria-label="Loading Spinner"
            speedMultiplier={0.8} />
        </div>}

        {/* Like button */}
        {givenVote?.voteType === 'like' ?
          <button onClick={() => handleVote('like')}>
            <FaThumbsUp className={`text-gray-800 hover:text-green-600 cursor-pointer hover:scale-110 transition-transform text-xl ${givenVote?.voteType === 'like' && 'text-blue-500'}`} />
          </button> :
          <button onClick={() => handleVote('like')}>
            <FaThumbsUp className={`text-gray-800 hover:text-green-600 cursor-pointer hover:scale-110 transition-transform text-xl`} />
          </button>
        }

        <span className="font-semibold text-gray-600">{votes}</span>

        {/* Dislike button */}
        {givenVote?.voteType === 'dislike' ?
          <button onClick={() => handleVote('dislike')}>
            <FaThumbsDown className={`text-gray-800 hover:text-red-500 cursor-pointer hover:scale-110 transition-transform text-xl ${givenVote?.voteType === 'dislike' && 'text-red-500'}`} />
          </button> :
          <button onClick={() => handleVote('dislike')}>
            <FaThumbsDown className={`text-gray-800 hover:text-red-500 cursor-pointer hover:scale-110 transition-transform text-xl`} />
          </button>
        }

      </div>
    </section>
  );

};

export default VoteSection;
