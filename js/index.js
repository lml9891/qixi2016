var bCanGravity = true;
var oAutoTime = null;

$(function () {

  var aLoadImgFirst = [
    'images/loading.jpg'
  ];
  var aLoadImg = [
    'images/indexBg.jpg',
    'images/indexFloor.png',
    'images/indexCar.png',
    'images/indexStar1.png',
    'images/indexStar2.png',
    'images/indexShip1.png',
    'images/indexShip2.png',
    'images/indexShip3.png',
    'images/indexTitle.png',
    'images/indexHeart.png',
    'images/indexBig.png',
    'images/indexView.jpg'
  ];
  var $loadingBg = $('#loadingBg');
  var $indexBg = $('#indexBg');
  var od = 'ontouchstart' in window ? 'tap':'click';
  var loadingTime = null;

  loading({
    img: aLoadImgFirst,
    showProgress: false,
    loadingEnd: function () {//加载load图片完成
      $loadingBg.addClass('showAnim').on('webkitAnimationEnd', function () {
        $(this).off();
        loading({
          img: aLoadImg,
          loadingEnd: function () {//本页所有图片完成
            $loadingBg.addClass('hideAnim').on('webkitAnimationEnd', function () {
              $(this).hide().off();
              //真正页面运行
              init();
            });
          }
        });
      });

    }
  });

  loadingTime = setTimeout(init,20000); //20秒若没loading完，自动进页面

  function init() {
    $('#indexBg').show();
    //重力
    // orientation();

    var bOne = false;

    //点击放大镜
    $('#indexBig').on(od,  function () {
      bOne = !bOne;
      bCanGravity = bOne;
      if (bOne) {
        $(this).hide();

        $('#floorBg').css("backgroundPosition", -430 + "px " + 0 + "px").addClass('floorBgAnim').on('webkitAnimationEnd', function () {
          $(this).off();
          $('#indexBig').addClass('indexBigAnim').show();
          $('#indexView').addClass('showAnim');
        });
        $('#bigHide,#indexCircleBox1,#indexHeart').hide();

        //文字跑马灯
        autoTabFont();
      }else {
        $('#indexBig').removeClass('indexBigAnim').show();
        $('#indexView').removeClass('showAnim');
        $('#floorBg').removeClass('floorBgAnim');
        $('#bigHide,#indexCircleBox1,#indexHeart').show();
      }
    });
  }

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

function orientation() {
    window.addEventListener('deviceorientation', orientationListener, false);
}

function orientationListener(evt) {
  if (!bCanGravity) {
    return;
  }
	if (!evt.gamma && !evt.beta) {
		evt.gamma = (evt.x * (180 / Math.PI));
		evt.beta = (evt.y * (180 / Math.PI));
		evt.alpha = (evt.z * (180 / Math.PI));
	}

	var gamma = evt.gamma;
	var beta = evt.beta;
	var alpha = evt.alpha;

	if (evt.accelerationIncludingGravity) {
		gamma = event.accelerationIncludingGravity.x * 10;
		beta = -event.accelerationIncludingGravity.y * 10;
		alpha = event.accelerationIncludingGravity.z * 10;
	}

	gamma = gamma.toFixed(1);
	beta = beta.toFixed(1);
	alpha = alpha.toFixed(1);
	if (this._lastGamma != gamma || this._lastBeta != beta) {

		$("#floorBg").css("backgroundPosition", gamma / 500 * 140 -430 + "px " + beta / 500 * 140 + "px");

		this._lastGamma = gamma;
		this._lastBeta = beta;
	}
};

//文字跑马灯
function autoTabFont() {
  var $indexFontGo = $('#indexFontGo');
  var $indexFontGoScroll = $('#indexFontGoScroll');
  var $indexFontGoContent = $('.indexFontGoContent');
  var indexFontGoHeight = $indexFontGo.height();
  var indexFontGoContentHeight = $indexFontGoContent.height();
  var iNow = 0;

  if (indexFontGoContentHeight <= indexFontGoHeight) { //如果内容高度<=外面的高度
    return ;
  }

  $indexFontGoScroll.append($indexFontGoContent.clone());

  clearInterval(oAutoTime);
  oAutoTime = setInterval(autoTabGo,10);

  function autoTabGo() {
    var indexFontGoScrollTop = $indexFontGoScroll.offset().top;
    if (iNow > indexFontGoContentHeight) {
      iNow = 0;
    }else {
      iNow++;
    }
    $indexFontGoScroll.css('top',-iNow);
  }

}
