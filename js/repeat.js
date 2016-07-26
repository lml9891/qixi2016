$(function () {
  var od = 'ontouchstart' in window ? 'tap':'click';

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
