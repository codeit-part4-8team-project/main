import { useState } from 'react';
import PageNumber from '@/components/common/pagenation/PageNumber';
import PageArrowLeftIcon from '@/assets/PageArrowLeftIcon';
import PageArrowRightIcon from '@/assets/PageArrowRightIcon';

interface PagenationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

/* 예시: createNumArray(3, 5)는 [3, 4, 5, 6, 7] 배열을 반환 */
const createNumArray = (start: number, size: number) => {
  const newArray = Array.from({ length: size }, (_, idx) => start + idx);
  return newArray;
};

const SIZE = 10; // 한 번에 몇 개의 페이지를 보여줄지

export default function Pagenation({ totalPages, currentPage, setCurrentPage }: PagenationProps) {
  const [startPage, setStartPage] = useState(1);
  let pageNums = createNumArray(startPage, SIZE);

  const isFirst = startPage === 1;
  const isLast = pageNums.includes(totalPages);
  const isLastFull = totalPages % SIZE === 0; // 총 페이지 수와 페이지네이션 사이즈가 맞아 떨어지는 경우

  if (isLast && !isLastFull) {
    const pageNeeded = isFirst ? totalPages % SIZE : totalPages % (startPage - 1);
    pageNums = pageNums.slice(0, pageNeeded);
  }

  const handlePageNumberClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setStartPage(startPage + SIZE);
  };

  const handlePrevClick = () => {
    setStartPage(startPage - SIZE);
  };

  return (
    <div className="flex gap-[2.4rem]">
      <button type="button" onClick={handlePrevClick} disabled={isFirst}>
        <PageArrowLeftIcon />
      </button>
      <ul className="flex gap-[2.4rem]">
        {pageNums.map((page) => {
          return (
            <li key={page}>
              <PageNumber isCurrent={currentPage === page} onClick={handlePageNumberClick}>
                {page}
              </PageNumber>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={handleNextClick} disabled={isLast}>
        <PageArrowRightIcon />
      </button>
    </div>
  );
}
