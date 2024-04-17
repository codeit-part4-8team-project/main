import { useParams } from 'react-router-dom';
import NoCard from '@/components/common/NoCard';
import TextButton from '@/components/common/TextButton';
import FreeBoardModal from '@/components/Modal/FreeBoardModal';
import PostItem from '@/components/Post/PostItem';
import { useModal } from '@/contexts/ModalProvider';
import { useTeam } from '@/contexts/TeamProvider';
import { Post } from '@/types/postTypes';

interface PostListProps {
  posts: Post[] | [];
  reloadPosts: () => void;
}

export default function TeamPostList({ posts, reloadPosts }: PostListProps) {
  const { teamId } = useParams();

  if (!teamId) throw Error('팀 페이지가 아닙니다.');

  const { team } = useTeam(teamId);

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => (
      <FreeBoardModal reloadPosts={reloadPosts} teamId={teamId} team={team} closeClick={close} />
    ));
  };

  return (
    <>
      <ul className="mt-[1.4rem] grid w-full grid-cols-2 gap-12">
        {posts.length !== 0 ? (
          posts.map((post) => {
            return (
              <li key={post.id} className="w-full">
                <PostItem post={post} />
              </li>
            );
          })
        ) : (
          <NoCard type="post" backgroundColor="bg-white">
            게시글이 없습니다.
          </NoCard>
        )}
      </ul>
      <TextButton
        buttonSize="sm"
        onClick={handleModalClick}
        className="absolute right-12 top-[3.6rem]"
      >
        작성하기
      </TextButton>
    </>
  );
}
