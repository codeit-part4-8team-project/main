import BoardSection from '@/components/common/BoardSection';
import PostList from '@/components/Post/PostList';
import usePost from '@/hooks/usePost';

export default function MyPostsPage() {
  const {
    postPageData: { content },
  } = usePost();

  return <BoardSection title="Bulletin board" content={<PostList posts={content || []} />} />;
}
