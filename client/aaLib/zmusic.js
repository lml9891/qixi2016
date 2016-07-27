(function() {
  var $music = $('#music');
  var $audio = $('#audio');
  var audio = $audio.get(0);
  var $play = $('#play');
  $play.on('ontouchstart' in window ? 'tap':'click', function () {
    if (audio.paused) {
      audio.play();
      $play.removeClass('musicOn');
    }else {
      audio.pause();
      $play.addClass('musicOn');
    }
  });
})()
