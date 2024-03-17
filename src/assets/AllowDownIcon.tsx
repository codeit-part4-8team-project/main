import { IconProps } from '@/types/iconProps';

function AllowDownIcon({ fill, className, ...props }: IconProps) {
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
        d="M7.51713 10.4947C7.55283 10.7031 7.64351 10.9124 7.80776 11.0396L12.0924 14.3606C12.3316 14.5465 12.6558 14.5465 12.895 14.3606L17.1797 11.0396C17.5082 10.7852 17.5996 10.2535 17.381 9.87204C17.1618 9.49054 16.7048 9.38419 16.377 9.63849L12.4937 12.6481L8.61043 9.63849C8.28265 9.38419 7.82562 9.49054 7.60639 9.87204C7.49713 10.0628 7.48142 10.2863 7.51713 10.4947Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default AllowDownIcon;
