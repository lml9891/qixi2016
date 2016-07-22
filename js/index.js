$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'http://b.hiphotos.baidu.com/image/w%3D2048/sign=e12391182ff5e0feee188e01685835a8/c8177f3e6709c93d61f390f69d3df8dcd10054a9.jpg',
    'http://h.hiphotos.baidu.com/image/w%3D2048/sign=d061130999504fc2a25fb705d1e5e611/d058ccbf6c81800ae697160fb33533fa828b4745.jpg',
    'http://a.hiphotos.baidu.com/image/w%3D2048/sign=b9f231614dc2d562f208d7edd32991ef/cdbf6c81800a19d8bcf41b0431fa828ba61e463f.jpg',
    'http://h.hiphotos.baidu.com/image/w%3D2048/sign=7c0395304936acaf59e091fc48e18c10/9825bc315c6034a8e9336e88c9134954082376e2.jpg',
    'http://h.hiphotos.baidu.com/image/w%3D2048/sign=0dc82fb2552c11dfded1b823571f63d0/eaf81a4c510fd9f9b83bbd38272dd42a2834a4b7.jpg',
    'http://a.hiphotos.baidu.com/image/w%3D2048/sign=534c7c50c88065387beaa313a3e5a044/77c6a7efce1b9d163da5637ff1deb48f8c54644a.jpg',
    'http://e.hiphotos.baidu.com/image/w%3D2048/sign=0e7912e7552c11dfded1b823571f63d0/eaf81a4c510fd9f9bb8a806d272dd42a2834a411.jpg',
    'http://f.hiphotos.baidu.com/image/w%3D2048/sign=c44a266d544e9258a63481eea8bad058/4610b912c8fcc3ce0e94073a9045d688d43f2067.jpg',
    'http://c.hiphotos.baidu.com/image/w%3D2048/sign=d9de0911cdfc1e17fdbf8b317ea8f703/0bd162d9f2d3572c8ba822db8813632762d0c36b.jpg'
  ];
  loading({
    img: aLoadImgFirst,
    showProgress: false,
    loadingEnd: function () {
      $('#loadingBg').addClass('showAnim').on('webkitAnimationEnd', function () {
        $(this).off();
        loading({
          img: aLoadImg,
          loadingEnd: function () {
            $('#loadingBg').addClass('hideAnim').on('webkitAnimationEnd', function () {
              $(this).off();
              console.log('end');
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
        console.log('showProgress',showProgress);
        if (showProgress) {
          $loading.text(parseInt(iNow/iLen * 100));
  				console.log(parseInt(iNow/iLen * 100));
        }

				if(iNow === iLen){
          typeof params.loadingEnd === 'function'&&params.loadingEnd();
				}

			};
      yImg.src = params.img[i];
		})(i)
  }
}
