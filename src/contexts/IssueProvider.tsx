import { ReactNode, createContext, useContext, useState } from 'react';
import { Issue } from '@/types/issueTypes';

interface IssueProviderProps {
  children: ReactNode;
}

interface IssueContextValues {
  issueList: {
    todoList: Issue[] | [];
    progressList: Issue[] | [];
    doneList: Issue[] | [];
  };
  setIssueList: {
    setTodoList: (issues: Issue[] | []) => void;
    setProgressList: (issues: Issue[] | []) => void;
    setDoneList: (issues: Issue[] | []) => void;
  };
  dragHandlers: {
    handleOnDrag: (e: DragEvent, issueId: number) => void;
    handleOnDrop: (e: DragEvent) => void;
    handleDragOver: (e: DragEvent) => void;
  };
}

const defaultValue = {
  issueList: {
    todoList: [],
    progressList: [],
    doneList: [],
  },
  setIssueList: {
    setTodoList: () => {},
    setProgressList: () => {},
    setDoneList: () => {},
  },
  dragHandlers: {
    handleOnDrag: () => {},
    handleOnDrop: () => {},
    handleDragOver: () => {},
  },
};

const IssueContext = createContext<IssueContextValues>(defaultValue);

export function IssueProvider({ children }: IssueProviderProps) {
  const [todoList, setTodoList] = useState<Issue[] | []>([]);
  const [progressList, setProgressList] = useState<Issue[] | []>([]);
  const [doneList, setDoneList] = useState<Issue[] | []>([]);

  const handleOnDrag = (e: DragEvent, issueId: number) => {
    e.dataTransfer?.setData('issueId', String(issueId));
  };

  const handleOnDrop = (e: DragEvent) => {
    const issueId = e.dataTransfer?.getData('issueId');
    console.log('issueId', issueId);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const value: IssueContextValues = {
    issueList: { todoList, progressList, doneList },
    setIssueList: { setTodoList, setProgressList, setDoneList },
    dragHandlers: { handleOnDrag, handleOnDrop, handleDragOver },
  };

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>;
}

export function useIssueContext() {
  const context = useContext(IssueContext);

  if (!context) {
    throw Error('반드시 IssueProvider 안에서 사용해야 합니다.');
  }

  const { issueList, setIssueList, dragHandlers } = context;

  return { issueList, setIssueList, dragHandlers };
}
