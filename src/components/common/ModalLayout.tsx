import { ReactNode } from 'react';
import CloseImg from '../../../public/images/Close.svg';

interface ModalProps {
  title: string;
  modalName: string;
  children?: ReactNode;
  buttonText: string;
  submit?: () => void;
  wrong?: () => void;
  modalRef?: React.RefObject<HTMLDivElement>;
  handleModalOutsideClick?: (e: any) => void;
}
function ModalLayout({
  title,
  modalName,
  children,
  buttonText,
  submit,
  wrong,
  modalRef,
  handleModalOutsideClick,
}: ModalProps) {
  return (
    <div
      className="fixed top-0 z-10 flex size-full items-center justify-center bg-black bg-opacity-5"
      ref={modalRef}
      // onClick={(e) => handleModalOutsideClick(e)}
    >
      <div className="h-[731px] w-[1326px] bg-white px-20 py-10">
        <div className="flex justify-between">
          <h3 className="text-2xl">{title}</h3>
          <button onClick={wrong}>
            <img src={CloseImg} alt="CloseImg" />
          </button>
        </div>
        <div className="mb-14 mt-20 text-[2rem]">{modalName}</div>
        {children}
        <div className="flex w-[100%] justify-end">
          <button
            className=" cursor-pointer rounded-lg border-[1px] border-solid px-16 py-2 text-lg"
            onClick={submit}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLayout;

// 모달창 사용 예시

// 불러올때 state토글하고 props로 원하는 값 넣어주기
// {test && (
//   <ModalLayout
//     title="일정생성"
//     buttonText="수락"
//     wrong={해당함수(모달창닫는X버튼함수입니다)}
//     modalRef={해당함수(모달외부Ref입니다)}
//     handleModalOutsideClick={해당함수(Ref로 외부창 판단하는함수입니다)}
//   />
// )}

// modalRef = 모달창 외부 클릭시 필요한값
// state값은 모달창 열고닫기

// const modalRef = useRef(null);
// const [test, setTest] = useState(false);
// const handleClick = () => {
//   setTest(!test);
// };
// const handleModalClick = (e: any) => {
//   if (modalRef.current === e.target) {
//     setTest(false);
//   }
// };
