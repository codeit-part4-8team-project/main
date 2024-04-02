import { IconProps } from '@/types/iconProps';

function PencilIcon({ fill, className, ...props }: IconProps) {
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
        d="M17.3951 10.1161L18.9716 8.53956C19.4502 8.06095 19.6895 7.82164 19.8175 7.56349C20.0608 7.07232 20.0608 6.49564 19.8175 6.00447C19.6895 5.74632 19.4502 5.50701 18.9716 5.0284C18.493 4.54978 18.2537 4.31047 17.9955 4.18255C17.5044 3.93915 16.9277 3.93915 16.4365 4.18255C16.1784 4.31047 15.9391 4.54978 15.4604 5.0284L13.864 6.6248C14.7101 8.07368 15.9269 9.28114 17.3951 10.1161ZM12.5873 7.90151L6.55645 13.9324C6.18334 14.3055 5.99678 14.4921 5.87412 14.7212C5.75146 14.9504 5.69972 15.2091 5.59624 15.7266L5.05605 18.4275C4.99766 18.7195 4.96846 18.8654 5.05151 18.9485C5.13455 19.0315 5.28053 19.0023 5.5725 18.944L8.27344 18.4038C8.79086 18.3003 9.04957 18.2485 9.27876 18.1259C9.50795 18.0032 9.6945 17.8167 10.0676 17.4435L16.1151 11.3961C14.6916 10.5046 13.4875 9.30875 12.5873 7.90151Z"
        fill={fill || 'white'}
      />
    </svg>
  );
}

export default PencilIcon;
