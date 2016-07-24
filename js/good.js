$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'images/stars.jpg',
    'images/good.png'
  ];
  var $loadingBg = $('#loadingBg');
  var $goodHeart = $('.goodHeart');
  var $goodBg = $('#goodBg');
  var od = 'ontouchstart' in window ? 'tap':'click';
  var  myScroll = new IScroll('#iWrapper', { mouseWheel: true, click: true })
  $goodHeart.on(od, function () {
    $goodHeart.removeClass('goodHeartOn');
    var $next = $(this).next();
    var nextNum = $next.html();
    if (!$(this).data('true')) {
      $(this).addClass('goodHeartOn');
      $next.html(++nextNum);
      $(this).data('true',true)
    }else {
      $next.html(--nextNum);
    }
  });

});
