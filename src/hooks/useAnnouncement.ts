import { DEFAULT_PAGE_DATA } from '@/constants/defaultPageData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Announcement, Announcements } from '@/types/announcementTypes';

/* 특정 공지글 조회 용도로 사용하는 경우에만 아규먼트로 announcemnetId를 전달해주면 됩니다. */
export function useAnnouncement(announcementId?: number) {
  const [announcementData, setAnnouncementData] = useState<Announcement[] | []>([]);

  const { userId, teamId, pageContent } = useParams();

  let path = '';
  if (announcementId) {
    path = `/announcement/${announcementId}`; // 특정 공지글 조회
  } else {
    if (userId) {
      path = `/announcement/user/unread`; // 유저가 읽지 않은 공지글 조회 @ UserMainPage
    } else if (pageContent === 'main') {
      path = `/announcement/team/unread/${teamId}`; // 유저가 읽지 않은 팀 게시글 조회 @ TeamMainPage;
    } else {
      throw Error('공지글 데이터를 가져올 수 있는 페이지가 아닙니다.');
    }
  }

  const { loading, error, data, fetchData } = useAxios<Announcement[] | []>(
    {
      path,
      method: 'GET',
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      setAnnouncementData(data);
    }
    if (error) {
      throw Error('공지글을 불러오지 못했습니다.');
    }
  }, [loading, error, data]);

  return { announcementData, fetchAnnouncementData: fetchData };
}

export function useAnnouncementPage(page?: number) {
  const [announcementPageData, setAnnouncementPageData] =
    useState<Announcements>(DEFAULT_PAGE_DATA);

  const { teamId } = useParams();

  const query = `?page=${page || 1}`;
  const path = `/announcement/team/${teamId}${query}`; // 팀 공지 게시판 조회 @ TeamAnnouncementPage

  const { loading, error, data, fetchData } = useAxios<Announcements>({
    path,
    method: 'GET',
  });

  useEffect(() => {
    if (data && !loading) {
      setAnnouncementPageData(data);
    }
    if (error) {
      throw Error('공지글을 불러오지 못했습니다.');
    }
  }, [loading, error, data]);

  return { announcementPageData, fetchAnnouncementPageData: fetchData };
}
