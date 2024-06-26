import { IconProps } from '@/types/iconProps';

function AllowRightIcon({ fill, className, ...props }: IconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9947 16.9829C11.2031 16.9472 11.4124 16.8565 11.5396 16.6922L14.8606 12.4076C15.0465 12.1684 15.0465 11.8442 14.8606 11.605L11.5396 7.32033C11.2852 6.99184 10.7535 6.90045 10.372 7.11896C9.99054 7.33819 9.88418 7.79522 10.1385 8.123L13.1481 12.0063L10.1385 15.8896C9.88419 16.2173 9.99054 16.6744 10.372 16.8936C10.5628 17.0029 10.7863 17.0186 10.9947 16.9829Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default AllowRightIcon;
