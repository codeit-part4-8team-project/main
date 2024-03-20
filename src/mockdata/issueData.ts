export const issueInfo = {
  id: 0,
  title: 'string',
  author: {
    name: 'string',
    imageUrl: 'string',
    role: 'string',
    grade: 'string',
  },
  content: 'string',
  assignedMembers: [
    {
      name: 'string',
      imageUrl: 'string',
      role: 'string',
      grade: 'string',
    },
  ],
  dueDate: '2024-03-20',
  status: 'TODO',
  teamName: 'string',
  teamColor: 'string',
};

// 팀 칸반보드 조회 api에서 가져온 객체 구조
export const kanbanBoardInfo = {
  todoIssues: [
    {
      id: 0,
      title: '자기 소개 준비',
      author: {
        name: 'string',
        imageUrl: 'string',
        role: 'string',
        grade: 'string',
      },
      content: '프로젝트 시작전에 간단한 자기 소개부터 하려고 합니다. 장기자랑 준비해 오세요.',
      assignedMembers: [
        {
          name: 'string',
          imageUrl: 'string',
          role: 'string',
          grade: 'string',
        },
      ],
      dueDate: '2024-03-20',
      status: 'TODO',
      teamName: '코드잇 프로젝트',
      teamColor: '#1FCF6A',
    },
    {
      id: 1,
      title: '3월 첫째 주 스프린트',
      author: {
        name: 'string',
        imageUrl: 'string',
        role: 'string',
        grade: 'string',
      },
      content: '3월 3일까지 목표 페이지 완료',
      assignedMembers: [
        {
          name: 'string',
          imageUrl: 'string',
          role: 'string',
          grade: 'string',
        },
      ],
      dueDate: '2024-03-20',
      status: 'TODO',
      teamName: '토익 공부 모임',
      teamColor: '#7187FE',
    },
    {
      id: 2,
      title: '3월 첫째 주 스프린트',
      author: {
        name: 'string',
        imageUrl: 'string',
        role: 'string',
        grade: 'string',
      },
      content: '3월 3일까지 목표 페이지 완료',
      assignedMembers: [
        {
          name: 'string',
          imageUrl: 'string',
          role: 'string',
          grade: 'string',
        },
      ],
      dueDate: '2024-03-20',
      status: 'TODO',
      teamName: '토익 공부 모임',
      teamColor: '#7187FE',
    },
    {
      id: 3,
      title: '3월 첫째 주 스프린트',
      author: {
        name: 'string',
        imageUrl: 'string',
        role: 'string',
        grade: 'string',
      },
      content: '3월 3일까지 목표 페이지 완료',
      assignedMembers: [
        {
          name: 'string',
          imageUrl: 'string',
          role: 'string',
          grade: 'string',
        },
      ],
      dueDate: '2024-03-20',
      status: 'TODO',
      teamName: '토익 공부 모임',
      teamColor: '#7187FE',
    },
  ],
  progressIssues: [
    {
      id: 0,
      title: '레퍼런스 정리',
      author: {
        name: 'string',
        imageUrl: 'string',
        role: 'string',
        grade: 'string',
      },
      content: '펑크 컨셉에 맞는 레퍼런스 찾아오기',
      assignedMembers: [
        {
          name: 'string',
          imageUrl: 'string',
          role: 'string',
          grade: 'string',
        },
      ],
      dueDate: '2024-03-20',
      status: 'TODO',
      teamName: '디자인 스터디',
      teamColor: 'string',
    },
  ],
  doneIssues: [
    {
      id: 0,
      title: '디자인 회의 ',
      author: {
        name: 'string',
        imageUrl: 'string',
        role: 'string',
        grade: 'string',
      },
      content: 'string',
      assignedMembers: [
        {
          name: '3/1 디자인 회의 ',
          imageUrl: 'string',
          role: 'string',
          grade: 'string',
        },
      ],
      dueDate: '2024-03-20',
      status: 'TODO',
      teamName: '디자인 스터디',
      teamColor: 'string',
    },
  ],
};
