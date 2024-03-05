import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children?: ReactNode;
  buttonText: string;
  submit?: () => void;
  wrong?: () => void;
  modalRef?: React.RefObject<HTMLDivElement>;
  handleModalClick?: (e: any) => void;
}
function Modal({
  title,
  children,
  buttonText,
  submit,
  wrong,
  modalRef,
  handleModalClick,
}: ModalProps) {
  return (
    <div
      className="fixed top-0 z-10 flex size-full items-center justify-center bg-black bg-opacity-5"
      ref={modalRef}
      // onClick={(e) => handleModalClick(e)}
    >
      <div className="h-[731px] w-[1326px] bg-white px-20 py-10">
        <div className="flex justify-between">
          <h3 className="text-2xl">{title}</h3>
          <button onClick={wrong}>
            {/* 이미지 구해서 넣기 */}
            <img />x
          </button>
        </div>
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

export default Modal;

// 모달창 사용 예시

// 불러올때 state토글하고 props로 원하는 값 넣어주기
// {test && (
//   <Modal
//     title="일정생성"
//     buttonText="수락"
//     wrong={handleClick}
//     modalRef={modalRef}
//     handleModalClick={handleModalClick}
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
