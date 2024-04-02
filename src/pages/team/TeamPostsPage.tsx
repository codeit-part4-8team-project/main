import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/PostList';
import { usePagenation } from '@/contexts/PageProvider';
import { Post } from '@/types/postTypes';

/* TODO 페이지네이션 생기면서 UserPostPage와 파일이 완전히 동일해짐 */
export default function TeamPostsPage() {
  const { dataContent } = usePagenation();

  return (
    <BoardSection title="Bulletin board">
      <div className="flex h-full flex-col items-center justify-between gap-[4.6rem]">
        <PostList posts={dataContent as Post[]} />
        <Pagenation />
      </div>
    </BoardSection>
  );
}
