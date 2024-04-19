import clsx from 'clsx';

interface ItemDropDownProps {
  options: string[];
  action: () => void;
  className?: string;
}

export default function ItemDropDown({ options, action, className }: ItemDropDownProps) {
  return (
    <div
      className={clsx(
        'absolute left-0 top-[2.4rem] z-50 flex w-40 flex-col rounded-[0.6rem] bg-[#FCFCFC] py-[0.4rem] shadow-[0px_0px_10px_0px_rgba(17,17,17,0.05)]',
        className,
      )}
    >
      {options.map((option) => {
        return (
          <button
            key={option}
            type="button"
            onClick={action}
            className="inline-flex h-[3.7rem] items-center justify-center p-4 text-body3-medium text-gray80 hover:bg-[#EAEAEA]"
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
