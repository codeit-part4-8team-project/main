import PostItem from '@/components/Post/PostItem';
import { Post } from '@/types/postTypes';

interface PostListProps {
  posts: Post[] | null;
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="mt-[1.4rem] grid w-fit grid-cols-2 gap-12">
      {posts ? (
        posts.map((post) => {
          return <PostItem post={post} />;
        })
      ) : (
        <span>게시물이 없습니다</span> /* TODO 없을 시 ui 필요 */
      )}
    </div>
  );
}
