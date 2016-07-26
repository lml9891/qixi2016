$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'images/stars.jpg',
    'images/loveSuc.png',
    'images/loveSucSun.png'
  ];
  var $loadingBg = $('#loadingBg');
  var $loveSucBg = $('#loveSucBg');
  var $loveSucSun = $('#loveSucSun');
  var od = 'ontouchstart' in window ? 'tap':'click';
  $('#loveSucBtn').on(od, function (e) {
    e.stopPropagation();
    $loveSucSun.show().addClass('showAnim').on('webkitAnimationEnd', function () {
      $(this).off();
    });
  });
  $(document).on(od, function () {
    $loveSucSun.removeClass('showAnim').hide();
  });
  musicFn();

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
});
