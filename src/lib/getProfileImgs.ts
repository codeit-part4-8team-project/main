import { Member } from '@/types/teamTypes';

export const getProfilesImgs = (members: Member[]) => {
  const profileImgArr: string[] = [];
  members.forEach((member) => {
    profileImgArr.push(member.imageUrl);
    if (profileImgArr.length === 3) return;
  });
  return profileImgArr;
};
