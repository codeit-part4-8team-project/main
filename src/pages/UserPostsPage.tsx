/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Filter from '@/components/common/Filter';
import Pagenation from '@/components/common/pagenation/Pagenation';
import PostList from '@/components/Post/UserPostList';
import { usePagenation } from '@/contexts/PageProvider';
import { useAxios } from '@/hooks/useAxios';
import { Post } from '@/types/postTypes';
import { Team } from '@/types/teamTypes';

export default function UserPostsPage() {
  const { dataContent, currentPage, checkedTeamId, setCheckedTeamId } = usePagenation();
  const [postData, setPostData] = useState<Post[]>(dataContent as Post[]);

  useEffect(() => {
    setPostData(dataContent as Post[]);
  }, [checkedTeamId, currentPage, dataContent]);

  const [teams, setTeams] = useState<Team[]>([]);

  const { loading, error, data } = useAxios<Team[]>(
    {
      path: '/team/',
      method: 'GET',
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      setTeams(data);
    }
    if (error) {
      throw Error('내가 속한 팀을 불러올 수 없습니다.');
    }
  }, [data, loading, error]);

  return (
    <>
      <BoardSection title="Bulletin board">
        <div className="flex h-full flex-col items-center justify-between gap-[4.6rem]">
          <div className="flex gap-[7.9rem]">
            <Filter
              teamList={teams}
              checkedTeamId={checkedTeamId || []}
              setCheckedTeamId={setCheckedTeamId || (() => {})}
            />
            <PostList posts={postData} />
          </div>
          <Pagenation />
        </div>
      </BoardSection>
    </>
  );
}
