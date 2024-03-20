import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/',
});

// 요청 인터셉터를 추가하여 모든 요청에 토큰을 포함시킴
instance.interceptors.request.use(
  async (config) => {
    console.log('config', config);
    const token = localStorage.getItem('login');
    console.log('ddd', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
