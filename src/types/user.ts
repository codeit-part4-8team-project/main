export interface User {
  id: number;
  name: string;
  imageUrl: string;
  username: string;
  oauthId: string;
  provider: 'KAKAO' | 'GOOGLE' | 'GITHUB';
  bio: string;
}

export type UserEditForm = Omit<User, 'id' | 'oauthId' | 'provider'>;
