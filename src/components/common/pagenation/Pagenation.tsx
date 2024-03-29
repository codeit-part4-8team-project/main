import PageNumber from '@/components/common/pagenation/PageNumber';
import PageArrowLeftIcon from '@/assets/PageArrowLeftIcon';
import PageArrowRightIcon from '@/assets/PageArrowRightIcon';

interface PagenationProps {
  currentPage: number;
}

export default function Pagenation({ currentPage }: PagenationProps) {
  return (
    <div className="flex gap-[2.4rem]">
      <PageArrowLeftIcon />
      <PageNumber isCurrent={true}>{1}</PageNumber>
      <PageNumber isCurrent={false}>{2}</PageNumber>
      <PageNumber isCurrent={false}>{3}</PageNumber>
      <PageNumber isCurrent={false}>{4}</PageNumber>
      <PageNumber isCurrent={false}>{5}</PageNumber>
      <PageNumber isCurrent={false}>{6}</PageNumber>
      <PageNumber isCurrent={false}>{7}</PageNumber>
      <PageNumber isCurrent={false}>{8}</PageNumber>
      <PageNumber isCurrent={false}>{9}</PageNumber>
      <PageArrowRightIcon />
    </div>
  );
}
