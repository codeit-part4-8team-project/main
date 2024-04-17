import Comment from '@/components/common/modal/Comment';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';

// 나중에 좋아요 타입 삭제하기
interface FreeBoardDetailProps {
  closeClick: () => void;
  postId: number;
  liked: boolean;
  likeCount: number;
}
// 나중에 좋아요 버튼 어떻게할지 해결하기
interface DefalutVauleType {
  author?: Author;
  content?: string;
  createdDate?: string;
  title?: string;
}

export default function FreeBoardDetail({ closeClick, postId }: FreeBoardDetailProps) {
  const { data: defaultValue } = useAxios<DefalutVauleType>(
    {
      path: `post/${postId}`,
    },
    true,
  );
  
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
            <p className="text-body4-regular">{author?.name}</p>
            <p className="text-body4-regular text-gray50">{cutDateString}</p>
          </div>
        </div>
        <p className="mb-[2.4rem] text-body4-regular">{content}</p>
        <Comment postId={postId} />
      </div>
    </ModalLayout>
  );
}
