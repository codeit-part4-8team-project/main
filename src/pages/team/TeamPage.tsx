import { PAGES } from '@/constants/constants';
import { useParams } from 'react-router-dom';

export default function TeamPage() {
  const { pageContent } = useParams();

  if (!pageContent) {
    throw Error('존재하지 않는 페이지입니다.');
  }

  return PAGES.team[pageContent];
}
