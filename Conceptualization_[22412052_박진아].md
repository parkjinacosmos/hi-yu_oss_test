# [cite_start]1. Conceptualization [cite: 1]

## [cite_start]Hi-yu! [cite: 1]
[cite_start]**- Conceptualization -** [cite: 1]

* [cite_start]**Student No:** 22412052 [cite: 1]
* [cite_start]**Name:** 박진아 [cite: 1]
* [cite_start]**E-mail:** jiiinap31@yu.ac.kr [cite: 1]
* [cite_start]**GitHub repository:** https://github.com/parkjinacosmos/hi-yu_oss_test [cite: 1]

<br>

### [cite_start][ Revision history ] [cite: 1]

| Revision date | Version # | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026. 03. 20 | 1.0.0 | [cite_start]초안 및 계획 | jina | [cite: 1]

<br>

### [cite_start]= Contents = [cite: 1]
1. [cite_start]Business purpose [cite: 1]
2. [cite_start]System context diagram [cite: 1]
3. [cite_start]Use case list [cite: 1]
4. [cite_start]Concept of operation [cite: 1]
5. [cite_start]Problem statement [cite: 1]
6. [cite_start]Glossary [cite: 1]
7. [cite_start]References [cite: 1]

---

## [cite_start]1. Business purpose [cite: 1]

> ![](bindata/BIN0006.bmp)
> [cite_start]**[그림 1]** 마라탕 전문점이 너무 많아 시키기 힘들다는 게시물 [cite: 1]

> ![](bindata/BIN0002.bmp)
> [cite_start]**[그림 2]** 맛집 추천 글을 올려도 댓글이 없는 게시물 [cite: 1]

> ![](bindata/BIN0001.bmp)
> [cite_start]**[그림 3]** 에브리타임에 맛집을 검색했을 때, 맛집 추천을 받는 많은 게시물들 [cite: 1]

[cite_start]**1.1 Project background/motivation** [cite: 1]

[cite_start]영남대학교는 캠퍼스 주변 상권이 매우 넓고 식당이 방대하여 학생들이 본인에게 맞는 식당 정보를 한눈에 파악하기 어렵다. [cite: 1] [cite_start]네이버 플레이스 등 기존 포털 사이트의 정보는 무분별한 광고성 리뷰가 많아, 대학생들의 실제 입맛이나 예산(가격대)을 반영하지 못하는 경우가 빈번하다. [cite: 2]

[cite_start]실제 대학생 대표 익명 커뮤니티인 ‘에브리타임’의 맛집 추천 관련 게시물과 댓글([그림1] ~ [그림 3])을 살펴보면, 상권이 너무 광범위한 탓에 학우들에게 추천을 구하더라도 본인의 취향과 조건에 맞는 맛집을 찾기 힘들어하는 상황을 확인할 수 있다. [cite: 3] [cite_start]단순히 커뮤니티에 질문 글을 올리는 것만으로는 작성자가 원하는 구체적이고 신뢰할 수 있는 정보를 얻기에 한계가 존재한다. [cite: 4]

본 기획자도 영남대 학생으로서, 유명하다는 영남대 맛집들을 갔었다. [cite_start]유명세만 믿고 식당을 방문했다가, 음식의 퀄리티와 가격대에 실망했었던 적이 다수 있었다. [cite: 5] [cite_start]학생들이 직접 검증한 ‘진짜 맛집’ 정보를 공유할 수 있는 영대생 전용 웹사이트의 필요성을 깊이 느꼈다. [cite: 6] [cite_start]위치 및 카테고리(정문, 뒷문, 가격대 등)별로 식당을 쉽게 검색할 수 있는 웹사이트를 기획하였으며, ‘숨겨진 맛집(Hidden Restaurant)을 발굴한다는 의미와 영남대학교 학우들에게 친숙한 느낌을 주기 위해 프로젝트 명을 ’Hi-yu!’로 선정하였다. [cite: 7]

[cite_start]**1.2 Goal** [cite: 8]

* [cite_start]**사용자 편의성:** 위치 기반 탐색 기능 및 세분화된 카테고리별 맛집 검색 서비스 제공으로, 사용자에게 편의성 제공 [cite: 8]
* [cite_start]**커뮤니티 활성화 및 신뢰도 확보:** 영남대학교 웹메일(@yu.ac.kr) 연동을 통해 인증된 실제 학생만 리뷰를 작성할 수 있도록 권한을 제한하여, 허위 리뷰/ 광고성 게시글을 차단 [cite: 8]
* [cite_start]**지역 상권 상생:** 식당 주인이 직접 시스템에 접속하여 가게 정보를 실시간으로 업데이트할 수 있는 환경을 제공함으로써 효율적인 홍보를 지원한다. [cite: 8]

[cite_start]**1.3 Target Market** [cite: 9]

* [cite_start]**일반 사용자:** 영남대학교 웹메일 인증이 가능한 본교 재학생 [cite: 9]
* [cite_start]**가게 관리자 (Owner):** 영남대 인근(오렌지 거리, 정문, 조영동 등) 식당 및 카페 사장님 [cite: 9]

<br>

## [cite_start]2. System context diagram [cite: 9]

![](bindata/BIN0003.bmp)

* [cite_start]**Connect(Login):** 접속 [cite: 9]
* [cite_start]**Move:** 이동 [cite: 9]
* [cite_start]**Send Message:** 메시지 전송 [cite: 9]
* [cite_start]**Send SOS:** SOS 요청 [cite: 9]
* [cite_start]**Update Goods:** 상품 정보 업데이트 [cite: 9]
* [cite_start]**Reception Message:** 새로운 리뷰가 등록되거나 예약 문의가 올 경우 알림을 수신함. [cite: 9]
* [cite_start]**Is Danger:** 위험 감지 [cite: 10]
* [cite_start]**Request Data:** 데이터 요청 [cite: 10]
* [cite_start]**Give Data:** 데이터 베이스에 반영 [cite: 10]
* [cite_start]**Disconnect(Logout):** 시스템에 접속 종료. [cite: 10]
* [cite_start]**Disconnect Notice:** 시스템 종료 화면 띄우기. [cite: 11]
* [cite_start]**Request Verification:** 메일 요청 및 발송 [cite: 11]

<br>

## [cite_start]3. Use case list [cite: 11]

[cite_start]**3.1 Connect(Login)** [cite: 11]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer), Owner | [cite: 11]
| **Description** | [cite_start]Customer(학생), Owner이 각자 자신의 아이디로 로그인한다. [cite: 11] 학생은 아이디@yu.ac.kr 메일 인증을 통해 시스템에 접속한다. (학생이 영남대학교 학생임을 증명하기 위해) [cite_start]| [cite: 12]

[cite_start]**3.2 Move** [cite: 12]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer) | [cite: 12]
| **Description** | 지도 API를 조작하여 특정 맛집 구역(정문, 오렌지거리 등)으로 화면을 이동한다. [cite_start]| [cite: 12]

[cite_start]**3.3 Send message** [cite: 13]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer), Owner | [cite: 13]
| **Description** | [cite_start]**Student:** 방문한 식당에 대해 리뷰와 별점 데이터를 시스템에 전송함. [cite: 13] <br>**Owner:** 학생이 작성한 리뷰에 대해 감사 인사 또는 답변 메시지를 등록함. [cite_start]| [cite: 14]

[cite_start]**3.4 Send SOS** [cite: 15]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer) | [cite: 15]
| **Description** | 폐업했거나 정보가 틀린 식당을 발견 시 관리자에게 긴급 수정 요청을 보냄. [cite_start]| [cite: 15]

[cite_start]**3.5 Update Goods** [cite: 16]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Owner | [cite: 16]
| **Description** | 등록된 매니저 계정으로 상점 관리 모드에 접속한다. [cite_start]| [cite: 16]

[cite_start]**3.6 Reception Message** [cite: 16]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Owner | [cite: 16]
| **Description** | 새로운 리뷰가 등록되거나 예약 문의가 올 경우 알림을 수신함. [cite_start]| [cite: 16]

[cite_start]**3.7 Is Danger** [cite: 17]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Manager | [cite: 17]
| **Description** | 스템 내 유해 게시물이나 허위 인증 시도를 실시간으로 감지하고 차단함. [cite_start]| [cite: 17]

[cite_start]**3.8 Request Data** [cite: 18]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Manager | [cite: 18]
| **Description** | 서비스 개선을 위해 인기 식당 통계 및 사용자 이용 로그 데이터를 요청함. [cite_start]| [cite: 18]

[cite_start]**3.9 Give Data** [cite: 19]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Manager | [cite: 19]
| **Description** | 사용자의 SOS 요청을 검토한 후, 최종적으로 수정된 식당 정보를 데이터베이스에 반영함. [cite_start]| [cite: 19]

[cite_start]**3.10 Disconnect(Logout)** [cite: 20]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer), Owner, Manager | [cite: 20]
| **Description** | [cite_start]시스템에 접속 종료 | [cite: 20]

[cite_start]**3.11 Disconnect(Logout) Notice** [cite: 20]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer), Owner, Manager | [cite: 20]
| **Description** | [cite_start]시스템 종료 화면 띄우기(= 시스템 로그인 전 화면 띄우기) | [cite: 20]

[cite_start]**3.12 Request Verification** [cite: 20]
| 구분 | 내용 |
| :--- | :--- |
| **Actor** | [cite_start]Student(Customer) | [cite: 20]
| **Description** | [cite_start]외부 서버와의 통신 | [cite: 20]

<br>

## [cite_start]4. Concept of operation [cite: 20]

[cite_start]**4.1 Connect(Login)** [cite: 20]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 웹사이트를 사용하기 위해 등록된 사용자(학생, 매니저, 사장님 등)인지 확인하고 적절한 권한을 부여하기 위함. [cite_start]| [cite: 20]
| **Approach** | [cite_start]사용자가 브라우저를 통해 웹사이트에 접속하여 로그인을 요청하면, 서버에서 회원 정보(학교 이메일 또는 ID/PW)를 조회하여 로그인 성공/실패 여부를 확인함. [cite: 21] //학생으로 회원가입 시엔 학교 이메일로 회원가입을 진행할 것. [cite_start]| [cite: 22]
| **Dynamics** | 웹 사이트에 최초로 접속하거나, 로그아웃 상태에서 리뷰 작성 등 권한이 필요한 메뉴를 클릭할 때 발생. [cite_start]| [cite: 22]
| **Goals** | 역할별 계정 확인 및 웹 기반 로그인 기능을 구현한다. [cite_start]| [cite: 23]

[cite_start]**4.2 Move** [cite: 23]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 영남대 주변의 구역(정문, 오렌지거리 등)별 식당 위치를 직관적으로 탐색하기 위함. [cite_start]| [cite: 23]
| **Approach** | 웹 화면에서 지도를 마우스로 드래그하거나 구역 필터 버튼을 클릭하면, 웹 지도 API가 해당 좌표로 화면을 이동시키고 주변 데이터를 렌더링한다. [cite_start]| [cite: 24]
| **Dynamics** | 사용자가 웹사이트 메인 화면의 지도를 조작하거나 카테고리를 선택할 때 발생한다. [cite_start]| [cite: 25]
| **Goals** | 웹 기반 지도 API 연동 및 위치 이동 기능을 구현한다. [cite_start]| [cite: 25]

[cite_start]**4.3 Send Message** [cite: 26]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 웹사이트를 사용하기 위해 등록된 사용자(학생, 매니저, 사장님 등)인지 확인하고 적절한 권한을 부여하기 위함. [cite_start]| [cite: 26]
| **Approach** | [cite_start]사용자가 브라우저를 통해 웹사이트에 접속하여 로그인을 요청하면, 서버에서 회원 정보(학교 이메일 또는 ID/PW)를 조회하여 로그인 성공/실패 여부를 확인함. [cite: 27] //학생으로 회원가입 시엔 학교 이메일로 회원가입을 진행할 것. [cite_start]| [cite: 28]
| **Dynamics** | 웹 사이트에 최초로 접속하거나, 로그아웃 상태에서 리뷰 작성 등 권한이 필요한 메뉴를 클릭할 때 발생. [cite_start]| [cite: 28]
| **Goals** | 역할별 계정 확인 및 웹 기반 로그인 기능을 구현한다. [cite_start]| [cite: 29]

[cite_start]**4.4 Send SOS** [cite: 29]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 사이트 내 잘못된 식당 정보를 발견 시 즉각 신고하여 정확한 데이터를 유지하기 위함. [cite_start]| [cite: 29]
| **Approach** | 학생 사용자가 '정보 수정 요청' 버튼을 눌러 웹 폼을 제출하면, 해당 오류 데이터가 관리자 시스템 서버로 전송된다. [cite_start]| [cite: 30]
| **Dynamics** | 방문하려는 식당이 폐업했거나 웹사이트 정보와 실제 정보가 다를 때 발생한다. [cite_start]| [cite: 31]
| **Goals** | 사용자 참여형 데이터 오류 신고 시스템을 구현한다. [cite_start]| [cite: 31]

[cite_start]**4.5 Update Goods** [cite: 32]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 메뉴 품절, 가격 변동 등 가게의 일상적인 변경 사항을 즉시 웹사이트에 반영하기 위함. [cite_start]| [cite: 32]
| **Approach** | 매니저(또는 사장님)가 관리자 웹페이지에서 특정 메뉴의 상태값을 수정하면, 서버 DB의 해당 식당 데이터가 즉시 갱신된다. [cite_start]| [cite: 33]
| **Dynamics** | 매니저(또는 사장님)가 관리자 웹페이지에서 특정 메뉴의 상태값을 수정하면, 서버 DB의 해당 식당 데이터가 즉시 갱신된다. [cite_start]| [cite: 34]
| **Goals** | 웹 기반의 실시간 메뉴 및 상품 데이터 갱신 기능을 구현한다. [cite_start]| [cite: 35]

[cite_start]**4.6 Reception Message** [cite: 36]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 새로운 리뷰나 답글 등 주요 소식을 즉각적으로 알려 사용자의 확인을 유도하기 위함. [cite_start]| [cite: 36]
| **Approach** | DB에 새로운 데이터가 등록되면, 서버가 이를 감지하여 해당 사용자가 웹사이트에 접속해 있을 때 화면 우측 상단이나 알림함 아이콘에 뱃지(새 알림 표시)를 띄워 렌더링한다. [cite_start]| [cite: 37]
| **Dynamics** | 내 리뷰에 사장님이 답글을 달거나, 내 가게에 새로운 후기가 등록되었을 때 발생한다. [cite_start]| [cite: 38]
| **Goals** | 웹 브라우저 환경에서의 실시간 팝업/뱃지 알림 수신 기능을 구현한다. [cite_start]| [cite: 39]

[cite_start]**4.7 Is Danger** [cite: 39]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 욕설, 비방 등 부적절한 게시물을 차단하여 웹사이트 내 쾌적한 커뮤니티 환경을 유지하기 위함. [cite_start]| [cite: 39]
| **Approach** | 사용자가 웹에서 텍스트를 서버로 전송할 때, 백엔드 서버의 필터링 알고리즘이 금칙어 포함 여부를 검사하여 등록을 차단하고 관리자에게 알린다. [cite_start]| [cite: 40]
| **Dynamics** | 사용자가 리뷰나 답글을 서버로 전송하는 즉시, DB에 최종 저장되기 전에 발생한다. [cite_start]| [cite: 41]
| **Goals** | 서버단(Back-end)의 자동화된 유해물 필터링 및 차단 시스템을 구현한다. [cite_start]| [cite: 41]

[cite_start]**4.8 Request Data** [cite: 42]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 시스템 관리자가 웹사이트의 트래픽, 사용자 통계, 식당 데이터를 파악하여 서비스 개선에 활용하기 위함. [cite_start]| [cite: 42]
| **Approach** | 관리자가 대시보드 웹페이지에서 특정 기간의 통계 데이터를 서버에 요청하면, 서버가 DB에서 값을 추출해 화면에 렌더링한다. [cite_start]| [cite: 43]
| **Dynamics** | 관리자가 전체 웹사이트 이용자 추이를 분석하거나 트래픽 보고서를 확인할 때 발생한다. [cite_start]| [cite: 44]
| **Goals** | 시스템 전체 통계 로그 수집 및 관리자 대시보드 조회 기능을 구현한다. [cite_start]| [cite: 45]

[cite_start]**4.9 Give Data** [cite: 46]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 학생들의 신고(SOS)를 바탕으로 관리자가 정확한 식당 정보로 웹사이트 데이터를 강제 수정하기 위함. [cite_start]| [cite: 46]
| **Approach** | 관리자가 접수된 SOS 데이터를 확인한 후, 관리자 웹페이지에서 식당 정보를 직접 수정하여 서버 DB에 강제로 덮어씌운다. [cite_start]| [cite: 47]
| **Dynamics** | 사용자의 잘못된 정보 신고가 누적되거나 관리자가 데이터 오류 검증을 완료했을 때 발생한다. [cite_start]| [cite: 48]
| **Goals** | 관리자 권한의 데이터베이스 강제 수정 및 무결성 유지 기능을 구현한다. [cite_start]| [cite: 49]

[cite_start]**4.10 Disconnect(Logout)** [cite: 50]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 인정보 및 가게 데이터를 보호하기 위해 웹사이트 접근을 안전하게 차단하기 위함. [cite_start]| [cite: 50]
| **Approach** | 사용자가 웹페이지 내 '로그아웃' 버튼을 클릭하면, 클라이언트(브라우저)가 서버에 요청하여 현재 유지 중인 로그인 세션(Session)을 완전히 파기한다. [cite_start]| [cite: 51]
| **Dynamics** | 웹사이트 사용을 마치고 안전하게 종료하려고 할 때 발생한다. [cite_start]| [cite: 52]
| **Goals** | 안전한 접속 해제 및 세션 파기 기능을 구현한다. [cite_start]| [cite: 52]

[cite_start]**4.11 Disconnect(Logout) Notice** [cite: 53]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 사용자에게 안전하게 로그아웃(세션 종료)이 완료되었음을 확인시켜 주어 개인정보 보호에 대한 안심을 제공하기 위함. [cite_start]| [cite: 53]
| **Approach** | 서버에서 사용자의 로그아웃 요청을 받아 세션을 완전히 파기한 후 클라이언트(브라우저)로 성공 응답을 보내면, 브라우저는 로그인 전 메인 화면으로 전환하며 "안전하게 로그아웃 되었습니다"라는 팝업 메시지를 화면에 띄운다. [cite_start]| [cite: 54]
| **Dynamics** | 사용자가 '로그아웃(Disconnect)' 버튼을 누른 직후, 서버 처리가 완료되어 접속이 해제될 때 발생한다. [cite_start]| [cite: 55]
| **Goals** | 명확한 시스템 종료 상태 안내 및 로그아웃 완료 시각적 피드백을 구현한다. [cite_start]| [cite: 56]

[cite_start]**4.12 Request Verification** [cite: 57]
| 구분 | 내용 |
| :--- | :--- |
| **Purpose** | 익명 사용자가 아닌 실제 영남대 학생임을 증명하여 서비스의 신뢰도를 높이고, 허위 리뷰 작성을 방지하기 위함. [cite_start]| [cite: 57]
| **Approach** | 1. [cite_start]사용자가 웹사이트 회원가입 폼에 @yu.ac.kr 메일 주소를 입력한다. [cite: 58] <br>2. [cite_start]시스템은 외부 YU Mail Server에 API를 호출하여 고유 인증 코드를 해당 메일로 발송하도록 요청한다. [cite: 58] <br>3. 사용자가 메일함에서 코드를 확인하여 웹사이트에 입력하면 서버에서 최종 일치 여부를 검증한다. [cite_start]| [cite: 59]
| **Dynamics** | 웹사이트 가입 시점이나, 리뷰 작성 등 학생 전용 권한이 필요한 메뉴에 최초 접근할 때 발생한다. [cite_start]| [cite: 60]
| **Goals** | 학교 메일을 활용한 자동화된 학생 인증 프로세스를 구축하여 커뮤니티 정체성을 확보한다. [cite_start]| [cite: 61]

<br>

## [cite_start]5. Problem statement [cite: 61]

**5.1. [cite_start]Overview** [cite: 62]
[cite_start]영남대 맛집 커뮤니티 웹 시스템은 학생들이 영남대 주변 상권의 식당 위치와 최신 정보를 직관적으로 탐색하고, 신뢰할 수 있는 식당 리뷰 및 실시간 소통 환경을 제공하는 것이 주 목적이다. [cite: 62] [cite_start]또한, 식당 판매자(매니저/사장님)에게는 메뉴 재고 및 가게 정보를 편리하게 관리할 수 있는 도구를 제공한다. [cite: 63] 
[cite_start]이 시스템은 다음과 같은 목적을 달성해야 한다. [cite: 64]
* [cite_start]실제 데이터와 웹사이트 간의 정확한 식당 및 메뉴 정보 동기화 [cite: 64]
* 학생, 매니저, 사장님, 시스템 관리자 등 권한 구분에 따른 시스템 사용의 차별화 [cite: 64]
* [cite_start]사용자 계정 및 권한, 외부 메일 인증 정보의 데이터베이스화 [cite: 64]
* [cite_start]식당 정보, 리뷰, 통계 데이터의 체계적인 저장 및 관리 [cite: 64]

**5.2. [cite_start]Problem definition (Technical difficulties)** [cite: 65]
[cite_start]클라이언트(브라우저)와 웹 서버, 그리고 외부 시스템이 상호작용하는 과정에서 고려해야 할 문제점 및 해결 방법은 다음과 같다. [cite: 65]

**5.2.1. [cite_start]Problem #1 Data Integrity and Synchronization (데이터 무결성 및 동기화)** [cite: 66]
[cite_start]전산상의 오류나 데이터 누락이 없어야 한다. [cite: 66] [cite_start]식당이 폐업했거나 메뉴가 품절되었음에도 불구하고 웹사이트에 잘못된 정보가 렌더링된다면, 사용자는 헛걸음을 하게 되고 이 시스템의 존재 목적을 상실하게 된다. [cite: 67]
* **해결책:** 판매자가 시스템을 통해 즉각적으로 데이터를 수정할 수 있는 환경(Update Goods/Business)을 제공하고, 사용자가 직접 잘못된 정보를 신고(Send SOS)하여 관리자가 이를 검증하고 덮어씌우는(Give Data) 상호 보완적인 데이터 정화 프로세스를 강제한다. [cite: 68]

**5.2.2. [cite_start]Problem #2 Role-based Access Control and Verification (접근 권한 및 사용자 인증)** [cite: 69]
[cite_start]관리자에 의해 승인되거나 인증된 계정으로만 특정 시스템 기능에 접근이 가능해야 한다. [cite: 69] [cite_start]권한이 없는 사용자가 타인의 가게 정보를 수정하거나, 영남대 학생이 아닌 외부인이 악성 리뷰를 작성하면 커뮤니티의 신뢰도가 하락한다. [cite: 70]
* **해결책:** 회원가입 시 외부 메일 서버(YU Mail Server)와 연동하여 영남대 소속임을 검증(Request Verification)한다. [cite: 71] 이후 생성된 세션을 바탕으로 사용자 역할(Student, Manager, Owner, Admin)을 엄격히 구분하여, 각 권한에 허가된 기능(메뉴 관리, 권한 위임 등)에만 접근할 수 있도록 백엔드 라우팅을 통제한다. [cite: 72]

**5.2.3. [cite_start]Problem #3 Privacy and Security of Information (개인정보 보호 및 보안)** [cite: 73]
[cite_start]사용자의 이메일, 비밀번호 등 개인정보(Private information)를 전산화하여 관리하므로 유출 문제가 발생할 수 있다. [cite: 73] [cite_start]또한, 전산이 해킹되거나 악의적인 텍스트가 전송될 경우 시스템 전체에 치명적인 영향을 줄 수 있다. [cite: 74]
* **해결책:** 비밀번호 등의 민감한 정보는 단방향 암호화 처리하여 DB에 저장한다. [cite: 75] 또한 사용자가 리뷰나 답글을 작성할 때(Send Message), 텍스트 내의 유해물이나 SQL 인젝션 공격 코드를 백엔드 서버에서 사전에 감지하고 필터링하여 보안을 강화한다. [cite: 76]

**5.2.4. [cite_start]Problem #4 Cross-Platform Compatibility and Real-time Communication (크로스 플랫폼 호환성 및 실시간 통신)** [cite: 77]
[cite_start]본 시스템은 웹 브라우저를 기반으로 작동한다. [cite: 77] [cite_start]모바일(안드로이드, iOS)이나 PC 등 사용자의 디바이스나 운영체제가 다르더라도 동일한 환경과 화면을 제공해야 하며, 단순 웹의 한계를 넘어 실시간 알림을 제공해야 한다. [cite: 78]
* **해결책:** 다양한 화면 크기에 대응하는 반응형 웹(Responsive Web) 디자인을 적용하여 디바이스 종속성을 없앤다. [cite: 79] 또한, 내 리뷰에 답글이 달리는 등의 이벤트 발생 시 사용자가 새로고침을 하지 않아도 알림(Reception Message)을 받을 수 있도록 WebSocket이나 SSE(Server-Sent Events) 기술을 도입하여 실시간 통신 기술의 한계를 극복한다. [cite: 80]

**5.3. [cite_start]Non-Functional Requirements (NFRs)** [cite: 81]
[cite_start]시스템이 사용자의 기대치를 충족하고 안정적으로 동작하기 위해 고려해야 할 비기능적 요구사항은 다음과 같다. [cite: 81]

* [cite_start]**Performance (성능):** 지도 화면에서 특정 구역으로 이동(Move)할 때, 외부 API와 연동하여 해당 구역의 대용량 마커 및 식당 데이터를 2초 이내에 로딩하고 렌더링해야 한다. [cite: 82]
* **Security (보안):** 서버와 브라우저 간의 모든 통신은 HTTPS 프로토콜을 사용하여 암호화되어야 하며, 권한 없는 사용자의 API 접근은 HTTP 403(Forbidden) 에러로 즉각 차단해야 전한다. [cite: 83]
* [cite_start]**Usability (사용성):** 복잡한 매뉴얼 없이도 누구나 쉽게 맛집을 검색하고 리뷰를 남길 수 있는 직관적인 UI/UX를 제공해야 한다. [cite: 84]
* [cite_start]**Availability (가용성):** 트래픽이 집중되는 점심/저녁 시간대에도 시스템 다운 없이 정상적으로 접속 및 데이터 요청이 처리될 수 있도록 높은 서버 가용성을 보장해야 한다. [cite: 85]

<br>

## [cite_start]6. Glossary [cite: 86]

| Terms | Description |
| :--- | :--- |
| **학생(소비자) / Student** | [cite_start]식당 위치와 메뉴를 탐색하고 리뷰를 남기며, 학교 이메일 인증 절차를 거치는 사용자 | [cite: 86]
| **식당 주인 / Owner** | [cite_start]상점을 운영하며 식당 정보와 상품(메뉴) 재고 상황을 관리하고 리뷰에 답글을 다는 사용자 | [cite: 86]
| **관리자 / Manager** | [cite_start]전반적인 시스템 서버 관리 및 오류 신고(SOS) 데이터 검토 권한을 지닌 사용자 | [cite: 86]
| **상점(식당)** | [cite_start]웹사이트 지도상에 위치가 렌더링되며 상품을 판매하는 장소 | [cite: 86]
| **상품(메뉴)** | [cite_start]식당에서 판매를 위해 등록해 둔 음식 아이템 | [cite: 86]
| **리뷰 및 답글** | [cite_start]학생이 상점 이용 후 남기는 평가와 이에 대해 식당 주인이 작성하는 피드백 | [cite: 86]
| **오류 신고 sos** | [cite_start]학생이 상점의 잘못된 정보(폐업, 가격 오류 등)를 발견하여 관리자에게 수정을 요청하는 행위 | [cite: 86]
| **영남대 메일 서버** | [cite_start]학생 사용자의 실제 본교 소속 여부를 확인하기 위해 인증 코드를 발송하는 외부 시스템 | [cite: 86]
| **지도 API** | [cite_start]상점의 위치를 시각화하고 구역 이동 시 실시간 위치 데이터를 제공해 주는 외부 서비스 | [cite: 86] [cite_start][cite: 87]
| **사용자 데이터 테이블** | [cite_start]학생, 식당 주인, 관리자의 계정 정보와 권한 등급이 저장된 테이블 | 
| **식당 현황 테이블** | [cite_start]상점의 기본 정보(위치, 상호)와 상품 재고 및 품절 상태가 저장된 테이블 | 
| **소통 로그 테이블** | [cite_start]사용자가 작성한 리뷰, 답글, 오류 신고 내역이 통합되어 저장된 테이블 | 

<br>

## [cite_start]7. References 
* [cite_start]그림 1- https://everytime.kr/377394/v/405766392 
* 그림 2- https://everytime.kr/377394/v/405497985 
* [cite_start]그림 3- 에브리타임 맛집 검색 후 캡쳐 화면 
* [cite_start]다이어그램 – gemini 사용 
* 로고 – 나노바나나 사용