$(function () {
  var $infoSub = $('#infoSub');
  var $name = $('#name');
  var $infoError = $('#infoError');
  var $tel = $('#tel');
  var od = 'ontouchstart' in window ? 'tap':'click';
  // musicFn();

  function musicFn() {
    var $music = $('#music');
    var $audio = $('#audio');
    var audio = $audio.get(0);
    var $play = $('#play');
    $play.on(od, function () {
      if (audio.paused) {
        audio.play();
      }else {
        audio.pause();
      }
    });
  }
  $infoSub.on(od, function () {
    var sTel = $tel.val();
    var sName = $name.val();
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
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
