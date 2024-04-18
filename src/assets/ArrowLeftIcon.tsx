import { IconProps } from '@/types/iconProps';

export default function ArrowLeftIcon({ fill, className, ...props }: IconProps) {
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
      <rect width="24" height="24" fill="white" />
      <path
        d="M9.00528 7.01713C8.79689 7.05283 8.58759 7.14351 8.46039 7.30776L5.13942 11.5924C4.95353 11.8316 4.95353 12.1558 5.13942 12.395L8.46039 16.6797C8.71478 17.0082 9.24647 17.0996 9.62796 16.881C10.0095 16.6618 10.1158 16.2048 9.86151 15.877L6.85188 11.9937L9.86151 8.11043C10.1158 7.78265 10.0095 7.32562 9.62796 7.10639C9.43717 6.99713 9.21367 6.98142 9.00528 7.01713Z"
        fill={fill || '#292929'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 12C20 12.4142 19.6642 12.75 19.25 12.75H6.75C6.33579 12.75 6 12.4142 6 12V12C6 11.5858 6.33579 11.25 6.75 11.25H19.25C19.6642 11.25 20 11.5858 20 12V12Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}
