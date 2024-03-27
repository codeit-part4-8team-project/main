import { useParams } from 'react-router-dom';
import BoardSection from '@/components/common/BoardSection';
import PostList from '@/components/Post/PostList';
import usePost from '@/hooks/usePost';

export default function TeamPostsPage() {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { postData: teamPosts } = usePost({ teamId });

  return <BoardSection title="Bulletin board" content={<PostList posts={teamPosts.content} />} />;
}
