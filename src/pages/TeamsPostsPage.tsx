import BoardSection from '@/components/common/BoardSection';
import PageLayout from '@/components/common/PageLayout';
import Post from '@/components/posts/Post';
import { PostType } from '@/types/postTypes';

const post: PostType = {
  id: 0,
  title: 'string',
  author: {
    name: '#울랄라 고릴라',
    imageUrl: 'string',
    role: 'string',
    grade: 'string',
  },
  content:
    '프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요. 프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.',
  isAnnouncement: false,
  createdDate: '2024-03-19',
  edited: true,
};

const TeamsPostsPage = () => {
  return (
    <PageLayout>
      <BoardSection title="Bulletin Board" content={<Post post={post} />} />
    </PageLayout>
  );
};

export default TeamsPostsPage;
