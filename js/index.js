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
    $indexBg.show();
    //重力
    orientation();

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
      $indexBig.hide();

      $('#indexTip,#indexHeart,#indexCircleBox1').hide();//#bigHide,#indexCircleBox1,

      $('.indexCar').css({
        'left': 40,
        'top': 830
      });
      $('.indexShip,.indexShip0').css({
        'top': 807
      });

      $floorBg.css("backgroundPosition", -320 + "px " + 0 + "px")
      .css({
        'transform': 'scale(1.9)',
        'background-position': '-250px 180px'
      }).on('webkitTransitionEnd', function () {
        $(this).off();
        if (!isGoOut) {
          $indexBig.addClass('indexBigAnim').show();
        }
        $('#indexView').addClass('showAnim');
      });

      // .animate({
      //   'transform': 'scale(1.9)',
      //   'background-position': '-250px 180px'
      // }, function () {
      //   if (!isGoOut) {
      //     $indexBig.addClass('indexBigAnim').show();
      //   }
      //   $('#indexView').addClass('showAnim');
      // });


      //文字跑马灯
      autoTabFont();
    }
    function triggerBig() {
      bOne = !bOne;

      if (bOne) {
        toBig();
        bCanGravity = false;
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

        $floorBg.css({
          'background-position': '-320px top',
      		'transform': 'scale(1)'
        }).on('webkitTransitionEnd', function () {
          $(this).off();
          $indexBig.show();
          $('#indexTip,#indexHeart,#indexCircleBox1').show();
        });
        // $floorBg.animate({
        //   'background-position': '-320px top',
      	// 	'transform': 'scale(1)',
        // },function () {
        //     $indexBig.show();
        //     $('#indexTip,#indexHeart,#indexCircleBox1').show();//#bigHide,#indexCircleBox1,
        // });
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
  // if (!bCanGravity) {
  //   return;
  // }
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
    $('.ss').html(gamma / 500 * 140 -430 + "px " + beta / 500 * 140 + "px");
		$floorBg.css("backgroundPosition", gamma / 500 * 140 -430 + "px " + beta / 500 * 140 + "px");
    $indexHeart.css({
      left:gamma / 500 * 140 + 192,
      top:beta / 500 * 140 + 346
    });
    $indexBig.css({
      left:gamma / 500 * 140 + 258,
      top:beta / 500 * 140 + 356
    });
    $indexTip.css({
      left:gamma / 500 * 140,
      top:beta / 500 * 140 - 70
    });

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
