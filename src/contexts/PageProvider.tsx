/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostPage } from '@/hooks/usePost';
import { Post } from '@/types/postTypes';

interface PageContextValue {
  dataContent: Post[] | [] /* TODO 타입 수정 */;
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

  const { teamId } = useParams();
  const isTeam = teamId ? true : false;

  /* TODO 수정 */
  const { postPageData, fetchPostPageData } = usePostPage(currentPage);

  const { size, totalPages, content } = postPageData;

  const query = `?page=${currentPage}`;
  const newPath = isTeam ? `/post/team/${teamId}${query}` : `/post/user${query}`;

  /* TODO 여기 부분 path 수정 */
  useEffect(() => {
    fetchPostPageData({ newPath });
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
