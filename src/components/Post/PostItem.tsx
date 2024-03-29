import ProfileImg from '../../../public/assets/profile-large.svg';
import PostLike from '@/components/Post/PostLike';
import { toDateFormat } from '@/lib/formatDate';
import { Post } from '@/types/postTypes';
import MeatbollsIcon from '@/assets/MeatbollsIcon';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const { id, author, content, createdDate, liked, likeCount } = post;

  return (
    <div className="relative flex h-[23.3rem] max-w-[58rem] flex-col gap-[2.4rem] rounded-[2.4rem] border border-gray30 bg-white p-[2.4rem]">
      <button type="button" className="absolute right-[2.4rem] top-[2.4rem]">
        <MeatbollsIcon />
      </button>
      <div className="flex items-center gap-[1.5rem]">
        <img
          src={author.imageUrl || ProfileImg}
          alt="유저 프로필 이미지"
          className="h-[3.6rem] w-[3.6rem] rounded-full"
        />
        <div className="flex flex-col gap-[0.4rem]">
          <span className="text-body4-regular text-gray100">#{author.name}</span>
          <span className="text-body4-regular text-gray50">{toDateFormat(createdDate)}</span>
        </div>
      </div>
      <span className="inline-block h-[7.7rem] w-full max-w-[44.9rem] overflow-auto text-body4-regular text-gray100">
        {content}
      </span>
      <div className="absolute bottom-[2.4rem] left-[2.7rem]">
        <PostLike postId={id} liked={liked} likeCount={likeCount} />
      </div>
    </div>
  );
}
