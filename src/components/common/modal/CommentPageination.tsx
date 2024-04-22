import { useEffect, useState } from 'react';
import clsx from 'clsx';
import AllowLeftIcon from '@/assets/AllowLeftIcon';
import AllowRightIcon from '@/assets/AllowRightIcon';

interface PaginationProps {
  reRending?: number;
  totalPages?: number;
  // totalElements?: number;
  onPageChange: (page: number) => void;
  first?: boolean;
  last?: boolean;
}

export default function CommentPageination({
  totalPages = 1,
  onPageChange,
  last,
  // reRending,
  // totalElements,
}: PaginationProps) {
  const [activePage, setActivePage] = useState<number>(1);
  // 여기 first 값 잘못 받아서 임시로 activePage =>로 bollean 처리함
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };

  const handlePagePlusClickIcon = () => {
    setActivePage(activePage - 1);
  };

  const handlePageMinusClickIcon = () => {
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    onPageChange(activePage);
  }, [activePage]);

  // useEffect(() => {
  //   if (totalElements % 5 === 0) {
  //     setActivePage(totalPages + 1);
  //   }
  // }, [reRending]);

  return (
    <div className="flex items-center justify-center gap-[2.4rem] pb-[4.8rem]">
      <button
        onClick={handlePagePlusClickIcon}
        type="button"
        disabled={activePage === 1}
        className={clsx(activePage === 1 && 'opacity-20')}
      >
        <AllowLeftIcon />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          type="button"
          className={clsx('text-body2-bold', { 'text-gray30': activePage !== page })}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={last}
        className={clsx(last && 'opacity-20')}
        onClick={handlePageMinusClickIcon}
      >
        <AllowRightIcon />
      </button>
    </div>
  );
}
