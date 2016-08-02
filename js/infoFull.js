$(function () {
    var od = 'ontouchstart' in window ? 'tap' : 'click';
    var $infoSub = $('#infoSub');
    var $name = $('#name');
    var $tel = $('#tel');
    var $time = $('#time');
    var $province = $('#province');
    var $city = $('#city');
    var $dealer = $('#dealer');
    var $infoError = $('#infoError');

    $infoSub.on(od, function () {
        var sTimeVal = $time.val();
        var sDealerVal = $dealer.val();
        var sNameVal = $name.val();
        var sTelVal = $tel.val();



        if (sDealerVal === '0') {
            $infoError.html('请选经销商');
            return;
        }
        if (sTimeVal === '0') {
            $infoError.html('请选择意向购车时间');
            return;
        }
        //var province = $('#province option:selected').text();//选中的文本
        //var city = $('#city option:selected').text();
        //var sDealerName = "";
        add_activity_customer_info(sNameVal, sTelVal, $province.val(), $city.val(), "", sDealerVal, "", sTimeVal, sDealerVal, function (data) {
            if (data.Success) {
                window.location.href = 'orderSuc.html';
            }
        });

    });

    get_userinfo(function (data) {
        console.log(data);
        if (data.Success) {
            // musicFn();
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
            if (data.ReturnCode == '-001') {
                $tel.attr('placeholder', '请输入您的电话');
                $name.attr('placeholder', '请输入您的名字');
            } else {
                $tel.val(data.Data.Mobile);
                $name.val(data.Data.RealName);
            }
        }
    });
});
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
