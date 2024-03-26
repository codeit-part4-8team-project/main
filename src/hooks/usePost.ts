import { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Posts } from '@/types/postTypes';

interface UsePostParams {
  type: 'user' | 'team';
  page?: number;
  teamId?: number;
  postId?: number;
}

export default function usePost({ type, page = 1, teamId, postId }: UsePostParams) {
  const [postList, setPostList] = useState<Posts>();

  let path = '';
  if (type === 'user') {
    path = `/user/all-post?page=${page}`; // 유저의 자유게시판 게시물 목록 조회
  } else if (!postId) {
    path = `/${teamId}/post/?page=${page}`; // 팀의 자유게시판 게시물 목록 조회
  } else {
    path = `/${teamId}/post/${postId}`; // 팀의 특정 게시물 조회
  }

  const { loading, error, data } = useAxios<Posts>({
    path,
    method: 'GET', // TODO 가능하면 다른 요청들도 가능하도록
  });

  useEffect(() => {
    if (data && !loading) {
      setPostList(data);
    }
    if (error) console.log('post get 요청 에러');
  }, [loading, error, data]);

  return { postList };
}
