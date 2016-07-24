$(function () {
  var od = 'ontouchstart' in window ? 'tap':'click';

  $('#loveBtn').on(od, function () {//上传并抽取电影票点击事件
    $('#lovepreview').show().addClass('showAnim').on('webkitAnimationEnd', function () {
      $(this).off();
      //文字跑马灯
      autoTabFont();
    });
  });
});


//文字跑马灯
function autoTabFont() {
  var $loveFontGo = $('#loveFontGo');
  var $loveFontGoScroll = $('#loveFontGoScroll');
  var $loveFontGoContent = $('.loveFontGoContent');
  var loveFontGoHeight = $loveFontGo.height();
    $loveFontGoContent.html($('#loveInp').val());//赋值
  var loveFontGoContentHeight = $loveFontGoContent.height();
  var iNow = 0;

  if (loveFontGoContentHeight <= loveFontGoHeight) { //如果内容高度<=外面的高度
    return ;
  }

  $loveFontGoScroll.append($loveFontGoContent.clone());

  oAutoTime = setInterval(autoTabGo,10);

  function autoTabGo() {
    var loveFontGoScrollTop = $loveFontGoScroll.offset().top;
    if (iNow > loveFontGoContentHeight) {
      iNow = 0;
    }else {
      iNow++;
    }
    $loveFontGoScroll.css('top',-iNow);
  }

}
