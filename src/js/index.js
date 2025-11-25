// page-1 arrow down btn scroll down to page-2

document.querySelector('.btn-antiman').addEventListener('click', function (event) {
  document.querySelector('.center').scrollIntoView({
    behavior: 'smooth', // 부드럽게 이동
    block: 'center',  // 수직으로 중앙 정렬
  });
});
