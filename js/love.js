$(function () {
  var od = 'ontouchstart' in window ? 'tap':'click';
  var $loveInp = $('#loveInp');
  var $loveFrom = $('#loveFrom');
  var $loveTo = $('#loveTo');
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
  $('#loveBtn').on(od, function () {//上传并抽取电影票点击事件
    var sLoveFromVal = $loveFrom.val();
    var sLoveToVal = $loveTo.val();
    var sLoveInpVal = $loveInp.val();
    if (sLoveFromVal.length<=0) {
      $('#infoError').html('From不能为空');
      return;
    }
    if (sLoveInpVal.length>14) {
      $('#infoError').html('您输入的情话大于14字');
      return;
    }

    if (sLoveInpVal.length<3) {
      $('#infoError').html('您输入的情话小于3字');
      return;
    }
    if (sLoveInpVal.length<=0) {
      $('#infoError').html('上传情话不能为空');
      return;
    }
    if (sLoveToVal.length<=0) {
      $('#infoError').html('To不能为空');
      return;
    }
    add_love_content(sLoveInpVal,sLoveFromVal,sLoveToVal,function (data) {
      if (data.Success) {
        $('#lovepreview').show().addClass('showAnim').on('webkitAnimationEnd', function () {
          $(this).off();
          //文字跑马灯
          autoTabFont();
          setTimeout(function () {
            window.location.href = 'loveSuc.html';
          },2000);
        });
      }
    });

  });
});


//文字跑马灯
function autoTabFont() {
  var $loveFontGo = $('#loveFontGo');
  var $loveFontGoScroll = $('#loveFontGoScroll');
  var $loveFontGoContent = $('.loveFontGoContent');
  var loveFontGoHeight = $loveFontGo.height();
  $loveFontGoContent.html('To ' + $('#loveTo').val() + '<br />' + $('#loveInp').val() + '<br />' + 'From ' + $('#loveFrom').val());//赋值
  var loveFontGoContentHeight = $loveFontGoContent.height();
  var iNow = 0;

  if (loveFontGoContentHeight <= loveFontGoHeight) { //如果内容高度<=外面的高度
    return ;
  }

  $loveFontGoScroll.append($loveFontGoContent.clone());

  oAutoTime = setInterval(autoTabGo,20);

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
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
