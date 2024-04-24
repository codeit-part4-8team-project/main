/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useIssue } from '@/hooks/useIssue';
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
  handleOnDrag: (issueId: number) => void;
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
  const [issueId, setIssueId] = useState<number>();
  const [todoList, setTodoList] = useState<Issue[] | []>([]);
  const [progressList, setProgressList] = useState<Issue[] | []>([]);
  const [doneList, setDoneList] = useState<Issue[] | []>([]);

  const { issueData, fetchIssueData } = useIssue(issueId);

  const currentStatus = issueData?.status;

  const handleOnDrag = (id: number) => {
    setIssueId(id);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newStatus = target.dataset.status;

    const updateIssueData = () => {
      fetchIssueData({
        newPath: `/issue/${issueId}/status`,
        newMethod: 'PATCH',
        newData: {
          status: newStatus,
        },
      });
    };
    const removeFromList = () => {
      if (currentStatus === 'TODO') {
        const newTodoList = todoList.filter((todo) => todo.id !== issueId);
        setTodoList(newTodoList);
      } else if (currentStatus === 'INPROGRESS') {
        const newProgressList = progressList.filter((progress) => progress.id !== issueId);
        setProgressList(newProgressList);
      } else if (currentStatus === 'DONE') {
        const newDoneList = doneList.filter((done) => done.id !== issueId);
        setDoneList(newDoneList);
      }
    };

    if (currentStatus === newStatus) return;
    if (issueData) {
      if (newStatus === 'TODO') {
        setTodoList([...todoList, issueData]);
        updateIssueData();
        removeFromList();
      } else if (newStatus === 'INPROGRESS') {
        setProgressList([...progressList, issueData]);
        updateIssueData();
        removeFromList();
      } else if (newStatus === 'DONE') {
        setDoneList([...doneList, issueData]);
        updateIssueData();
        removeFromList();
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (issueId) fetchIssueData();
  }, [issueId]);

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
