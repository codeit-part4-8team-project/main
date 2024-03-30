/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAnnouncementPage } from '@/hooks/useAnnouncement';
import { usePostPage } from '@/hooks/usePost';
import { Announcement } from '@/types/announcementTypes';
import { Post } from '@/types/postTypes';

interface PageContextValue {
  dataContent: Announcement[] | Post[] | [];
  pageNumsArray: number[];
  currentPage: number;
  isFirst: boolean;
  isLast: boolean;
  setCurrentPage: (page: number) => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handlePageNumberClick: (page: number) => void;
}

interface PageProviderProps {
  children: ReactNode;
}

const defaultPageValue = {
  dataContent: [],
  pageNumsArray: [1],
  currentPage: 1,
  isFirst: true,
  isLast: true,
  setCurrentPage: () => {},
  handlePrevClick: () => {},
  handleNextClick: () => {},
  handlePageNumberClick: () => {},
};

/* 예시: createNumArray(3, 5)는 [3, 4, 5, 6, 7] 배열을 반환 */
const createNumArray = (start: number, size: number) => {
  const newArray = Array.from({ length: size }, (_, idx) => start + idx);
  return newArray;
};

const PageContext = createContext<PageContextValue>(defaultPageValue);

export function PageProvider({ children }: PageProviderProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState(1);

  const { teamId, pageContent } = useParams();

  const isTeam = teamId ? true : false;

  const { postPageData, fetchPostPageData } = usePostPage(currentPage);
  const { announcementPageData, fetchAnnouncementPageData } = useAnnouncementPage(currentPage);

  let size: number, totalPages: number, content;

  if (pageContent === 'posts') {
    size = postPageData.size;
    totalPages = postPageData.totalPages;
    content = postPageData.content;
  } else {
    size = announcementPageData.size;
    totalPages = announcementPageData.totalPages;
    content = announcementPageData.content;
  }

  if (totalPages === 0) {
    totalPages = 1;
  }

  const query = `?page=${currentPage || 1}`;

  let newPath: string;
  switch (pageContent) {
    case 'posts':
      newPath = isTeam ? `/post/team/${teamId}${query}` : `/post/user${query}`;
      break;
    case 'announcements':
      newPath = `/announcement/team/${teamId}${query}`;
      break;
    default:
      throw Error('페이지네이션을 사용할 수 없는 페이지입니다.');
  }

  useEffect(() => {
    if (pageContent === 'posts') fetchPostPageData({ newPath });
    else fetchAnnouncementPageData({ newPath });
  }, [currentPage]);

  let pageNumsArray = createNumArray(startPage, size);

  const isFirst = startPage === 1;
  const isLast = pageNumsArray.includes(totalPages);
  const isLastFull = totalPages % size === 0; // 총 페이지 수와 페이지네이션 사이즈가 맞아 떨어지는 경우

  if (isLast && !isLastFull) {
    const pageNeeded = isFirst ? totalPages % size : totalPages % (startPage - 1);
    pageNumsArray = pageNumsArray.slice(0, pageNeeded);
  }

  const handlePageNumberClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setStartPage(startPage + size);
  };

  const handlePrevClick = () => {
    setStartPage(startPage - size);
  };

  console.log('content', content);

  return (
    <PageContext.Provider
      value={{
        dataContent: content,
        pageNumsArray,
        currentPage,
        isFirst,
        isLast,
        setCurrentPage,
        handlePrevClick,
        handleNextClick,
        handlePageNumberClick,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePagenation() {
  const pageInfo = useContext(PageContext);

  if (!pageInfo) {
    throw Error('반드시 PageProvider 안에서 호출해야 합니다.');
  }

  return pageInfo;
}
