// src/index.js

// 전체 스타일 import
import './scss/main.scss';

// 공통 JS
import './js/index.js';
import './js/top-btn-scroll.js';
import './js/notice-list.js'; 

// 페이지별 JS를 조건부로 실행
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  
  // notice-list 페이지인 경우
  if (currentPath.includes('notice-list')) {
    import('./js/notice-list.js').then(module => {
      // notice-list 전용 로직 실행
    });
  }
  
  // sub-page-2 페이지인 경우
  if (currentPath.includes('sub-page-2')) {
    import('./js/sub-page-2.js').then(module => {
      // sub-page-2 전용 로직 실행
    });
  }
  
  // page2-slider가 필요한 경우
  if (currentPath.includes('index.html') || currentPath === '/') {
    import('./js/page2-slider.js').then(module => {
      // 슬라이더 초기화
    });
  }
});