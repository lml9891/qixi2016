$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'images/stars.jpg',
    'images/armsFont.png',
    'images/armsQuit.png',
    'images/arm1Img1.jpg',
    'images/arm1Img2.png',
    'images/arm1Font.png',
    'images/arm2Img.jpg',
    'images/arm2Font.png',
    'images/arm3Img.jpg',
    'images/arm3Font.png',
    'images/arm4Img.jpg',
    'images/arm4Font.png',
    'images/arm5Img1.jpg',
    'images/arm5Img2.png',
    'images/arm5Font.png',
    'images/arm6Img.jpg',
    'images/arm6Font.png',
    'images/arm7Img.jpg',
    'images/arm7Font.png'
  ];
  var $loadingBg = $('#loadingBg');
  var $armsBg = $('#armsBg');
  var $armsMask = $('#armsMask');
  var od = 'ontouchstart' in window ? 'tap':'click';

  loading({
    img: aLoadImgFirst,
    showProgress: false,
    loadingEnd: function () {//加载load图片完成
      $loadingBg.addClass('showAnim').on('webkitAnimationEnd', function () {
        $(this).off();
        $('#armsBg').show();
        loading({
          img: aLoadImg,
          loadingEnd: function () {//本页所有图片完成
            $loadingBg.addClass('hideAnim').on('webkitAnimationEnd', function () {
              $(this).hide().off();
              var cClick = false;
              //真正页面运行
              $('#arms8').addClass('arms8in').on('webkitAnimationEnd', function () {
                $(this).off().removeClass('arms8in').addClass('arms8Loop');
                cClick = true;
              });

              $('.armsClick').each(function (i,k) {
                $(k).on(od, function () {
                  if (!cClick) {
                    return;
                  }
                  $armsMask.show().addClass('showAnim');
                  $('#arms'+ (i+1) +'Alert').show();
                  $('#arm'+ (i+1) +'Font').addClass('armsFontIn');
                  $('#arm'+ (i+1) +'Img2').addClass('arm'+ (i+1) +'ImgAnim');

                });
                $('#arms'+ (i+1) +'Quit').on(od, function () {
                  $armsMask.hide().removeClass('showAnim');
                  $('#arms'+ (i+1) +'Alert').hide();
                  $('#arm'+ (i+1) +'Font').removeClass('armsFontIn');
                  $('#arm'+ (i+1) +'Img2').removeClass('arm'+ (i+1) +'ImgAnim');

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
