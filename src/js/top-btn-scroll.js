$(window).scroll(function(){

  if($(this).scrollTop()>800){ //800 넘으면 보임
      $(".top-btn-icon i").fadeIn(800); //0.8초
  }else{
      $(".top-btn-icon i").fadeOut('slow'); //800이하면 안보임, slow=느리게
  }

});

$(function(){
  $("#top-btn").on({
      mouseenter: function(){
          $(this).animate({
              bottom: "60px"
          }, 400);
      },
      mouseleave: function(){
          $(this).animate({
              bottom: "50px"
          }, 400);
      }
  });
});
    