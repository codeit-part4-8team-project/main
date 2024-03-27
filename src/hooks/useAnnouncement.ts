import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';
import { Announcement, Announcements } from '@/types/announcementTypes';

const defaultAnnouncementPageData: Announcements = {
  totalPages: 0,
  totalElements: 0,
  size: 0,
  content: [],
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
      unsorted: true,
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

/* 특정 게시글 조회 용도로 사용하는 경우에만 파라미터로 announcemnetId를 전달해주면 됩니다. */
export default function useAnnouncement(announcementId?: number) {
  const [announcementPageData, setAnnouncementPageData] = useState<Announcements>(
    defaultAnnouncementPageData,
  );
  const [announcementData, setAnnouncementData] = useState<Announcement[] | []>([]);
  const { userId, teamId, pageContent } = useParams();

  let path = '';
  if (announcementId) {
    path = `/announcement/${announcementId}`; // 특정 공지글 조회
  } else {
    if (userId) {
      path = `/announcement/user/unread`; // 유저가 읽지 않은 공지글 조회 @ UserMainPage
    } else if (pageContent === 'main') {
      path = `/announcement/team/unread/${teamId}`; // 팀 공지 게시판 조회 @ TeamAnnouncementPage
    } else if (pageContent === 'announcements') {
      path = `/announcement/team/${teamId}`; // 유저가 읽지 않은 팀 게시글 조회 @ TeamMainPage
    } else {
      throw Error('공지글 데이터를 가져올 수 있는 페이지가 아닙니다.');
    }
  }

  const { loading, error, data, fetchData } = useAxios<Announcements>(
    {
      path,
      method: 'GET', // TODO 가능하면 다른 요청들도 가능하도록
    },
    true,
  );

  useEffect(() => {
    if (data && !loading) {
      if (Array.isArray(data)) {
        setAnnouncementData(data);
      } else {
        setAnnouncementPageData(data);
      }
    }
    if (error) {
      throw Error('공지글을 불러오지 못했습니다.');
    }
  }, [loading, error, data]);

  return { announcementPageData, announcementData, fetchAnnouncementData: fetchData };
}
