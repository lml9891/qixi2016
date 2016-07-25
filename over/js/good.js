$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'images/stars.jpg',
    'images/good.png'
  ];
  var listData = [];

  get_contents(function (data) {
    var sHtml = '';
    if (data.Success) {
      listData = data.Data;
      $.each(data.Data, function (i,k) {
        sHtml += '<li>'+
          '<p class="goodListL slideShine">'+ k.Content +'</p>'+
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
    }
  });
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
        $(this).addClass('goodHeartOn');
        $next.html(++nextNum);
        $(this).data('true',true);
        add_like_count(iNowItem.ID,function (data) {
          if (data.Success) {
            console.log(data);
          }
        });
      }
    });
  }

});
