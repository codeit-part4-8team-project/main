import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/PostList';
import { usePostPage } from '@/hooks/usePost';

export default function UserPostsPage() {
  /* TODO 받아온 데이터의 pageNumber로 알 수 있을 것 같기도? */
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { postPageData, fetchPostPageData } = usePostPage(currentPage);

  const { totalPages, totalElements, content } = postPageData;
  console.log(totalPages, totalElements);

  useEffect(() => {
    fetchPostPageData({ newPath: `/post/user?page=${currentPage}` });
  }, [currentPage]);

  return (
    <BoardSection title="Bulletin board">
      <div className="flex flex-col items-center gap-[4.6rem]">
        <PostList posts={content} />
        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </BoardSection>
  );
}
