import ModalLayout from '@/components/common/modal/ModalLayout';
import PostLike from '@/components/Post/PostLike';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';

interface FreeBoardDetailProps {
  closeClick: () => void;
  postId: number;
  liked: boolean;
  likeCount: number;
}

interface DefalutVauleType {
  author?: Author;
  content?: string;
  createdDate?: string;
  title?: string;
}
//여기도 합칠때 지우기
// 여기 하트 물어보고 만들기
export default function FreeBoardDetail({
  closeClick,
  postId,
  liked,
  likeCount,
}: FreeBoardDetailProps) {
  const { data: defaultValue } = useAxios<DefalutVauleType>(
    {
      path: `post/${postId}`,
    },
    true,
  );
  console.log(defaultValue);
  // const { author, content, createdDate, likeCount }: DefalutVauleType = defaultValue || {};
  const { author, content, createdDate }: DefalutVauleType = defaultValue || {};
  const cutDateString = createdDate?.substring(0, 10);

  return (
    <ModalLayout title="자유게시판" closeClick={closeClick} className="w-[57.7rem]">
      <div className="mx-[2.4rem]">
        <div className="mb-[2.4rem] mt-16 flex gap-[1.5rem]">
          <img
            src={author?.imageUrl}
            alt="팀관리자이미지"
            className="h-[3.6rem] w-[3.6rem] rounded-[999rem]"
          />
          <div>
            <p className="text-body4-regular">{author?.username}</p>
            <p className="text-body4-regular text-gray50">{cutDateString}</p>
          </div>
        </div>
        <PostLike postId={postId} likeCount={likeCount} liked={liked} />
        <p className="text-body4-regular">{content}</p>
        {/* <p className="text-gray50">{likeCount}</p> */}
      </div>
    </ModalLayout>
  );
}
