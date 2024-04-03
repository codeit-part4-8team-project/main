import { Announcements } from '@/types/announcementTypes';
import { Posts } from '@/types/postTypes';
import { Members, Teams } from '@/types/teamTypes';

export const DEFAULT_PAGE_DATA: Posts & Announcements & Teams & Members = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 0,
  totalElements: 0,
  last: true,
  size: 0,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  numberOfElements: 0,
  first: true,
  empty: true,
};
