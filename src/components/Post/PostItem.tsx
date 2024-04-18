import FreeBoardDetail from '@/components/Modal/FreeBoardDetail';
import PostLike from '@/components/Post/PostLike';
import { useModal } from '@/contexts/ModalProvider';
import { toDateFormat } from '@/lib/formatDate';
import { useAxios } from '@/hooks/useAxios';
import { Comments } from '@/types/commentTypes';
import { Post } from '@/types/postTypes';
import CommentIcon from '@/assets/CommentIcon';
import ProfileImg from '@/assets/assets/profile-large.svg';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const { id, author, title, content, createdDate, liked, likeCount, team } = post;

  const { color, name } = team;

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => (
      <FreeBoardDetail closeClick={close} postId={id} liked={liked} likeCount={likeCount} />
    ));
  };

  const { data } = useAxios<Comments>(
    {
      path: `comment/post/${id}?page=1`,
    },
    true,
  );

  return (
    <div
      onClick={handleModalClick}
      className="relative flex w-full cursor-pointer flex-col gap-[2.4rem] rounded-[2.4rem] border border-gray30 bg-white p-[2.4rem]"
    >
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
              style={{ color }}
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
      <div className="absolute bottom-[2.4rem] left-[2.7rem] flex gap-[0.6rem]">
        <PostLike postId={id} liked={liked} likeCount={likeCount} />
        <div className="flex items-center gap-[0.2rem]">
          <CommentIcon />
          <span className="text-[1.2rem] leading-[1.6rem] text-gray50">
            {data?.totalElements || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
