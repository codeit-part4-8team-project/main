import PostItem from '@/components/Post/PostItem';
import { Post } from '@/types/postTypes';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="mt-[1.4rem] grid w-fit grid-cols-2 gap-12">
      {posts.map((post) => {
        return <PostItem post={post} />;
      })}
    </div>
  );
}
