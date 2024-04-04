import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper';

//ModalProvider에서 모달을 열고 닫는 함수와, 모달의 id를 상태로 관리합니다.
interface ModalMethodType {
  close: () => void;
  closeAll: () => void;
}

type GetModalElementType = (props: ModalMethodType) => ReactNode;
//GetModalElement 함수의 call signature 선언. modal을 닫는 메소드를 인자로 받고 리액트노드를 반환.

interface ModalContextValue {
  mount: (id: string, getModalElement: GetModalElementType) => void;
}
//provider 내에서 사용할 mount 함수에 대해서 타입을 정의합니다.
//unmount, unmountAll은 mount 함수의 getModalElement 인자로 들어가므로 provider에서 제공할 필요가 없습니다.

const ModalContext = createContext<ModalContextValue | null>(null);
// useContext 훅에 인자로 전달할 context를 만듭니다.

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalsId, setModalsId] = useState<Map<string, GetModalElementType>>(new Map());
  //모달 id 값을 키로 하고 해당 id 값을
  const mount = useCallback((id: string, getModalElement: GetModalElementType) => {
    setModalsId((prev) => new Map(prev).set(id, getModalElement));
  }, []);
  //mount 함수는 첫 번째 인자와 두 번째 인자를 받아서 modalId라는 Map을 수정합니다. 모달을 열기위한 함수입니다.
  //getModalElement의 이해에 혼동이 있을 것 같아 매개변수를 위치로만 설명했습니다. getModalElement는 따로 선언한 함수명이 아니라 그냥 매개변수 이름입니다.
  const unmount = useCallback((id: string) => {
    setModalsId((prev) => {
      const newState = new Map(prev);
      newState.delete(id);
      return newState;
    });
  }, []);
  //unmount 함수는 첫 번째 인자만을 받아서 기존 Map에서 해당 id와 일치하는 키밸류를 지웁니다. 모달을 닫기 위한 함수입니다.

  const unmountAll = useCallback(() => {
    setModalsId(new Map());
  }, []);
  //unmountAll은 현재 창에 모달이 몇 개가 있던 한 번에 닫기 위한 함수입니다.

  const context = useMemo(() => ({ mount }), [mount]);
  //provider에 value로는 mount만을 제공하면 됩니다. modalsId, unmount, unmountAll은 외부에서 처리되지 않습니다.
  return (
    <ModalContext.Provider value={context}>
      {children}
      {[...modalsId.entries()].map(([id, getModalElement]) => (
        <ModalWrapper key={id} id={id} onRemove={() => unmount(id)}>
          {getModalElement({ close: () => unmount(id), closeAll: () => unmountAll() })}
        </ModalWrapper>
      ))}
    </ModalContext.Provider>
    //modalId라는 map자료형에 entries 메소드로 키밸류 어레이를 만들고 id, getModalElement를 인자로 받은 뒤
    //ModalWrapper는 id와 onRemove를 props로 받아 모달 UI와 관련된 기본 동작을 처리합니다.
    //getModalElement는 매개변수의 이름입니다 선언한 함수가 아닙니다. 실제로 이 부분은 modalId 상태의 변경에 따라 리렌더링됩니다.
    //요약하면 이렇습니다.
    //외부에서   openModal(({ close }) => <모달컴포넌트명 closeClick={close}></모달컴포넌트명>); 호출
    // -> 73번째 줄에 의해 ({ close }) => <모달컴포넌트명 closeClick={close}></모달컴포넌트명> 가 getModalElement가 되어 mount 함수에 랜덤 id와 함께 전달됨
    // -> mount함수 내부의 setModalsId에 의해 상태 업데이트 됨.
    // -> 상태 업데이트되면서 49~53번째 줄 업데이트 됨.
    // -> 49~53번째 줄-> map에 있던 랜덤id: ({ close }) => <모달컴포넌트명 closeClick={close}></모달컴포넌트명>를 .map으로 받고
    // -> getModalElement에 인자로 { close: () => unmount(id), closeAll: () => unmountAll() } 이러한 객체를 전달하여 '호출'함.
    // -> 근데 getModalElement는 ({ close }) => <모달컴포넌트명 closeClick={close}></모달컴포넌트명> 이러한 함수임.
    // 최종적으로 closeClick 이라는 props로 close 함수 (id를 제공받은 unmount 함수의 callback)를 제공받은 모달컴포넌트가 렌더링됨.
    // 함수의 호출과 함수의 참조를 혼동하는 것에 주의하시면 코드 읽으실 때 편할 것 같습니다.
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  const id = useId();
  if (context === null) {
    throw new Error('ModalProvider 외부입니다.');
  }

  const { mount } = context;

  const openModal = useCallback(
    (getModalElement: GetModalElementType) => {
      mount(id, getModalElement);
    },
    [mount],
  );
  //외부에서 id를 제공하지 않고도 사용하게 하기 위해 mount 함수를 openModal로 감싸는 식으로 만들었습니다.
  //하나의 상호작용에 두 개의 모달이 동시에 뜨는 경우까지 염두에 두어 Data.now() 대신 crypto.randomUUID() 사용하였습니다.
  return openModal;
  //외부 사용법을 단순화 하기 위해 modalId 상태와 모달 닫는 함수를 모두 내부에서 처리하도록 하고 openModal만 반환하도록 하였습니다.
};
