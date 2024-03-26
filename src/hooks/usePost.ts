import { useEffect, useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Posts } from '@/types/postTypes';

interface UsePostParams {
  type: 'user' | 'team';
  page?: number;
  teamId?: number;
  postId?: number;
}

const defaultPostData: Posts = {
  totalPages: 0,
  totalElements: 0,
  size: 0,
  content: null,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  numberOfElements: 0,
  pageable: {
    offset: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: false,
    },
    pageNumber: 0,
    pageSize: 0,
    paged: false,
    unpaged: true,
  },
  first: true,
  last: false,
  empty: true,
};

export default function usePost({ type, page = 1, teamId, postId }: UsePostParams) {
  const [postData, setPostData] = useState<Posts>(defaultPostData);

  let path = '';
  if (type === 'user') {
    path = `/user/all-post?page=${page}`; // 유저의 자유게시판 게시물 목록 조회
  } else if (!postId) {
    path = `/${teamId}/post/?page=${page}`; // 팀의 자유게시판 게시물 목록 조회
  } else {
    path = `/${teamId}/post/${postId}`; // 팀의 특정 게시물 조회
  }

  const { loading, error, data } = useAxios<Posts>(
    {
      path,
      method: 'GET', // TODO 가능하면 다른 요청들도 가능하도록
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      console.log('나오냐');
      setPostData(data);
    }
    if (error) {
      console.log('post get 요청 에러');
    }
  }, [loading, error, data]);

  return { postData };
}
