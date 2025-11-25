// 참고 링크 : https://recoveryman.tistory.com/121
// 참고 링크 : https://velog.io/@h_jinny/javascript-body-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%89%EA%B8%B0

$(function () {
  var d = false;

  $("#page-2").on('mousewheel DOMMouseScroll', function (e) {
      var E = e.originalEvent;
      delta = 0;
      if (E.detail) {
          delta = E.detail * -40;
      } else {
          delta = E.wheelDelta;
      };

      var a = parseInt($(".center ul").css("top"));
      var b = $(".center li").height();
      var c = $('.center li').length;

      var lt_a = parseInt($(".left-top ul").css("top"));
      var lt_b = $(".left-top li").height();
      var lt_c = $('.left-top li').length;

      var lb_a = parseInt($(".left-bottom ul").css("top"));
      var lb_b = $(".left-bottom li").height();
      var lb_c = $('.left-bottom li').length;

      var rt_a = parseInt($(".right-top ul").css("top"));
      var rt_b = $(".right-top li").height();
      var rt_c = $('.right-top li').length;

      var rb_a = parseInt($(".right-bottom ul").css("top"));
      var rb_b = $(".right-bottom li").height();
      var rb_c = $('.right-bottom li').length;

      if (delta < 0 && a > (c - 1) * -b && !d) {
          // 마우스 휠을 아래로 내렸을 경우(delta=음수)
          e.preventDefault(); //page2 스크롤 기능 막음
          d = true;
          $('.center ul').stop().animate({
              "top": a += -b
          }, 500, function () {
              // d = false;
          });

          $('.left-top ul').stop().animate({
              "top": lt_a += -lt_b
          }, 950, function () {
              // d = false;
          });

          $('.left-bottom ul').stop().animate({
              "top": lb_a += -lb_b
          }, 1050, function () {
              // d = false;
          });

          $('.right-top ul').stop().animate({
              "top": rt_a += -rt_b
          }, 950, function () {
              // d = false;
          });

          $('.right-bottom ul').stop().animate({
              "top": rb_a += -rb_b
          }, 1050, function () {
              d = false;
          });

      };

      if (delta > 0 && a < 0 && !d) {
          // 마우스 휠을 위로 올렸을 경우
          e.preventDefault(); //page2 스크롤 기능 막음
          d = true;
          $('.center ul').stop().animate({
              "top": a += b
          }, 500, function () {
              // d = false;
          });

          $('.left-top ul').stop().animate({
              "top": lt_a += lt_b
          }, 950, function () {
              // d = false;
          });

          $('.left-bottom ul').stop().animate({
              "top": lb_a += lb_b
          }, 1050, function () {
              // d = false;
          });

          $('.right-top ul').stop().animate({
              "top": rt_a += rt_b
          }, 950, function () {
              // d = false;
          });

          $('.right-bottom ul').stop().animate({
              "top": rb_a += rb_b
          }, 1050, function () {
              d = false;
          });
      };

  });
});






// 왼쪽 문구
// $(function () {
//     var d = false;
//     $("#page-2").on('mousewheel DOMMouseScroll', function (e) {
//         var E = e.originalEvent;
//         delta = 0;
//         if (E.detail) {
//             delta = E.detail * -40;
//         } else {
//             delta = E.wheelDelta;
//         };

//         var l_a = parseInt($(".left-top ul").css("top"));
//         var l_b = $(".left-top li").height();
//         var l_c = $('.left-top li').length;

//         if (delta < 0 && l_a > (l_c - 1) * -l_b && !d) {
//             //마우스 휠을 아래로 내렸을 경우(delta=음수)
//             d = true;
//             $('.left-top ul').stop().animate({
//                 "top": l_a += -l_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//         if (delta > 0 && l_a < 0 && !d) {
//             //마우스 휠을 아래로 내렸을 경우(delta=음수)
//             d = true;
//             $('.left-top ul').stop().animate({
//                 "top": l_a += l_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//     });
// });

// $(function () {
//     var d = false;
//     $("#page-2").on('mousewheel DOMMouseScroll', function (e) {
//         var E = e.originalEvent;
//         delta = 0;
//         if (E.detail) {
//             delta = E.detail * -40;
//         } else {
//             delta = E.wheelDelta;
//         };

//         var lb_a = parseInt($(".left-bottom ul").css("top"));
//         var lb_b = $(".left-bottom li").height();
//         var lb_c = $('.left-bottom li').length;

//         if (delta < 0 && lb_a > (lb_c - 1) * -lb_b && !d) {
//             // 마우스 휠을 아래로 내렸을 경우(delta=음수)
//             d = true;
//             $('.left-bottom ul').stop().animate({
//                 "top": lb_a += -lb_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//         if (delta > 0 && lb_a < 0 && !d) {
//             // 마우스 휠을 위로 올렸을 경우
//             d = true;
//             $('.left-bottom ul').stop().animate({
//                 "top": lb_a += lb_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//     });
// });



// // 오른쪽 문구
// $(function () {
//     var d = false;
//     $("#page-2").on('mousewheel DOMMouseScroll', function (e) {
//         var E = e.originalEvent;
//         delta = 0;
//         if (E.detail) {
//             delta = E.detail * -40;
//         } else {
//             delta = E.wheelDelta;
//         };

//         var r_a = parseInt($(".right-top ul").css("top"));
//         var r_b = $(".right-top li").height();
//         var r_c = $('.right-top li').length;

//         if (delta < 0 && r_a > (r_c - 1) * -r_b && !d) {
//             // 마우스 휠을 아래로 내렸을 경우(delta=음수)
//             d = true;
//             $('.right-top ul').stop().animate({
//                 "top": r_a += -r_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//         if (delta > 0 && r_a < 0 && !d) {
//             // 마우스 휠을 위로 올렸을 경우
//             d = true;
//             $('.right-top ul').stop().animate({
//                 "top": r_a += r_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//     });
// });

// $(function () {
//     var d = false;
//     $("#page-2").on('mousewheel DOMMouseScroll', function (e) {
//         var E = e.originalEvent;
//         delta = 0;
//         if (E.detail) {
//             delta = E.detail * -40;
//         } else {
//             delta = E.wheelDelta;
//         };

//         var rb_a = parseInt($(".right-bottom ul").css("top"));
//         var rb_b = $(".right-bottom li").height();
//         var rb_c = $('.right-bottom li').length;

//         if (delta < 0 && rb_a > (rb_c - 1) * -rb_b && !d) {
//             // 마우스 휠을 아래로 내렸을 경우(delta=음수)
//             d = true;
//             $('.right-bottom ul').stop().animate({
//                 "top": rb_a += -rb_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//         if (delta > 0 && rb_a < 0 && !d) {
//             // 마우스 휠을 위로 올렸을 경우
//             d = true;
//             $('.right-bottom ul').stop().animate({
//                 "top": rb_a += rb_b
//             }, 600, function () {
//                 d = false;
//             });
//         };
//     });
// });