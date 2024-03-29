import { useParams } from 'react-router-dom';
import { PAGES } from '@/pages/constants';

export default function UserPage() {
  const { pageContent } = useParams();

  if (!pageContent) {
    throw Error('존재하지 않는 페이지입니다.');
  }

  return PAGES.user[pageContent];
}
