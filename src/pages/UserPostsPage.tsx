/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
// import Filter from '@/components/common/Filter';
import Pagenation from '@/components/common/pagenation/Pagenation';
import UserPostList from '@/components/Post/UserPostList';
import { usePagenation } from '@/contexts/PageProvider';
import { Post } from '@/types/postTypes';

export default function UserPostsPage() {
  const { dataContent, currentPage, checkedTeamId /* , setCheckedTeamId  */ } = usePagenation();
  const [postData, setPostData] = useState<Post[]>(dataContent as Post[]);

  useEffect(() => {
    setPostData(dataContent as Post[]);
  }, [checkedTeamId, currentPage, dataContent]);

  return (
    <>
      <BoardSection title="Bulletin board">
        <div className="flex h-full flex-col items-center justify-between gap-[4.6rem]">
          <div className="flex w-full gap-[7.9rem] pr-[15.7rem]">
            {/* <Filter
              teamList={teams}
              checkedTeamId={checkedTeamId || []}
              setCheckedTeamId={setCheckedTeamId || (() => {})}
              className="mt-[4.6rem]"
            /> */}
            <UserPostList posts={postData} />
          </div>
          <Pagenation />
        </div>
      </BoardSection>
    </>
  );
}
