import { Grade, Member, Role } from '@/types/teamTypes';

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
    PRODUCT_MANEGER: '서비스 기획자',
  },
  GRADE: {
    OWNER: '오너',
    MANAGER: '매니저',
    TEAM_MEMBER: '팀원',
  },
};

export const DEFAULT_MEMBER: Member = {
  id: 0,
  name: '',
  imageUrl: '',
  role: 'FRONTEND',
  grade: 'TEAM_MEMBER',
  username: '',
  createdDate: '',
};
