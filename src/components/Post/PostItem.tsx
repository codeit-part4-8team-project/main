import { Post } from '@/types/postTypes';
import HeartIcon from '@/assets/HeartIcon';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import ProfileIcon from '@/assets/ProfileIcon';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const { author, content, createdDate } = post;

  return (
    <div className="relative flex h-[23.3rem] max-w-[58rem] flex-col gap-[2.4rem] rounded-[2.4rem] border border-gray30 bg-white p-[2.4rem]">
      <button type="button" className="absolute right-[2.4rem] top-[2.4rem]">
        <MeatbollsIcon />
      </button>
      <div className="flex items-center gap-[1.5rem]">
        <ProfileIcon size="lg" className="row-span-2" />
        <div className="flex flex-col gap-[0.4rem]">
          <span className="text-body4-regular text-gray100">{author.name}</span>
          <span className="text-body4-regular text-gray50">{createdDate}</span>
        </div>
      </div>
      <span className="inline-block h-[7.7rem] w-full max-w-[44.9rem] overflow-auto text-body4-regular text-gray100">
        {content}
      </span>
      <div className="absolute bottom-[2.4rem] left-[2.7rem] flex items-center gap-[0.2rem]">
        <button type="button">
          <HeartIcon active={true} />
        </button>
        <span className="text-[1.2rem] leading-[1.6rem] text-gray50">1</span>
      </div>
    </div>
  );
}
