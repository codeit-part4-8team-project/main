import Post from '@/components/posts/Post';
import { PostType } from '@/types/postTypes';

interface BulletinBoardProps {
  posts: PostType[];
}

export default function BulletinBoard({ posts }: BulletinBoardProps) {
  return (
    <div className="mt-[1.4rem] grid grid-cols-3 gap-12">
      {posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
