import { ReactNode, useEffect, useRef } from 'react';

//모달 ui에 공통적으로 필요한 외부 클릭, esc키 입력 시 닫힘, backdrop 상호작용 불가, 항상 화면 정중앙에 플로팅 등의
//로직을 ModalWrapper로 분리하여 추상화하였습니다
//context 관련된 부분은 아니고 그냥 ui 관련 wrapper라 크게 설명드릴만한 부분은 없습니다...!
interface Props {
  id: string;
  children: ReactNode;
  onRemove: (id: string) => void;
}
//onRemove는 모달 백드롭 클릭, Esc 입력시 트리거 되는 함수로, provider 내부에서 {() => unmount(id)} 를 전달받았습니다.
function ModalWrapper({ children, id, onRemove }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClose = (e: Event) => {
    if (ref.current && ref.current === e.target) {
      onRemove(id);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current === e.target) {
      onRemove(id);
    }
  };

  const handleKeydownEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onRemove(id);
    }
  };
  //esc키를 입력하면 닫히는 것은 dialog 태그의 기본동작이지만 현재 모달이 여러 개로 확장될 경우를 염두에 두고 modal을 context로 관리하므로
  //따로 modal의 id를 지워 줄 필요가 있습니다.(아니면 display:none 상태의 모달이 누적되어 쌓임)
  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
      document.addEventListener('keydown', handleKeydownEsc);
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('close', handleClose);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeydownEsc);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('close', handleClose);
      document.body.style.overflow = ' auto';
      if (ref.current) {
        ref.current.close();
      }
    };
  }, [id]);

  return (
    <dialog ref={ref} className="_pos-center fixed rounded-[2.4rem]">
      {children}
    </dialog>
  );
  //모달이 항상 화면 가운데에 플로팅되는 것은 모달의 기본동작이므로 각각 개별 modal 컴포넌트에 fixed를 쓰는 것보다 wrapper에 쓰는 걸로 했습니다.
}

export default ModalWrapper;
