import { Grade, Role } from '@/types/teamTypes';

export const MEMBER: {
  ROLE: {
    [key in Role]: string;
  };
  GRADE: {
    [key in Grade]: string;
  };
} = {
  ROLE: {
    BACKEND: '백엔드',
    FRONTEND: '프론트엔드',
    DESIGNER: '디자이너',
  },
  GRADE: {
    OWNER: '그룹장',
    MANAGER: '매니저',
    TEAM_MEMBER: '팀원',
  },
};