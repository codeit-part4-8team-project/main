import { ReactNode } from 'react';
import TextButton from '../common/TextButton';

export default function PopupModal({
  children,
  buttonText1,
  buttonText2,
  buttonClick1,
  buttonClick2,
  reloadParent,
}: {
  children: ReactNode;

  buttonText1?: string;
  buttonText2?: string;
  buttonClick1?: () => void;
  buttonClick2?: () => void;
  reloadParent?: () => void;
}) {
  // useEffect(() => {
  //   reloadParent && reloadParent();
  // }, [reloadParent]);
  return (
    <div className="z-50 h-[16rem] w-[56rem] rounded-xl bg-[#292A2D] p-[2.4rem] ">
      <span className="text-lg sm:text-base : mt-[80px]  justify-center text-body2-regular font-medium text-white sm:mt-[53px]">
        {children}
      </span>
      <div className="mt-[1.4rem] flex justify-end gap-4">
        <TextButton buttonSize="sm" color="blue" onClick={buttonClick1}>
          {buttonText1}
        </TextButton>

        <TextButton buttonSize="sm" color="gray" onClick={buttonClick2} reloadParent={reloadParent}>
          {buttonText2}
        </TextButton>
      </div>
    </div>
  );
}
