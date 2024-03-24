import { teamPosts } from '@/mockdata/postData';
import BoardSection from '@/components/common/BoardSection';
import BulletinBoard from '@/components/posts/BulletinBoard';

const TeamsPostsPage = () => {
  return (
    <BoardSection
      title="Bulletin board"
      content={<BulletinBoard posts={teamPosts.posts.content} />}
    />
  );
};

export default TeamsPostsPage;
