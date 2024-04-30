# Keepy-Uppy 
<b> 개발 프로젝트 시 프론트, 백, 디자이너가 일정을 조율하고 한 눈에 일정관리, 이슈관리 등을 원활하게 관리할 수 있는 사이트 <br>

<img src ='https://github.com/codeit-part4-8team-project/main/assets/145126857/d1b97ffa-b2c0-4e59-b057-6490a5d77c19'/>


---
## 🔗 배포링크
http://54.66.46.187/

## 👩‍💻팀 소개🧑‍💻
<table>
  <tbody>
    <tr>
      <td align="center">
     
 <img width="100px" alt="so" src="https://github.com/codeit-part4-8team-project/main/assets/145126857/a098bc1e-147b-4773-8d6f-7d5a7b1588f0">
        <br /><sub><b>FE 팀장 : </br>문필겸<br />
        <b>모달 담당
      </td>
      <td align="center">
 <img width="100px" alt="so" src="https://github.com/codeit-part4-8team-project/main/assets/145126857/20edff0a-670e-486c-84fc-efaf4f6148a2">
        <br /><sub><b>FE 팀원 : </br>박지선<br />
         <b> 메인 페이지 담당
      </td>
      <td align="center">
 <img width="100px" alt="so" src="https://github.com/codeit-part4-8team-project/main/assets/145126857/b156a838-71d5-459f-a5e4-92a665e8107d">
        <br /><sub><b>FE 팀원 : </br>이채빈<br />
         <b> 로그인 회원가입 <br>페이지 담당 
      </td>
      <td align="center">
       <img width="100px" alt="so" src="https://github.com/1Cheol-and-4-team/Rolling/assets/77719310/5e236ba8-6220-4617-af94-226d096a0a1a">
        <br /><sub><b>FE 팀원 : </br>전소은<br />
         <b> 일정관리 페이지 담당 
      </td>
  </tbody>
</table>

## 📑 프로젝트 설명
<b> 디자이너, 백엔드, 프론트 엔드가 함께한 협업 프로젝트 <br>
<b>협업 프로젝트 시 유용하게 일정을 관리하는 사이트를 구현 <br>
<b> 일정 뿐만 아니라 , 이슈, 공지사항, 좋아요, 자유게시판을 활용한 소통&일정관리 사이트 <br>

<img src ='https://github.com/codeit-part4-8team-project/main/assets/145126857/ebec0f20-f363-40f4-861a-355b8a5549db' alt='프로젝트 소개'/>


## ✨ 주요 기능 구현
## ✨ 주요 기능 구현
😎 문필겸 
-일정 생성 모달
-팀원 초대 모달 


🤗박지선 
-사이드바 
-메인 페이지 


😮이채빈 
-Context APi
-로그인, 회원가입 

😳 전소은 
- 일정 관리 페이지
- 라이브러리 없이 달력 구현해 주간별 월간 별 달력 생성
- 각각 일정이 필터될 수 있는 필터링 기능 구현 (일정을 클릭하면 클릭한 일정만 달력에 필터되어 보여짐) 
- 년도, 월, 주 단위로 달력 날짜 이동 구현
- 일정 수정 모달 생성
- 일정 삭제 모달 생성
- 네브바 구현 
- 팀원 초대 알림 설정
  
  


## 🛠️ Dev Tools
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <br> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> 
## 🖥️ 프로젝트 실행 방법
```bash
git clone https://github.com/codeit=part2-8team-project/Keepy-Uppy.git](https://github.com/codeit-part4-8team-project/main.git

cd main 

npm i

npm run dev
```

## 📁 디렉토리 구조
```
Main 
├── src
│   ├── assets             * 이미지, 아이콘 폰트 모음
│   ├── assets             * 이미지, 아이콘 폰트 모음
│   ├── components         * 재사용성 높은 컴포넌트 모음
│   │   ├── announcement   * 공지사항 컴포넌트 모음
│   │   ├── chat           * 채팅 컴포넌트 모음 
│   │   ├── common         * 공통 컴포넌트 모음
│   │   ├── kanbanBoard    * 칸반보드 컴포넌트 모음 
|   |   ├── ManPage        * 메인 페이지 캘린더 컴포넌트 모음 
|   |   ├── members        * 멤버 조회, 역할 지정 컴포넌트 모음 
|   |   ├── Modal          * 모든 모달 컴포넌트 모음
|   |   ├── Post           * 게시글 컴포넌트 모음 
|   |   ├── SchedulePage   * 캘린더 컴포넌트 모음
|   |   ├── SignupePage    * 회원가입 페이지 컴포넌트 모음
|   |   ├── TeamPage       * 팀 페이지 컴포넌트 모음
│   ├── constants          * 각종 상수 모음 
│   ├── context            * context모음 
│   ├── hooks              * hook 모음
│   ├── pages              * 페이지별 컴포넌트
│   ├── routes             * 라우팅 관련 함수 모음 
│   ├── styles             * tailwind font 변수 전역 파일
│   └── types              * type 모음 
├── App.tsxx
└── main.tsx
```

## 🤔 커밋 규칙
-reviewr, 프로젝트명, 지정 <br>
-label 지정 
 -🎨 Style: 스타일링 관련
- 📖 Documentation: 문서 개선 또는 추가
- 🐛 Bug Fix: 버그 수정
- 💡 Feature: 기능 추가
- ⚙️ Setting: 프로젝트 셋팅 관련
- 🛠️ Refactor: 리팩터링(기능 변경X)
- 📝 Meeting: 회의록

## 📝 코딩 컨벤션
- 컴포넌트는 `export default function 함수()`로 작성
- 이외의 함수는 화살표 함수 사용 `const 함수 = () =>`
- 이벤트 핸들러는 `handle`로 시작
- 커스텀 훅은 `use`로 시작
- boolean함수는 `is`로 시작 
