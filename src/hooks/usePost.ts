import { DEFAULT_PAGE_DATA } from '@/constants/defaultPageData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Post, Posts } from '@/types/postTypes';

/* 특정 게시글 조회 용도로 사용하는 경우에만 아규먼트로 postId를 전달해주면 됩니다. */
export default function usePost(postId?: number) {
  const [postPageData, setPostPageData] = useState<Posts>(DEFAULT_PAGE_DATA);
  const [postData, setPostData] = useState<Post[] | []>([]);

  const { userId, teamId } = useParams();

  let path = '';
  if (postId) {
    path = `/post/${postId}`; // 특정 게시글 조회
  } else {
    if (userId) {
      path = `/post/user`; // 유저의 팀 통합 자유게시판 조회 @ UserPostsPage
    } else if (teamId) {
      path = `/post/team/${teamId}`; // 팀의 자유게시판 조회 @ TeamPostsPage
    } else {
      throw Error('게시글 데이터를 가져올 수 있는 페이지가 아닙니다.');
    }
  }

  const { loading, error, data, fetchData } = useAxios<Posts>(
    {
      path,
      method: 'GET', // TODO 가능하면 다른 요청들도 가능하도록
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      if (Array.isArray(data)) {
        setPostData(data);
      } else {
        setPostPageData(data);
      }
    }
    if (error) {
      throw Error('게시글을 불러오지 못했습니다.');
    }
  }, [loading, error, data]);

  return { postPageData, postData, fetchPostData: fetchData };
}
