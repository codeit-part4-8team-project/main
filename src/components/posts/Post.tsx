import { PostType } from '@/types/postTypes';
import MeatbollsIcon from '@/assets/MeatbollsIcon';
import ProfileIcon from '@/assets/ProfileIcon';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const { author, content, createdDate } = post;

  return (
    <div className="relative flex h-[23.3rem] w-[49.7rem] flex-col gap-[2.4rem] rounded-[2.4rem] border border-gray30 bg-white p-[2.4rem]">
      <MeatbollsIcon className="absolute right-[2.4rem] top-[2.4rem]" />
      <div className="flex gap-[1.5rem]">
        <ProfileIcon size="lg" className="row-span-2" />
        <div className="flex flex-col gap-[0.4rem]">
          <span className="text-body4-regular text-gray100">{author.name}</span>
          <span className="text-body4-regular text-gray50">{createdDate}</span>
        </div>
      </div>
      <span className="text-body4-regular text-gray100">{content}</span>
    </div>
  );
}
