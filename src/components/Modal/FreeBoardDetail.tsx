import Comment from '@/components/common/modal/Comment';
import ModalLayout from '@/components/common/modal/ModalLayout';
import FreeBoardEditModal from '@/components/Modal/FreeBoardEdit';
import PostLike from '@/components/Post/PostLike';
import { useModal } from '@/contexts/ModalProvider';
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
  author: Author;
  content: string;
  createdDate: string;
  title: string;
  likeCount: number;
  liked: boolean;
  // author?: Author;
  // content?: string;
  // createdDate?: string;
  // title?: string;
  // likeCount?: number;
  // liked?: boolean;
}

export default function FreeBoardDetail({
  closeClick,
  postId,
  // likeCount,
  // liked,
}: FreeBoardDetailProps) {
  const { data: defaultValue } = useAxios<DefalutVauleType>(
    {
      path: `post/${postId}`,
    },
    true,
  );
  const { fetchData: deleteFetch } = useAxios({});
  const openModal = useModal();

  const handleDelete = () => {
    const confirmDelete = window.confirm('이 이슈를 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteFetch({
        newPath: `post/${postId}`,
        newMethod: 'DELETE',
      });
    }
  };

  const handleEdit = () => {
    openModal(({ close }) => <FreeBoardEditModal postId={postId} closeClick={close} />);
  };

  if (defaultValue === null) {
    return <div>로딩중..</div>;
  }

  const { author, content, createdDate, likeCount, liked, title }: DefalutVauleType = defaultValue;
  const cutDateString = createdDate?.substring(0, 10);
  return (
    <>
      <ModalLayout
        deleteOnClick={handleDelete}
        editOnClick={handleEdit}
        detail={true}
        edit={true}
        title={title}
        closeClick={closeClick}
        className="w-[57.7rem] pb-0"
      >
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
        </div>
      </ModalLayout>
      <Comment postId={postId}>
        <PostLike postId={postId} likeCount={likeCount} liked={liked} />
      </Comment>
    </>
  );
}
