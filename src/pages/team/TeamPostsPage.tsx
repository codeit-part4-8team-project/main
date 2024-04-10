import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import TeamPostList from '@/components/Post/TeamPostList';
import { usePagenation } from '@/contexts/PageProvider';
import { Post } from '@/types/postTypes';

export default function TeamPostsPage() {
  const { dataContent } = usePagenation();

  return (
    <BoardSection title="Bulletin board">
      <div className="mx-auto flex h-full max-w-[119rem] flex-col items-center justify-between gap-[4.6rem]">
        <TeamPostList posts={dataContent as Post[]} />
        <Pagenation />
      </div>
    </BoardSection>
  );
}
