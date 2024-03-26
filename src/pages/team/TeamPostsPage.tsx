import BoardSection from '@/components/common/BoardSection';
import PostList from '@/components/Post/PostList';
import { useTeam } from '@/contexts/TeamProvider';
import usePost from '@/hooks/usePost';

export default function TeamPostsPage() {
  const { currentTeam } = useTeam();
  const { postData: teamPosts } = usePost({ teamId: currentTeam.id });

  return <BoardSection title="Bulletin board" content={<PostList posts={teamPosts.content} />} />;
}
