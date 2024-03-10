# 냉장고 구조대 프로젝트
<div align="center">
   <p>
      <img align="center" width="439" alt="image" src="https://github.com/osw6858/fridge-rescue-client/assets/107461545/0f4383b2-28bd-4c80-ad19-8b1979a0a08d">
   </p>
  구입한 식재료 관리 및  식재료 기반  레시피 추천 서비스
</div>

## **💪 기획 배경**

- 최근 집에서 요리를 하는 사람들이 늘고 있습니다.
- 집에서 요리를 하게 되면 재료가 조금씩 남아 결국 버리게 되거나, 재료를 구입할 때 낭비하는 일이 생깁니다.

## **💪 해결 컨셉**

- 웹 상에 자기만의 냉장고, 창고를 만들어 가지고 있는 재료를 등록하고 관리하면 가지고 있는 재료로 만들 수 있는 음식 레시피를 추천해 줍니다.
- 레시피와 가지고 있는 재료를 비교해 어떤 재료가 얼마나 부족한지 볼 수 있도록 합니다.

## **💪 기대 효과**

- 냉장고 속 재료들을 좀 더 효율적으로 관리할 수 있습니다.
- 가지고 있는 재료로 만들 수 있는 다양한 레시피를 통해 새로운 요리에 도전해볼 수 있습니다.
- 부족한 요리 재료를 한 눈에 볼 수 있으므로 구입 시 낭비가 줄어듭니다.

## **💪 유저** 플로우

1. 회원 가입 및 로그인
2. 냉장고에 재료 등록
3. 재료로 만들 수 있는 레시피 조회
    1. 필터에서 가지고 있는 재료 중 검색에 사용할 재료를 고를 수 있음
4. 특정 레시피로 요리를 완료한 경우 요리 완료 처리
    1. 실제 사용한 재료 확인(수정 가능)
    2. 요리 완료 시(해당 재료 유저 냉장고에서 제거 또는 수정)
5. 레시피 후기 작성(선택)
    1. 사진, 후기 등록
6. 요리 완료 내역 업데이트(회원 정보에서 조회 가능)

## 💻 프로젝트 구조
<div align="center">
   <img align="center" width="439" alt="image" src='https://github.com/osw6858/fridge-rescue-client/assets/107461545/0ee5b862-4ebc-4234-a33a-dc7893bffec5'>
</div>

## 🤖 기술스택
### Frontend
-  React
- TypeScript
- styled-components
- react-router
- react-query
- recoil
- axios
- vite

### Backend
- RDB - MySQL
- Spring Boot 3.x
- JDK 17
- Spring Security
- Elasticsearch
- Build Tool - Gradle
- Spring Batch
- AWS

## 🖥️ 프로젝트 시연 영상
https://github.com/osw6858/fridge-rescue-client/assets/107461545/941165d0-91fe-4b49-a301-d07b37f04803

## 🥊 트러블 슈팅
### 이미지 순서 보장 문제 
#### 문제점
- 레시피 작성 기능을 개발하는 도중, 이미지를 formData 형식으로 전송할 때 발생한 순서 보장 문제를 직면했습니다. 레시피의 정확한 전달을 위해서는 이미지 순서의 정확성이 필수적이었기에, 이를 해결하기 위한 다양한 접근 방법을 모색했습니다.

#### 해결방법
- 이미지 순서 문제를 해결하기 위해, 각 레시피 스탭별 이미지에 forEach문을 사용하여 고유의 인덱스를 부여하는 방식을 도입했습니다. 또한, 이미지가 없는 스탭에 대해서는 빈 blob 객체를 전송함으로써 백엔드 시스템이 이미지 유무를 정확히 인식하고 처리할 수 있도록 조치했습니다. 이러한 접근 방식은 문제를 효과적으로 해결하며 프로젝트의 정확성과 효율성을 크게 향상시켰습니다.

### 401 에러 응답을 받았을 때 무한 토큰 요청이 발생하는 문제
#### 문제점
- 401 에러 응답을 받았을 때 무한 요청이 발생하는 버그를 발견했습니다. 이 문제의 근본 원인은 인터셉터 파일 내에 구현된 handleTokenError 함수에서 발생했습니다. 401 에러를 받을 경우, axiosAuth 인스턴스를 통해 리프레시 토큰을 요청하지만, 리프레시 토큰 요청까지 401 에러를 받게 되면, axiosAuth는 에러를 잡아 다시 handleTokenError 함수를 호출함으로써 무한 요청의 사이클이 발생했습니다.

#### 해결방법
- 이 무한 요청 문제를 해결하기 위해, isRefreshing이라는 변수를 도입하여 리프레시 토큰 요청이 이미 진행 중인지 여부를 체크하도록 했습니다. 이 변수를 통해 리프레시 토큰 요청을 한 번만 수행하도록 제한함으로써, 무한 요청 문제를 성공적으로 해결할 수 있었습니다.


## ✔️ Commit Message Rule

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 수정
- `style` : 스타일 관련 (코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)
- `refactor` : 코드 리팩토링
- `test` : 테스트 코드
- `chore` : 빌드 업무, 패키지 매니저 수정

## ✔️ Git Flow

1. **이슈 작성**
   - Title
     - [commit message] 제목
     - ex) [docs] PR 템플릿 작성
   - Assignees
     - 본인 선택
   - Labels
     - 제목에 포함된 commit message와 연관된 심볼을 선택
   - Project
2. **branch 생성**
   - **`origin/develop`** branch를 기반으로 아래와 같은 이름으로 생성한다.
   - feature/작업자 #이슈번호
3. **2번에서 생성한 branch를 checkout 후 push한다.**
4. **해당 branch에서 issue에 해당하는 작업을 하고, commit message rule에 맞춰서 commit 후 push한다.**
5. **모든 작업이 완료되면 해당 branch를 pull request(PR)를 아래와 같은 형식으로 요청한다.**
   - Title
     - 프로젝트명 #이슈번호 제목
     - ex) 냉장고를부탁해 #3 개발환경 셋팅
   - Content
     - 작업 목적
     - 작업 내용
     - 관련된 이슈/커밋/PR
   - Reviewers
     - 팀원 모두 선택
   - Assignees
     - 본인 선택
   - Labels
     - 작업과 연관된 심볼을 선택
6. **모든 멤버가 코드 리뷰를 완료하면 PR 생성자가 merge를 진행하고 해당 branch를 삭제한다.**
   - 마지막 리뷰어는 PR 생성자를 멘션하여 모든 코드 리뷰가 끝남을 알린다.
7. **해당 issue를 close한다.**
