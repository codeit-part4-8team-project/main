import { ReactNode, createContext, useContext, useState } from 'react';
import { Issue } from '@/types/issueTypes';

interface IssueProviderProps {
  children: ReactNode;
}

interface IssueContextValues {
  todoList: Issue[] | [];
  progressList: Issue[] | [];
  doneList: Issue[] | [];
  setTodoList: (issues: Issue[] | []) => void;
  setProgressList: (issues: Issue[] | []) => void;
  setDoneList: (issues: Issue[] | []) => void;
  handleOnDrag: (e: React.DragEvent<HTMLDivElement>, issueId: number) => void;
  handleOnDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const defaultValue = {
  todoList: [],
  progressList: [],
  doneList: [],
  setTodoList: () => {},
  setProgressList: () => {},
  setDoneList: () => {},
  handleOnDrag: () => {},
  handleOnDrop: () => {},
  handleDragOver: () => {},
};

const IssueContext = createContext<IssueContextValues>(defaultValue);

export function IssueProvider({ children }: IssueProviderProps) {
  const [todoList, setTodoList] = useState<Issue[] | []>([]);
  const [progressList, setProgressList] = useState<Issue[] | []>([]);
  const [doneList, setDoneList] = useState<Issue[] | []>([]);

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, issueId: number) => {
    e.dataTransfer?.setData('issueId', String(issueId));
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const issueId = e.dataTransfer?.getData('issueId');
    console.log('issueId', issueId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const value: IssueContextValues = {
    todoList,
    progressList,
    doneList,
    setTodoList,
    setProgressList,
    setDoneList,
    handleOnDrag,
    handleOnDrop,
    handleDragOver,
  };

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>;
}

export function useIssueContext() {
  const context = useContext(IssueContext);

  if (!context) {
    throw Error('반드시 IssueProvider 안에서 사용해야 합니다.');
  }

  return context;
}
