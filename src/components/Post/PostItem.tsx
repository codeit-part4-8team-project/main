import ProfileImg from '../../../public/assets/profile-large.svg';
import PostLike from '@/components/Post/PostLike';
import { toDateFormat } from '@/lib/formatDate';
import { Post } from '@/types/postTypes';
import MeatbollsIcon from '@/assets/MeatbollsIcon';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const { id, author, title, content, createdDate, liked, likeCount, team } = post;

  const { color, name } = team;

  return (
    <div className="relative flex h-[23.3rem] w-[58rem] flex-col gap-[2.4rem] rounded-[2.4rem] border border-gray30 bg-white p-[2.4rem]">
      <button type="button" className="absolute right-[2.4rem] top-[2.4rem]">
        <MeatbollsIcon />
      </button>
      <div className="flex h-[3.6rem] items-center gap-[1.5rem]">
        <img
          src={author.imageUrl || ProfileImg}
          alt="유저 프로필 이미지"
          className="h-[3.6rem] w-[3.6rem] rounded-full"
        />
        <div className="flex flex-col items-start gap-[0.4rem]">
          <div className="flex gap-[1.6rem]">
            <span className="text-body4-regular text-gray100">#{author.name}</span>
            <button
              style={{ color }} /* TODO 임시 */
              className={`bottom-8 left-8 flex h-[1.8rem] items-center justify-center rounded-[4rem] border px-4 py-[0.6rem] text-[0.8rem] font-medium`}
            >
              {name}
            </button>
          </div>
          <span className="text-body4-regular text-gray50">{toDateFormat(createdDate)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <span className="text-body4-bold text-gray100">{title}</span>
        <span className="inline-block h-[5.9rem] w-full overflow-auto text-body4-regular text-gray100">
          {content}
        </span>
      </div>
      <div className="absolute bottom-[2.4rem] left-[2.7rem]">
        <PostLike postId={id} liked={liked} likeCount={likeCount} />
      </div>
    </div>
  );
}
