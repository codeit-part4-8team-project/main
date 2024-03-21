import { teamPosts } from '@/mockdata/postData';
import BoardSection from '@/components/common/BoardSection';
import PageLayout from '@/components/common/PageLayout';
import BulletinBoard from '@/components/posts/BulletinBoard';

const TeamsPostsPage = () => {
  return (
    <PageLayout>
      <BoardSection
        title="Bulletin Board"
        content={<BulletinBoard posts={teamPosts.posts.content} />}
      />
    </PageLayout>
  );
};

export default TeamsPostsPage;
