import { axiosAuth } from './axiosInstance';

export const editNickname = async (nickname: string) => {
  const result = await axiosAuth.patch(`/members/info/nickname`, nickname);
  return result.data;
};
