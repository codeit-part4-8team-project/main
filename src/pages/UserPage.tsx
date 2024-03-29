import { PAGES, Page, UserPageType } from '@/constants/Page';
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const { pageContent } = useParams();

  if (!pageContent) {
    throw Error('존재하지 않는 페이지입니다.');
  }

  const { page } = PAGES.user[pageContent as UserPageType] as Page;

  return page;
}
