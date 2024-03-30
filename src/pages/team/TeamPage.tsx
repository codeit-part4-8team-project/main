import { PAGES, Page, TeamPageType } from '@/constants/Page';
import { useParams } from 'react-router-dom';

export default function TeamPage() {
  const { pageContent } = useParams();

  if (!pageContent) {
    throw Error('존재하지 않는 페이지입니다.');
  }

  const { page } = PAGES.team[pageContent as TeamPageType] as Page;

  return page;
}
