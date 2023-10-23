# Ansan-In by. JMC50

# 기획

> ## 기능
> 
> * 온라인 학생증
> * 급식 정보 확인
> * 시간에 맞춰 알려주는 시간표
> * 현재 날씨 & 습도 표시
> * 학교 공지사항 크롤링 및 표시
>
> ## 사용 라이브러리 및 프레임워크
>
> * Svelte
> * Nest
> * dayjs
> * Quagga
> * bitgener
>
> ## api
>
> * 나이스 - 급식식단정보
> * open wheather
>

# DB

> ## User
>
> * id: uuid (PK)
> * gid: string (NOT NULL)
> * name: string (NULLABLE)
> * age: int (1 | 2 | 3 | NULL)
> * class: int (NULLABLE)
> * number: int (NULLABLE)
> * barcode: int (NULLABLE)
> * email: string (NOT NULL)
> * picture: string (NOT NULL)
>
> ## Weather
>
> * id: uuid (PK)
> * temp: int (NOT NULL)
> * feels_like: int (NOT NULL)
> * temp_min: int (NOT NULL)
> * temp_max: int (NOT NULL)
> * humidity: int (NOT NULL)
> * icon: string (NOT NULL)
> * last_get_info: int (NOT NULL)

# API

> ## oauth
>
> GET /oauth/login => 구글 로그인 요청 => 구글 로그인 시스템으로 이동
> GET /oauth/google/callback => 구글 로그인 시스템에서 서버로 콜백
> GET /oauth/check => 계정이 db에 있는지 없는지 체크
>
> ## User
>
> GET /user/user/getInfo/:id => 아이디로 유저의 정보를 받아옴
> GET /user/user/getuserbyEmail/:email => 이메일로 유저의 정보를 받아옴
> POST /user/user/update/:email => 이메일로 유저의 정보를 받아오고, 업데이트 함
>
> ## weather
>
> GET /weather/weather/getweather => 날씨 정보를 받아옴