import { IconProps } from '@/types/iconProps';

function AllowLeftIcon({ fill, className, ...props }: IconProps) {
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
        d="M13.0053 7.01713C12.7969 7.05283 12.5876 7.14351 12.4604 7.30776L9.13942 11.5924C8.95353 11.8316 8.95353 12.1558 9.13942 12.395L12.4604 16.6797C12.7148 17.0082 13.2465 17.0996 13.628 16.881C14.0095 16.6618 14.1158 16.2048 13.8615 15.877L10.8519 11.9937L13.8615 8.11043C14.1158 7.78265 14.0095 7.32562 13.628 7.10639C13.4372 6.99713 13.2137 6.98142 13.0053 7.01713Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default AllowLeftIcon;
