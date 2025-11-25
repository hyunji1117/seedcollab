// 페이지 로드 시 동의 버튼 비활성화
$(document).ready(function() {
  $('.btn-confirm').prop('disabled', true); // 동의 버튼을 비활성화 상태로 설정
});

// 입력 값에서 영문, 숫자, 언더바만 허용하는 함수
function onlyAlphaNum(input) {
  const regex = /^[A-Za-z0-9_]*$/; // 영문, 숫자, 언더바만 허용하는 정규 표현식
  if (!regex.test(input.value)) {
      // 입력된 값이 정규 표현식과 맞지 않으면 값을 수정
      input.value = input.value.replace(/[^A-Za-z0-9_]/g, '');
  }
}

// 전체 동의 체크박스 처리
$('#check5').change(function () {
  const isChecked = $(this).is(':checked');
  $('input[type="checkbox"]').not(this).prop('checked', isChecked);
  toggleAgreeButton(); // 동의 버튼 상태 갱신
});

// 취소 버튼 클릭 시 모든 체크박스 해제
$('.btn-cancel').click(function () {
  $('input[type="checkbox"]').prop('checked', false);
  toggleAgreeButton(); // 동의 버튼 상태 갱신
});

// 개별 체크박스 변경 감지
$('input[type="checkbox"]').change(function () {
  toggleAgreeButton(); // 동의 버튼 상태 갱신
});




// 개별 체크박스 변경 감지
$('input[type="checkbox"]').change(function () {
  toggleAgreeButton(); // 동의 버튼 상태 갱신
});

// 동의 버튼 상태 갱신 함수
function toggleAgreeButton() {
  // 체크박스 1, 2, 3, 5가 모두 체크되었는지 확인
  const isChecked1 = $('#check1').is(':checked');
  const isChecked2 = $('#check2').is(':checked');
  const isChecked3 = $('#check3').is(':checked');
  const isChecked4 = $('#check4').is(':checked');
  const isChecked5 = $('#check5').is(':checked');

  // 조건에 맞는지 확인
  const condition1 = isChecked1 && isChecked2 && isChecked3 && isChecked5;  // 1, 2, 3, 5 모두 체크
  const condition2 = isChecked1 && isChecked2 && isChecked3;                // 1, 2, 3만 체크
  const condition3 = isChecked1 && isChecked2 && isChecked3 && isChecked4 && isChecked5; // 1, 2, 3, 4, 5 모두 체크

  // 동의 버튼을 활성화하려면 위 세 가지 조건 중 하나라도 만족해야 함
  const enableAgreeButton = condition1 || condition2 || condition3;

  // 동의 버튼 상태 설정
  $('.btn-confirm').prop('disabled', !enableAgreeButton);
}

// 동의 버튼 클릭 시
$('.btn-confirm').click(function () {
  // 버튼이 비활성화되어 있으면 alert 창을 띄움
  if ($(this).is(':disabled')) {
    alert("이용약관에 동의 하셔야 합니다.");
  } else {
    // 버튼이 활성화된 경우에만 register-userinfo로 이동
    window.location.href = 'index-register-userinfo.html';
  }
});
