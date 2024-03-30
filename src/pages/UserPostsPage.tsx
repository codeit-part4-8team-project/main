/* eslint-disable react-hooks/exhaustive-deps */
import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/PostList';
import { usePagenation } from '@/contexts/PageProvider';

export default function UserPostsPage() {
  const { dataContent } = usePagenation();

  return (
    <BoardSection title="Bulletin board">
      <div className="flex flex-col items-center gap-[4.6rem]">
        <PostList posts={dataContent} />
        <Pagenation />
      </div>
    </BoardSection>
  );
}
