import { IconProps } from '@/types/iconProps';

function CheckIcon({ fill, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M17.1618 8C16.9493 8 16.7277 8.06722 16.5658 8.22087L10.1599 14.2954C9.94657 14.4979 9.73241 14.4603 9.56474 14.2218L7.53704 11.4219C7.28304 11.0609 6.75179 10.9601 6.37078 11.201C5.99061 11.4419 5.88436 11.9452 6.13836 12.3061L8.16523 15.106C8.91395 16.1696 10.3724 16.3048 11.3262 15.4005L17.7578 9.35081C18.0807 9.04351 18.0807 8.52816 17.7578 8.22087C17.596 8.06722 17.3735 8 17.1618 8Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default CheckIcon;
