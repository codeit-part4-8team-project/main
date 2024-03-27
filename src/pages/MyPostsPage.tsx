import BoardSection from '@/components/common/BoardSection';
import PostList from '@/components/Post/PostList';
import usePost from '@/hooks/usePost';

export default function MyPostsPage() {
  const { postData } = usePost({});

  const { content } = postData;

  return <BoardSection title="Bulletin board" content={<PostList posts={content} />} />;
}
