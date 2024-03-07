<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in news" :key="index" class="list">
        <span class="title">제목 : </span>{{ item.title }}
        <br/>
        <span class="description">내용 : </span>{{ item.description }}
        <br/>
        <span class="pubDate" >날짜 : {{ formatDate(item.pubDate)  }} {{ formatTime(item.pubDate) }}</span>
<!--        <span id="pubDate" >날짜 : {{ item.pubDate  }}</span>날짜 : {{ item.pubDate | format('YYYY년 MM월 DD일 dddd요일 HH:mm') }}-->
      <hr/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: "News",
  data() {
    return {
      news: [], // 뉴스 데이터를 저장할 배열
    };
  },
  props: ['item'],
  async created() {
    const response = await axios.get('/api/v1/search/news.json', {
          headers: {
            'X-Naver-Client-Id': 'SFxDgBLFfkWkbaprMhoV', // 발급받은 클라이언트 ID
            'X-Naver-Client-Secret': '4pgXg1Ybwn', // 발급받은 클라이언트 비밀번호
          },
          params: {
            query: '경제', // 검색어
            display: '20', // 갯수
            sort: 'date', // 정렬
          },
        }
    );
    this.news = response.data.items; // 응답받은 뉴스 데이터를 배열에 저장
  },
  mounted() {
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR',{ year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' }); // 년, 월, 일, 요일); // 년, 월, 일
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }); // 시, 분, 초
    },
  },
};
</script>

<style>
.list {
  margin-bottom: 10px;
}
.title {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.description{
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
@media (min-width: 1024px) {
  #app {
    display: block;
    width: 100%;
  }
}
</style>
