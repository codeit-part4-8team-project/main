import PageNumber from '@/components/common/pagenation/PageNumber';
import PageArrowLeftIcon from '@/assets/PageArrowLeftIcon';
import PageArrowRightIcon from '@/assets/PageArrowRightIcon';

interface PagenationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const createNumArray = (num: number) => {
  const newArray = Array.from({ length: num }, (_, idx) => idx + 1);
  return newArray;
};

export default function Pagenation({ totalPages, currentPage, setCurrentPage }: PagenationProps) {
  const pageNums = createNumArray(totalPages);

  const handlePageNumberClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex gap-[2.4rem]">
      <button type="button">
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
      <button type="button">
        <PageArrowRightIcon />
      </button>
    </div>
  );
}
