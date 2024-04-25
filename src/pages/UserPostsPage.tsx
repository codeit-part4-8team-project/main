import { useEffect } from 'react';
import BoardSection from '@/components/common/BoardSection';
import Filter from '@/components/common/Filter';
import Pagenation from '@/components/common/pagenation/Pagenation';
import UserPostList from '@/components/Post/UserPostList';
import { usePagenation } from '@/contexts/PageProvider';
import { useMyTeams } from '@/hooks/useMyTeams';
import { Post } from '@/types/postTypes';

export default function UserPostsPage() {
  const { dataContent, checkedTeamId, setCheckedTeamId, refetch } = usePagenation();

  const { myTeams } = useMyTeams();

  const reloadPosts = () => {
    refetch({});
  };

  useEffect(() => {
    refetch({});
  }, [checkedTeamId]);

  return (
    <>
      <BoardSection title="Bulletin board">
        <div className="flex h-full flex-col items-center justify-between gap-[4.6rem]">
          <div className="flex w-full gap-[7.9rem] pr-[15.7rem]">
            <Filter
              myTeams={myTeams}
              checkedTeamId={checkedTeamId as number[]}
              setCheckedTeamId={setCheckedTeamId as () => void}
              className="mt-[4.6rem]"
            />
            <UserPostList reloadPosts={reloadPosts} posts={dataContent as Post[]} />
          </div>
          <Pagenation />
        </div>
      </BoardSection>
    </>
  );
}
