$(function () {

  var aLoadImgFirst = [
    '../images/loading.jpg'
  ];
  var aLoadImg = [
    '../images/stars.jpg',
    '../images/love.png',
    '../images/loveBtn.png',
    '../images/lovepreview.jpg'
  ];
  var $loadingBg = $('#loadingBg');
  var $loveBg = $('#loveBg');
  var oAutoTime = null;//文字跑马灯
  var od = 'ontouchstart' in window ? 'tap':'click';

  loading({
    img: aLoadImgFirst,
    showProgress: false,
    loadingEnd: function () {//加载load图片完成
      $loadingBg.addClass('showAnim').on('webkitAnimationEnd', function () {
        $(this).off();
        $('#loveBg').show();
        loading({
          img: aLoadImg,
          loadingEnd: function () {//本页所有图片完成
            $loadingBg.addClass('hideAnim').on('webkitAnimationEnd', function () {
              $(this).hide().off();
              //真正页面运行
              $('#loveBtn').on(od, function () {//上传并抽取电影票点击事件
                $('#lovepreview').show().addClass('showAnim').on('webkitAnimationEnd', function () {
                  $(this).off();
                  //文字跑马灯
                  autoTabFont();
                });
              });
            });
          }
        });
      });

    }
  });
});
/**
 * img array 必须 加载的图片
 * showProgress Boolean 不必须 是否显示进度，默认显示(true)
 * loadingEnd function 必须 加载完执行的函数
*/
function loading(params) {
  var iNow = 0,
		  i = 0,
      iLen = params.img.length,
      showProgress  = typeof params.showProgress === 'undefined'?true:params.showProgress,
      $loading = $('#loading');
	for(i=0, l = iLen; i < l; i++){
		(function(i){
			var yImg = new Image();
			yImg.onload = function(){
				iNow++;
        if (showProgress) {
          $loading.text(parseInt(iNow/iLen * 100));
        }
				if(iNow === iLen){
          typeof params.loadingEnd === 'function'&&params.loadingEnd();
				}
			};
      yImg.src = params.img[i];
		})(i)
  }
}

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
