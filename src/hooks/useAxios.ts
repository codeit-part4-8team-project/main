import { useEffect, useState } from 'react';
import axios, { AxiosError, HttpStatusCode, Method, isAxiosError } from 'axios';

const defaultInstance = axios.create({
  baseURL: 'http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api',
  timeout: 6000,
  withCredentials: true,
});

defaultInstance.interceptors.request.use(
  (req) => {
    console.log('axios request config : ', req);
    if (req.data && req.data instanceof Object) {
      req.headers['Content-Type'] = 'application/json';
    }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        req.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return req;
  },
  (err) => {
    console.log('axios request error config : ', err);
    if (isAxiosError(err)) {
      if (err.status === HttpStatusCode.BadRequest) {
        throw new Error('400 Badrequest');
      }
      if (err.status === HttpStatusCode.NotFound) {
        throw new Error('404 NotFound');
      }
    }
    return Promise.reject(err);
  },
);

defaultInstance.interceptors.response.use(
  (res) => {
    console.log('axios response config : ', res);
    return res;
  }, // 응답 일일이 체크하실 꺼 번거로울까봐 콘솔에 바로 찍히라고 적어놨습니다. 나중에 뺄게요.
  (err) => {
    console.log('axios response error config : ', err);
    if (isAxiosError(err)) {
      if (err.status === HttpStatusCode.Unauthorized) {
        //일단 accessToken 직접 지우시고 새로 로그인 하시면 됩니다.
      }
      if (err.status === HttpStatusCode.InternalServerError) {
        throw Error('서버 이상');
      }
    }
    return Promise.reject(err);
  },
);

interface UseAxiosParams<T> {
  path?: string;
  method?: Method;
  data?: T | Record<string, never>;
}

export const useAxios = <T = unknown, P = unknown, E = unknown>(
  { path = '', method = 'GET', data = {} }: UseAxiosParams<P>,
  shouldFetch: boolean = false,
) => {
  const [state, setState] = useState<{
    loading: boolean;
    error: AxiosError<E> | null;
    data: T | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchData = async ({ newPath = path, newMethod = method, newData = data } = {}) => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
      }));

      const response = await defaultInstance({
        method: newMethod,
        url: newPath,
        data: newData,
      });

      setState((prev) => ({
        ...prev,
        loading: false,
        data: response?.data ?? null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof AxiosError ? error : null,
      }));
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch]);

  return { ...state, fetchData };
};
