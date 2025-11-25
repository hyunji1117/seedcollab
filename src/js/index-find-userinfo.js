// 탭 전환 시 h1 텍스트 변경 및 탭 내용 전환
$(function () {
  $('.tab').click(function () {
      $('.tab').removeClass('active').attr('aria-selected', 'false');
      $('.content').removeClass('active');

      $(this).addClass('active').attr('aria-selected', 'true');
      $('#' + $(this).attr('aria-controls')).addClass('active');

      // h1 텍스트 변경
      const bannerHeading = $('#banner-heading');
      if ($(this).attr('id') === 'tab-find-id') {
          bannerHeading.text('아이디/비밀번호 찾기');
      } else if ($(this).attr('id') === 'tab-find-pw') {
          bannerHeading.text('아이디/비밀번호 찾기');
      }
  });



  // 페이지 전환
  $('.page-controls button').click(function () {
      $('.page-controls button').removeClass('active').removeAttr('aria-current');
      $(this).addClass('active').attr('aria-current', 'page');
  });
});



// 가입시 이메일 영어만 입력
function onlyAlphaNum(input) {
  const regex = /^[A-Za-z0-9_]*$/; // 영문, 숫자, 언더바만 허용하는 정규 표현식
  if (!regex.test(input.value)) {
      // 입력된 값이 정규 표현식과 맞지 않으면 값을 수정
      input.value = input.value.replace(/[^A-Za-z0-9_]/g, '');
  }
}