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



// 회원 정보 입력 시 이메일 영어만 입력
function onlyAlphaNum(input) {
  const regex = /^[A-Za-z0-9_]*$/; // 영문, 숫자, 언더바만 허용하는 정규 표현식
  if (!regex.test(input.value)) {
      // 입력된 값이 정규 표현식과 맞지 않으면 값을 수정
      input.value = input.value.replace(/[^A-Za-z0-9_]/g, '');
  }
}



// 회원 정보 입력 시 숫자만 사용
function checkNumber(event) {
  if(event.key >= 0 && event.key <= 9) {
    return true;
  }
  
  return false;
}


// 주소 검색
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업을 통한 검색 결과 항목 클릭 시 실행
            var addr = ''; // 주소_결과값이 없을 경우 공백 
            var extraAddr = ''; // 참고항목

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 도로명 주소를 선택
                addr = data.roadAddress;
            } else { // 지번 주소를 선택
                addr = data.jibunAddress;
            }

            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
            } else {
                document.getElementById("UserAdd1").value = '';
            }

            // 선택된 우편번호와 주소 정보를 input 박스에 넣는다.
            document.getElementById('zipp_code_id').value = data.zonecode;
            document.getElementById("UserAdd1").value = addr;
            document.getElementById("UserAdd1").value += extraAddr;
            document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동
        }
    }).open();
}

//회원가입 시 필수 입력사항 입력해야만 가입완료가 되도록 설정
function validateForm() {
    var form = document.getElementById('registrationForm');
    if (!form.checkValidity()) {
      alert('필수 값이 모두 입력되었는지 확인 바랍니다.');
    } else {
      alert('회원가입이 정상적으로 완료 되었습니다 :)');
      window.location.href = 'index.html';
    }
  }