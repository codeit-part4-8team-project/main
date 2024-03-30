import PageNumber from '@/components/common/pagenation/PageNumber';
import { usePagenation } from '@/contexts/PageProvider';
import PageArrowLeftIcon from '@/assets/PageArrowLeftIcon';
import PageArrowRightIcon from '@/assets/PageArrowRightIcon';

export default function Pagenation() {
  const { pageNumsArray, currentPage, isFirst, isLast, handlePrevClick, handleNextClick } =
    usePagenation();

  return (
    <div className="flex gap-[2.4rem]">
      <button type="button" onClick={handlePrevClick} disabled={isFirst}>
        <PageArrowLeftIcon />
      </button>
      <ul className="flex gap-[2.4rem]">
        {pageNumsArray.map((page) => {
          return (
            <li key={page}>
              <PageNumber isCurrent={currentPage === page}>{page}</PageNumber>
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
