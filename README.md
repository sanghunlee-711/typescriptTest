## 개요

제품의 시리얼별 중복오류 판단하여 입고하는 간단한 프로젝트 입니다.

## 기술스택

<br>

- TypeScript, CRA, SCSS

- create react app 을 통해서 개발환경을 구성하였습니다.
  <br>`npx create-react-app my-app --template typescript`

- eslint와 prettier설정은 아래의 블로그를 참고했습니다
  <a href = "https://velog.io/@_jouz_ryul/CRA%EB%A1%9C-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0">velog.io/@\_jouz_ryul</a>

<br>

## 세부사항

<br>

- 시리얼 번호는 입력이 아닌 클릭 시 생성되게 만들었습니다.
- 개별 제품별 입고 진행 후 오류발생을 작동시키면 새로고침을 통해 입고 된 제품을 제고 한 후 실행하도록 가이드했습니다.

  <a href = "https://sanghunlee-711.github.io/typescriptTest/">실제 구현 페이지</a>

<br>

## 추가 수정 또는 구현 필요사항

<br>

- ~~functional Component의 Return type정의가 필요합니다.~~
- ~~인터페이스의 모듈화를 통해 깔끔한 코드 구현 필요~~
- 테스트코드 작성 필요
- 되돌리기 기능 구현 필요
- 입력되는 시리얼 별 중복판단 로직 재구성 필요
  <br>
