npx create-next-app --typescript  >> 제목에 괄호 들어가면 zsh missing end of string 에러

yarn add -D eslint prettier
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
yarn add -D eslint-config-airbnb
yarn add -D eslint-config-prettier eslint-plugin-prettier
yarn add -D eslint-plugin-react eslint-plugin-react-hooks
yarn add -D eslint-plugin-jsx-a11y eslint-plugin-import

yarn eslint --init

.eslintrc.js 파일작성, .prettierrc 파일작성 >> 항목별로 의미 찾아보기

yarn add -D @types/eslint-plugin-prettier 

yarn add styled-components
yarn add -D @types/styled-components
yarn add styled-normalize // 브라우저마다 다르게 보이는 css를 초기화 시키기 위해 다운(reset도 있긴함 차이 알아보기? ? ? ? ㅎ)
_document.tsx 파일 작성(초기화면 cssinjs next 적용)

yarn add -D babel-plugin-styled-components // next 에서 styled-component 초기렌더부분 에러 해결위함
yarn add -D babel-plugin-module-resolver  // 간편하게 파일 import 하기 위해서 필요함

.babelrc //alias 등록, styled-component 연결 
tsconfig.json // alias 등록, rule 확인

yarn add redux react-redux @types/react-redux
yarn add redux-thunk typesafe-actions // 나중에 툴킷 써보자 굳이?ㅎㅎ
yarn add redux-devtools-extension // 데브툴 적용

pages > _app.tsx는 앱이 시작할 때 가장 먼저 호출되며, 라우팅도 이 페이지에서 내부적으로 작동하면 되기 때문에 앱의 글로벌한 작업들을 수행하기에 좋습니다( layout , store, interceptor, gtag)
pages > _document.tsx html 구조조작,( head, meta 태크 설정)
# drawing
