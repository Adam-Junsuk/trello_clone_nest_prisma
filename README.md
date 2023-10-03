### Trello Clone 프로젝트 정리

#### 프로젝트 개요
이 프로젝트는 Trello의 클론 앱을 NestJS와 Prisma를 사용하여 백엔드를, React를 사용하여 프론트엔드를 구현한 것입니다.

#### Adam-Junsuk 님이 담당한 부분
- 프론트엔드 개발
- 이메일 토큰 인증 로그인
- 카드 관련 API 개발

#### 상세 내용

##### 프론트엔드
- React를 사용하여 로그인, 보드 목록, 개별 보드 등의 페이지를 구현했습니다.
- React Router를 사용하여 라우팅을 설정했습니다.
  - 로그인 페이지: `/login`
  - 보드 목록 페이지: `/all-boards`
  - 개별 보드 페이지: `/boards/:boardId`
- [App.js 파일 확인하기](https://github.com/Adam-Junsuk/trello_clone_nest_prisma/blob/main/frontend/src/App.js)

##### 이메일 토큰 인증 로그인
- NestJS를 사용하여 이메일과 토큰을 이용한 로그인 기능을 구현했습니다.
- Google과 Facebook 로그인도 지원합니다.
- [auth.controller.ts 파일 확인하기](https://github.com/Adam-Junsuk/trello_clone_nest_prisma/blob/main/src/auth-email/auth.controller.ts)

##### 카드 관련 API
- 카드 생성, 조회, 수정, 삭제 API를 구현했습니다.
- Prisma를 사용하여 데이터베이스와 연동했습니다.
- [cards.controller.ts 파일 확인하기](https://github.com/Adam-Junsuk/trello_clone_nest_prisma/blob/main/src/cards/cards.controller.ts)
- [cards.service.ts 파일 확인하기](https://github.com/Adam-Junsuk/trello_clone_nest_prisma/blob/main/src/cards/cards.service.ts)
