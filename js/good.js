$(function () {
    $('#modal-img').hide();
    loaded();
    page = 0;
    var listData = [];
   
    loaddata();

    function loaded() {
        setTimeout(function () {
            myScroll = new IScroll('#iWrapper', {
                mouseWheel: true, probeType: 3, click: true
            })
            myScroll.on("slideUp", function () {
                page = page + 1;
                //加载新文档
                $('#modal-img').show();
                loaddata();
     
            });
        }, 100);

    }

    function loaddata() {
        get_contents(page, function (data) {
            console.log("page:" + page);
            console.log(data);
            var sHtml = '';
            if (data.Success) {
                listData = data.Data;
                console.log(listData);
                $.each(data.Data, function (i, k) {
                    sHtml += '<li class="clear">' +
                      '<div class="goodListL">' +
                        '<h2 class="goodListLh2">To ' + k.LoveTo + '</h2>' +
                        '<p class="goodListLP">' + k.Content + '</p>' +
                        '<h2 class="goodListLh2 tar">From ' + k.LoveFrom + '</h2>' +
                      '</div>' +
                      '<div class="goodListR">';
                    if (k.IsClicked) {
                        sHtml += '<div   data_id="' + k.ID + '" class="goodHeart changeWord goodHeartOn">桃心</div>';
                    } else {
                        sHtml += '<div   data_id="' + k.ID + '" class="goodHeart changeWord">桃心</div>';
                    }
                    sHtml += '<p class="tac goodNum">' + k.LoveCount + '</p>' +
                  '</div>' +
                '</li>';
                });
                console.log(sHtml);
                $('#goodList').append(sHtml);
                myScroll.refresh();
                $('#modal-img').hide();
                addHeart();
                // musicFn();

            }
        });
    }

    var aLoadImgFirst = [
      'images/loading.jpg'
    ];
    var aLoadImg = [
      'images/stars.jpg',
      'images/good.png'
    ];
    var od = 'ontouchstart' in window ? 'tap' : 'click';

    //    get_contents(function (data) {
    //    console.log(data);
    //    var sHtml = '';
    //    if (data.Success) {
    //        data.Data.sort(function (a, b) {
    //            return b.LoveCount - a.LoveCount;
    //        });
    //        listData = data.Data;
    //        $.each(data.Data, function (i, k) {
    //            sHtml += '<li class="clear">' +
    //              '<div class="goodListL">' +
    //                '<h2 class="goodListLh2">To ' + k.LoveTo + '</h2>' +
    //                '<p class="goodListLP">' + k.Content + '</p>' +
    //                '<h2 class="goodListLh2 tar">From ' + k.LoveFrom + '</h2>' +
    //              '</div>' +
    //              '<div class="goodListR">';
    //            if (k.IsClicked) {
    //                sHtml += '<div class="goodHeart changeWord goodHeartOn">桃心</div>';
    //            } else {
    //                sHtml += '<div class="goodHeart changeWord">桃心</div>';
    //            }
    //            sHtml += '<p class="tac goodNum">' + k.LoveCount + '</p>' +
    //          '</div>' +
    //        '</li>';
    //        });
    //        $('#goodList').append(sHtml);
    //        // addHeart();
    //        // musicFn();

    //    }
    //});

    function musicFn() {
        var $music = $('#music');
        var $audio = $('#audio');
        var audio = $audio.get(0);
        var $play = $('#play');
        $play.on(od, function () {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    }


    function addHeart() {
        var $loadingBg = $('#loadingBg');
        var $goodHeart = $('.goodHeart');
        var $goodBg = $('#goodBg');
        var od = 'ontouchstart' in window ? 'tap' : 'click';
        //var myScroll = new IScroll('#iWrapper', {
        //    mouseWheel: true, probeType: 3, click: true
        //})
        $goodHeart.on(od, function () {
            var $next = $(this).next();
            var $closest = $(this).closest('li');
            var nextNum = $next.html();
            var id = $(this).attr("data_id");
            console.log(id);
            var iNowItem = listData[$closest.index()];
            add_like_count(id, function (data) {
                if (data.ReturnCode === '000') {
                    $next.html(++nextNum);
                    $goodHeart.eq($closest.index()).addClass('goodHeartOn');
                }
            });
        });
    }
});
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', loaded, false);