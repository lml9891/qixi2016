$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'images/stars.jpg',
    'images/good.png'
  ];
  var od = 'ontouchstart' in window ? 'tap':'click';
  var listData = [];

  get_contents(function (data) {
    var sHtml = '';
    if (data.Success) {
      data.Data.sort(function (a,b) {
        return b.LoveCount-a.LoveCount;
      });
      listData = data.Data;
      $.each(data.Data, function (i,k) {
        sHtml += '<li class="clear">'+
          '<div class="goodListL">'+
            '<h2 class="goodListLh2 slideShine">From </h2>'+
            '<p class="goodListLP slideShine">'+ k.Content +'</p>'+
            '<h2 class="goodListLh2 tar slideShine">To </h2>'+
          '</div>'+
          '<div class="goodListR">';
            if (k.IsClicked) {
              sHtml += '<div class="goodHeart changeWord goodHeartOn">桃心</div>';
            }else {
              sHtml += '<div class="goodHeart changeWord">桃心</div>';
            }
            sHtml += '<p class="tac goodNum">'+ k.LoveCount +'</p>'+
          '</div>'+
        '</li>';
      });
      $('#goodList').append(sHtml);
      addHeart();
      // musicFn();

    }
  });
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
  function addHeart() {
    var $loadingBg = $('#loadingBg');
    var $goodHeart = $('.goodHeart');
    var $goodBg = $('#goodBg');
    var od = 'ontouchstart' in window ? 'tap':'click';
    var  myScroll = new IScroll('#iWrapper', { mouseWheel: true, click: true })
    $goodHeart.on(od, function () {
      var $next = $(this).next();
      var $closest = $(this).closest('li');

      var nextNum = $next.html();
      var iNowItem = listData[$closest.index()];
      if (!iNowItem.IsClicked) {
        add_like_count(iNowItem.ID,function (data) {
          if (data.ReturnCode === '000') {
            $goodHeart.eq($closest.index()).addClass('goodHeartOn');
            $next.html(++nextNum);
          }
        });
      }
    });
  }

});
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
