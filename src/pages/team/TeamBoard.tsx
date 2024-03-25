import { teamPosts } from '@/mockdata/postData';
import BoardSection from '@/components/common/BoardSection';
import BulletinBoard from '@/components/posts/BulletinBoard';

export default function TeamBoard() {
  return (
    <BoardSection
      title="Bulletin board"
      content={<BulletinBoard posts={teamPosts.posts.content} />}
    />
  );
}
