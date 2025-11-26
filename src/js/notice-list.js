// 탭 전환 시 h1 텍스트 변경 및 탭 내용 전환
$(function () {
  $('.tab').click(function () {
      $('.tab').removeClass('active').attr('aria-selected', 'false');
      $('.content').removeClass('active');

      $(this).addClass('active').attr('aria-selected', 'true');
      $('#' + $(this).attr('aria-controls')).addClass('active');

      // h1 텍스트 변경
      const bannerHeading = $('#banner-heading');
      if ($(this).attr('id') === 'tab-notice') {
          bannerHeading.text('공지사항');
      } else if ($(this).attr('id') === 'tab-qna') {
          bannerHeading.text('QnA');
          
      }


});





  // 아코디언 클릭 시 화살표 변경 및 답변박스 여닫을 수 있음
  $('.accordion-title').click(function () {
      $(this).next().slideToggle().siblings('.accordion-content').hide();
      
      var srcVal = $(this).find('i').attr('class');
      console.log(srcVal);

      if (srcVal == "fa-solid fa-chevron-down") {
          $(this).find('i').attr({'class': srcVal.replace('down','up')})
         
      } else {
          $(this).find('i').attr({'class': srcVal.replace('up','down')})
      }

      // $(this).siblings().find('i').attr({'class': srcVal.replace('up', 'down')});
  });



  // 페이지 전환
  $('.page-controls button').click(function () {
      $('.page-controls button').removeClass('active').removeAttr('aria-current');
      $(this).addClass('active').attr('aria-current', 'page');
  });
});