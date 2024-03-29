import { useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/PostList';
import { usePostPage } from '@/hooks/usePost';

export default function UserPostsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log('currentPage', currentPage);

  const {
    postPageData: { content },
  } = usePostPage(1);

  return (
    <BoardSection title="Bulletin board">
      <div className="flex flex-col items-center gap-[4.6rem]">
        <PostList posts={content} />
        <Pagenation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </BoardSection>
  );
}
