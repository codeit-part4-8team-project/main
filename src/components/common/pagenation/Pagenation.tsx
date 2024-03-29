import PageNumber from '@/components/common/pagenation/PageNumber';
import PageArrowLeftIcon from '@/assets/PageArrowLeftIcon';
import PageArrowRightIcon from '@/assets/PageArrowRightIcon';

interface PagenationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PAGE_NUMS = [1, 2, 3];

export default function Pagenation({ currentPage, setCurrentPage }: PagenationProps) {
  const handlePageNumberClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex gap-[2.4rem]">
      <PageArrowLeftIcon />
      <ul className="flex gap-[2.4rem]">
        {PAGE_NUMS.map((page) => {
          return (
            <li key={page}>
              <PageNumber isCurrent={currentPage === page} onClick={handlePageNumberClick}>
                {page}
              </PageNumber>
            </li>
          );
        })}
      </ul>
      <PageArrowRightIcon />
    </div>
  );
}
