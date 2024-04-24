import { useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Post } from '@/types/postTypes';
import HeartIcon from '@/assets/HeartIcon';

interface LikeProps {
  postId?: number;
  liked: boolean;
  likeCount: number;
  commentId?: number;
}

export default function PostLike({ postId, liked, likeCount, commentId }: LikeProps) {
  const [isLiked, setIsLiked] = useState(liked); // 로그인된 유저가 이 포스트에 좋아요를 눌렀는지 여부
  const [newLikeCount, setNewLikeCount] = useState(likeCount);
  const { fetchData: postLikeInfo } = useAxios<Post>({});
  const { fetchData: commentLikeInfo } = useAxios({});

  const likePostFetch = () => {
    if (postId) {
      postLikeInfo({
        newPath: `/post/${isLiked ? 'unlike' : 'like'}/${postId}`,
        newMethod: 'POST',
      });
    } else if (commentId) {
      commentLikeInfo({
        newPath: `/comment/${isLiked ? 'unlike' : 'like'}/${commentId}`,
        newMethod: 'POST',
      });
    }
  };

  const handleLikeClick = () => {
    likePostFetch();
    setIsLiked(!isLiked);
    !isLiked ? setNewLikeCount(newLikeCount + 1) : setNewLikeCount(newLikeCount - 1);
  };

  return (
    <div className="flex items-center gap-[0.2rem]">
      <button type="button" onClick={handleLikeClick}>
        <HeartIcon active={isLiked} />
      </button>
      <span className="text-[1.2rem] leading-[1.6rem] text-gray50">{newLikeCount}</span>
    </div>
  );
}
