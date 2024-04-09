import { IconProps } from '@/types/iconProps';

function PinAngleIcon({ fill, className, ...props }: IconProps) {
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
        d="M14.0994 4C13.9137 4 13.7228 4.09695 13.5888 4.22526C12.5046 5.2632 12.1726 6.13119 12.569 7.3202C11.6441 8.02901 11.06 8.20296 9.90539 8.20296C8.32704 8.20296 7.29652 8.39322 6.59531 9.09384V9.11567C5.93919 9.77143 5.93919 10.8214 6.59531 11.4766L8.55569 13.452L5.21551 16.7902C4.94212 17.0632 4.92175 17.5217 5.19514 17.7947C5.46859 18.0684 5.92813 18.0684 6.20158 17.7947L9.55415 14.4418L11.5178 16.3954C12.174 17.0513 13.2244 17.0513 13.8806 16.3954H13.9025C14.604 15.6948 14.7995 14.7967 14.7995 13.0943C14.7995 12.0121 15.0216 11.2484 15.6942 10.4448C16.9886 10.8242 17.7417 10.4609 18.8031 9.39994C18.9344 9.2687 19 9.08264 19 8.89707C19 8.65088 18.9378 8.27352 18.7812 7.80396C18.529 7.0479 18.0947 6.28722 17.403 5.59591C16.7111 4.90467 15.9499 4.47068 15.1933 4.21861C14.7234 4.06209 14.3458 4 14.0994 4Z"
        fill={fill || '#292929'}
      />
    </svg>
  );
}

export default PinAngleIcon;
