import NoCard from '@/components/common/NoCard';
import PostItem from '@/components/Post/PostItem';
import { Post } from '@/types/postTypes';

interface PostListProps {
  posts: Post[] | [];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="mt-[1.4rem] grid w-fit grid-cols-2 gap-12">
      {posts.length !== 0 ? (
        posts.map((post) => {
          return (
            <li key={post.id}>
              <PostItem post={post} />
            </li>
          );
        })
      ) : (
        <NoCard backgroundColor="bg-white">게시글이 없습니다.</NoCard>
      )}
    </ul>
  );
}
