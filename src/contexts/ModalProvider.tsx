import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper';

interface ModalMethodType {
  close: () => void;
  closeAll: () => void;
}

type GetModalElementType = (props: ModalMethodType) => ReactNode;

interface ModalContextValue {
  mount: (id: number, getModalElement: GetModalElementType) => void;
  unmount: (id: number) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalsId, setModalsId] = useState<Map<number, GetModalElementType>>(new Map());

  const mount = useCallback((id: number, getModalElement: GetModalElementType) => {
    setModalsId((prev) => new Map(prev).set(id, getModalElement));
  }, []);

  const unmount = useCallback((id: number) => {
    setModalsId((prev) => {
      const newState = new Map(prev);
      newState.delete(id);
      return newState;
    });
  }, []);

  const unmountAll = useCallback(() => {
    setModalsId(new Map());
  }, []);

  const context = useMemo(() => ({ mount, unmount, unmountAll }), [mount, unmount, unmountAll]);

  return (
    <ModalContext.Provider value={context}>
      {children}
      {[...modalsId.entries()].map(([id, getModalElement]) => (
        <ModalWrapper key={id} id={String(id)} onRemove={() => unmount(id)}>
          {getModalElement({ close: () => unmount(id), closeAll: () => unmountAll() })}
        </ModalWrapper>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error('ModalProvider 외부입니다.');
  }

  const { mount } = context;

  const openModal = useCallback(
    (getModalElement: GetModalElementType) => {
      mount(Number(crypto.randomUUID()), getModalElement);
    },
    [mount],
  );

  return openModal;
};
