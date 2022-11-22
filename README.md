# Salad Peace Back-End
<p>
  <img alt="lib" src="https://img.shields.io/badge/React-18.2.0-blue"/>
  <img alt="lib" src="https://img.shields.io/badge/Nest-8.0.0-red"/>
  <img alt="lib" src="https://img.shields.io/badge/Postgresql-14.0.0-blue"/>
  <img alt="lib" src="https://img.shields.io/badge/GraphQL-16.6.0-red"/>
  <img alt="lib" src="https://img.shields.io/badge/Apollo GraphQL-10.1.0-green"/>
  <img alt="lib" src="https://img.shields.io/badge/TailwindCSS-3.1.8-blue"/>
  <img alt="lib" src="https://img.shields.io/badge/Emotion-11.10.4-red"/>
</p>

## Slogan
> ### 샐러드 생활에 평화를

## Logo
![saladPeace](https://user-images.githubusercontent.com/60413257/203082132-552ff113-f747-46cb-8ecf-6a1a7136c00f.png)

## Feature
- 샐러드 피스의 판매 전략은 빌딩 단위 판매입니다.
- 샐러드 피스는 거점 빌딩에 당일 판매 예정인 샐러드 개수를 할당합니다.
- 샐러드는 실시간으로 선착순으로 판매됩니다.
- 당일 오전 11시 이전에 주문한 샐러드는 당일 오후 1시 이전 배송이 원칙입니다.
- 개인이 구매 가능한 샐러드 개수는 최대 5개입니다.
- 구매한 샐러드는 해당 거점 빌딩의 층마다 구비되어 있는 샐러드 박스에 배송됩니다.
- 남은 샐러드는 당일 폐기가 원칙입니다.
- 샐러드는 빌딩의 상주 인원 데이터를 바탕으로 미리 수요를 예측하고 최적의 개수를 할당합니다.
- 샐러드는 선착순 결제이므로 결제 시 취소가 불가능합니다.

## Getting Started
> git clone https://github.com/thewoowon/salad-peace-frontend.git

## Login Page
- Json Web Token을 활용한 로그인
- useVar() Hook을 활용해 관리
<img width="1680" alt="스크린샷 2022-11-22 오전 12 29 38" src="https://user-images.githubusercontent.com/60413257/203093982-b13de07c-63f9-4eb8-a566-7d80559a2d4e.png">

## Create User Page
- 계정 생성 시 이메일의 중복 여부를 검사합니다.
- 비밀번호는 10자리 이상 문자열, 특수문자, 숫자를 포함해야합니다.
- react-hook-form의 useForm() Hook을 활용해 input 태그에 정규식 패턴을 삽입해 관리합니다.
<img width="1676" alt="스크린샷 2022-11-22 오전 12 31 18" src="https://user-images.githubusercontent.com/60413257/203094269-2747280a-c961-41e0-86b6-5b44aeefcb37.png">

## Main Condition Page
- 사용자의 빌딩 사진, 현재 위치, 빌딩에 남은 샐러드 개수, 다른 사용자의 현재 주문 현황이 표시됩니다.
- useQuery() Hook의 pollInterval을 활용해 500ms 간격으로 현재 개수를 가져옵니다.
- Subscription을 활용해 주문이 발생했을 때, 현재 개수 State의 값을 변경하는 시나리오도 구현했습니다.
<img width="841" alt="스크린샷 2022-11-22 오전 12 33 31" src="https://user-images.githubusercontent.com/60413257/203094758-c8f5eb5a-7738-4ad0-9ca1-0181f1872dcb.png">
<img width="1680" alt="스크린샷 2022-11-22 오전 12 39 46" src="https://user-images.githubusercontent.com/60413257/203096181-7da445d6-7e62-458d-b4a5-51e44ed29841.png">
<img width="1680" alt="스크린샷 2022-11-22 오전 12 40 13" src="https://user-images.githubusercontent.com/60413257/203096344-034d6dc0-4e36-4208-91ea-6aafa0b05965.png">

## Order Page
- 주문 페이지는 메인의 “바로 주문하기” 버튼을 클릭하면 나의 상주 빌딩의 주문 페이지로 이동합니다.
- 각각의 샐러드 개수를 원하는 수량만큼 주문하고 주문하기 버튼을 클릭 후 최종적으로 장바구니에 넣습니다.
<img width="1679" alt="스크린샷 2022-11-22 오전 12 36 04" src="https://user-images.githubusercontent.com/60413257/203095359-40a0c1b8-ac28-4db6-9200-5b0ab3e0407e.png">
<img width="1680" alt="스크린샷 2022-11-22 오전 12 36 37" src="https://user-images.githubusercontent.com/60413257/203095498-5c8cc661-8031-4371-837b-b5d8caee7def.png">

## Biiling Page
- 주문이 완료되면 해당 주문이 접수되고, 내가 주문한 내역 페이지로 이동합니다.
<img width="1679" alt="스크린샷 2022-11-22 오전 12 37 23" src="https://user-images.githubusercontent.com/60413257/203095638-448ec63a-a362-4d1b-93cf-ad191128a98b.png">

## Real Time Subscription
- Subscription을 활용하여 실시간으로 다른 사용자의 주문을 화면 오른쪽에 표시합니다.
- 현재 샐러드 개수도 변경됩니다.
<img width="842" alt="스크린샷 2022-11-22 오전 12 38 16" src="https://user-images.githubusercontent.com/60413257/203095825-0d7e2b5d-bf84-4caf-a61b-c1d5eb77e229.png">

## Edit Profile Page
- 프로필 정보를 변경할 수 있습니다.
![스크린샷 2022-11-22 오전 12 42 05](https://user-images.githubusercontent.com/60413257/203096760-c770c59e-4ecb-4157-9fe3-91434f7476bb.png)

## Building Manager Main Page
- 빌딩의 매니저는 관리하는 빌딩의 현황을 볼 수 있습니다.
![스크린샷 2022-11-22 오전 12 42 56](https://user-images.githubusercontent.com/60413257/203096980-c3c19006-9569-48e9-a3c6-3f619168d7ca.png)

## Manager Building Detail Page
- 매니저는 관리하는 빌딩에 샐러드를 할당합니다.
- 자동화 구현이 필요한 부분이라고 생각합니다.
![스크린샷 2022-11-22 오전 12 43 48](https://user-images.githubusercontent.com/60413257/203097183-cd6acfe0-737f-4da9-9fdc-29ce71ae2b1a.png)
![스크린샷 2022-11-22 오전 12 46 58](https://user-images.githubusercontent.com/60413257/203097994-2693bfd0-1511-4b6f-aafd-2a3451f511a2.png)

## Manager Add Salad Page
- 샐러드를 추가하고 옵션을 추가합니다.
![스크린샷 2022-11-22 오전 12 44 30](https://user-images.githubusercontent.com/60413257/203097350-051feee8-b6da-4b77-9ca6-0d4a0483c563.png)

## Paddle Promotion 
- 패들 모듈을 활용해 실제 결제가 가능합니다. 
![스크린샷 2022-11-22 오전 12 45 54](https://user-images.githubusercontent.com/60413257/203097712-d8c03055-4944-4d1f-af38-638eeb684856.png)

## Library
- google-map-react
- fontawesome
- victory

## Styling
- TailwindCSS
- Emotion

## TCP/IP
- GraphQL

## Process
> 1. 거점 설정
> 2. 물량 할당
> 3. 주문 접수
> 4. 배송 준비
> 5. 거점 배송
