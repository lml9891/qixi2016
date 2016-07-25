$(function () {
  var $infoSub = $('#infoSub');
  var $name = $('#name');
  var $infoError = $('#infoError');
  var $tel = $('#tel');
  var od = 'ontouchstart' in window ? 'tap':'click';
  $infoSub.on(od, function () {
    var sTel = $tel.val();
    var sName = $name.val();
    // if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/.test(sTel)) {
    //   $infoError.html('手机号有误');
    //   return;
    // }
    submit_userinfo_get_movieticket(sName,sTel,function (data) {
      if (data.Success) {
        if (data.ReturnCode === '001') {
          window.location.href = 'repeat.html';
        }else if (data.ReturnCode === '000') {
          window.location.href = 'win.html';
          localStorage.WINCODE = data.Message;
        }else if (data.ReturnCode === '-001') {
          window.location.href = 'lose.html';
        }
      }
    });
  });
});
