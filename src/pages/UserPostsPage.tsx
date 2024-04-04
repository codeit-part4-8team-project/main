/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Filter from '@/components/common/Filter';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/PostList';
import { usePagenation } from '@/contexts/PageProvider';
import { Post } from '@/types/postTypes';

export default function UserPostsPage() {
  const { dataContent, currentPage, checkedTeamId, setCheckedTeamId } = usePagenation();
  const [postData, setPostData] = useState<Post[]>(dataContent as Post[]);

  useEffect(() => {
    setPostData(dataContent as Post[]);
  }, [checkedTeamId, currentPage, dataContent]);

  return (
    <>
      <BoardSection title="Bulletin board">
        <div className="flex h-full flex-col items-center justify-between gap-[4.6rem]">
          <Filter
            checkedTeamId={checkedTeamId || []}
            setCheckedTeamId={setCheckedTeamId || (() => {})}
          />
          <PostList posts={postData} />
          <Pagenation />
        </div>
      </BoardSection>
    </>
  );
}
