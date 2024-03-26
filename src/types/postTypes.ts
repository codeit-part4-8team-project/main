export interface Post {
  id: number;
  title: string;
  author: {
    name: string;
    imageUrl: string;
    role: string;
    grade: string;
  };
  content: string;
  isAnnouncement: boolean;
  createdDate: string;
  edited: boolean;
}

export interface Posts {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Post[] | null;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
