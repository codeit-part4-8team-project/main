import { IconProps } from '@/types/iconProps';

function ViewListIcon({ active, fill, className, ...props }: IconProps) {
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
      {active ? (
        <path
          d="M4 3C3.448 3 3 3.448 3 4C3 4.552 3.448 5 4 5H20C20.552 5 21 4.552 21 4C21 3.448 20.552 3 20 3H4ZM6 7C4.343 7 3 8.343 3 10V14C3 15.657 4.343 17 6 17H18C19.657 17 21 15.657 21 14V10C21 8.343 19.657 7 18 7H6ZM4 19C3.448 19 3 19.448 3 20C3 20.552 3.448 21 4 21H20C20.552 21 21 20.552 21 20C21 19.448 20.552 19 20 19H4Z"
          fill={fill || 'white'}
        />
      ) : (
        <path
          d="M4 3C3.448 3 3 3.448 3 4C3 4.552 3.448 5 4 5H20C20.552 5 21 4.552 21 4C21 3.448 20.552 3 20 3H4ZM6 7C4.343 7 3 8.343 3 10V14C3 15.657 4.343 17 6 17H18C19.657 17 21 15.657 21 14V10C21 8.343 19.657 7 18 7H6ZM6 9H18C18.552 9 19 9.448 19 10V14C19 14.552 18.552 15 18 15H6C5.448 15 5 14.552 5 14V10C5 9.448 5.448 9 6 9ZM4 19C3.448 19 3 19.448 3 20C3 20.552 3.448 21 4 21H20C20.552 21 21 20.552 21 20C21 19.448 20.552 19 20 19H4Z"
          fill={fill || 'white'}
        />
      )}
    </svg>
  );
}

export default ViewListIcon;
