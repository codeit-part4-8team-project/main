import { useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/PostList';
import usePost from '@/hooks/usePost';

export default function UserPostsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    postPageData: { content },
  } = usePost();

  return (
    <BoardSection title="Bulletin board">
      <div className="flex flex-col items-center gap-[4.6rem]">
        <PostList posts={content || []} />
        <Pagenation currentPage={currentPage} />
      </div>
    </BoardSection>
  );
}
