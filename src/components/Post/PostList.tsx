import { useParams } from 'react-router-dom';
import Filter from '@/components/common/Filter';
import NoCard from '@/components/common/NoCard';
import TextButton from '@/components/common/TextButton';
import FreeBoardModal from '@/components/Modal/FreeBoardModal';
import PostItem from '@/components/Post/PostItem';
import { useModal } from '@/contexts/ModalProvider';
import { Post } from '@/types/postTypes';

interface PostListProps {
  posts: Post[] | [];
}

export default function PostList({ posts }: PostListProps) {
  const { teamId } = useParams();

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <FreeBoardModal teamId={Number(teamId)} closeClick={close} />);
  };

  return (
    <>
      <Filter />
      {/* <ul className="mt-[1.4rem] grid w-fit grid-cols-2 gap-12">
        {posts.length !== 0 ? (
          posts.map((post) => {
            return (
              <li key={post.id}>
                <PostItem post={post} />
              </li>
            );
          })
        ) : (
          <NoCard type="post" backgroundColor="bg-white">
            게시글이 없습니다.
          </NoCard>
        )}
      </ul> */}
      {teamId && (
        <TextButton
          buttonSize="sm"
          onClick={handleModalClick}
          className="absolute right-12 top-[3.6rem]"
        >
          작성하기
        </TextButton>
      )}
    </>
  );
}
