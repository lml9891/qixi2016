var bCanGravity = true;
var oAutoTime = null;
var iSpeed = 1;
var time = null;
var bCanMove = true;
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
    'images/indexShip0.png',
    'images/indexShip1.png',
    'images/indexShip2.png',
    'images/indexShip3.png',
    'images/indexHeart.png',
    'images/indexBig.png',
    'images/indexView.jpg'
  ];
  var $loadingBg = $('#loadingBg');
  var $indexBg = $('#indexBg');
  var $indexBig = $('#indexBig');
  var $floorBg = $('#floorBg');
  var $indexTip = $('#indexTip');
  var $floorBg = $("#floorBg");
  var $indexHeart = $('#indexHeart');
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
              //真正页面运行
              get_user_new_content(function (data) {
                if (data.Success) {
                  $(this).hide().off();
                  $('#floorBgImg').attr('src',aLoadImg[1]);
                  $('#indexFontGoContent').html(data.Message);
                }
              });
              init();
            });
          }
        });
      });

    }
  });

  loadingTime = setTimeout(init,60000); //60秒若没loading完，自动进页面

  function init() {
    $indexBg.show();
    //重力
    setTimeout(orientation, 300);

    //自动走
    autoMove();

    var bOne = false;

    //点击放大镜
    $indexBig.on(od,  triggerBig);
    //点击大楼按钮
    $('#indexCircleBox1').on(od, function () {
      toBig(true);
      setTimeout(function () {
        window.location.href = 'good.html';
      }, 2000);
    });

    function toBig(isGoOut) {
      bCanGravity = false;
      clearTimeout(time);
      bCanMove = false;

      $indexBig.hide();

      $('#indexTip,#indexHeart,#indexCircleBox1').hide();//#bigHide,#indexCircleBox1,

      $('.indexCar').css({
        'left': 40,
        'top': 830
      });
      $('.indexShip,.indexShip0').css({
        'top': 807
      });

      $('#floorBgImg').css('left',-320);
      $('#floorBgImg,#indexBgImg').addClass('floorBgImgIn');
      $('#star2Bg,#star1Bg').removeClass('starBgOutAnim').addClass('starBgIn').on('webkitAnimationEnd', function () {
        $(this).off().removeClass('starBgIn').addClass('starBgInAnim');
      });

      $floorBg.css({
        'transform': 'scale(1.9)',
        '-webkit-transform': 'scale(1.9)'
      }).on('webkitTransitionEnd', function () {
        $(this).off();
        if (!isGoOut) {
          $indexBig.css({
            left: 338,
            top: 473
          }).show();
          // $indexBig.addClass('indexBigAnim').show();
        }
        $('#indexView').addClass('showAnim');
      });

      //文字跑马灯
      autoTabFont();
    }
    function triggerBig() {
      bOne = !bOne;

      if (bOne) {
        toBig();
      }else {
        $indexBig.removeClass('indexBigAnim').hide();
        $('#indexView').removeClass('showAnim');
        $('.indexCar').css({
          'left': 0,
          'top': 720
        });
        $('.indexShip').css({
          'top': 637
        });
        $('.indexShip0').css({
          'top': 610
        });
        $('#indexHeart').css('left',209);
        $('#indexTip').css('left',314);
        $('#indexCircleBox1').css('left',218);

        $('#star1Bg,#star2Bg').removeClass('starBgInAnim').addClass('starBgOut');
        setTimeout(function () {
          $('#star1Bg,#star2Bg').off().removeClass('starBgOut').addClass('starBgOutAnim');
        },1000);
        $('#floorBgImg,#indexBgImg').removeClass('floorBgImgIn').addClass('floorBgImgOut').on('webkitAnimationEnd', function () {
          $(this).off().removeClass('floorBgImgOut');
        });

        $floorBg.css({
          'left': 0,
      		'transform': 'scale(1)',
          '-webkit-transform': 'scale(1)'
        }).on('webkitTransitionEnd', function () {
          $(this).off();
          $indexBig.css({
            left: 258,
            top: 297
          }).show();
          $('#indexTip,#indexHeart,#indexCircleBox1').show();
        });
        bCanGravity = true;
      }
    }
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
		evt.gamma = (evt.x * (220 / Math.PI));
		evt.beta = (evt.y * (220 / Math.PI));
		evt.alpha = (evt.z * (220 / Math.PI));
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
    if (iSpeed<10) {
      iSpeed+=1;
    }
		this._lastGamma = gamma;
		this._lastBeta = beta;
	}
};

//自动走
function autoMove() {
  var $starBg = $('#star1Bg,#star2Bg');
  var $bg = $('#floorBgImg,#indexBgImg');
  var $indexCircleBox1 = $('#indexCircleBox1');
  var $indexHeart = $('#indexHeart');
  var $indexTip = $('#indexTip');
  var $indexBig = $('#indexBig');
  var gapTime = 50;
  var iNow = 0;

  var winWidth = $(window).width();

  moveFn();
  time = setInterval(moveFn, gapTime);

  function moveFn() {
    // $('.dafs').html('iNow:'+iNow);
    if (iNow > 527) {
      clearInterval(time);
      iNow = 527;
    }else {
      iNow+=iSpeed;
    }
    // $('.dafs').html('i2Now:'+iNow);
    $bg.css({
      left: -iNow
    });
    $starBg.css({
      left: -iNow
    });
    if (548 - iNow > 10) {
      $indexCircleBox1.css({
        left: 548 - iNow
      });
    }
    if (644 - iNow > 10) {
      $indexTip.css({
        left: 644 - iNow
      });
    }
    if ( 540 - iNow > 10) {
      $indexHeart.css({
        left: 530 - iNow
      });
    }
    if (579 - iNow > 10) {
      $indexBig.css({
        left: 579 - iNow
      });
    }
  }

}
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
