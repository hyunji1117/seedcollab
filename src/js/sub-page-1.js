// 탭 전환 시 h1 텍스트 변경 및 탭 내용 전환
$(function () {
  $('.tab').click(function () {
      $('.tab').removeClass('active').attr('aria-selected', 'false');
      $('.content').removeClass('active');

      $(this).addClass('active').attr('aria-selected', 'true');
      $('#' + $(this).attr('aria-controls')).addClass('active');

      // h1 텍스트 변경
      const bannerHeading = $('#banner-heading');
      if ($(this).attr('id') === 'tab-content1') {
          bannerHeading.text('포인핸드 소개');
      } else if ($(this).attr('id') === 'tab-content2') {
          bannerHeading.text('입양 캠페인');
      } else if ($(this).attr('id') === 'tab-content3') {
          bannerHeading.text('포인핸드 후원');
      }
      
  });

});