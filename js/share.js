

/*阻止用户双击使屏幕上滑*/
var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
var iLastTouch = null;                                //缓存上一次tap的时间
if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
    document.body.addEventListener('touchend', function (event) {
        var iNow = new Date()
            .getTime();
        iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */;
        var delta = iNow - iLastTouch;
        if (delta < 500 && delta > 0) {
            event.preventDefault();
            return false;
        }
        iLastTouch = iNow;
    }, false);
}
//引入微信文件
document.write("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");
//记录分享信息
var sObjAudio = document.getElementById('audio');

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
var pengyouquanTitle = "抢位置：七夕情话上震旦，让全中国看见";
var wxtitle = "抢位置：七夕情话上震旦，让全中国看见";
var wxdesc = "想不想赏酷车，得电影票，并去美国飙车？";

var wxlink = "http://chevrolet.6vi.com/7-7/Index.aspx";
var wximgUrl = "http://chevrolet.6vi.com/7-7/share/share.jpg";

window.addEventListener('load', onloadFun, false);
function onloadFun() {
    $.ajax({
        async: false,
        url: 'http://wx.fractalist.com.cn/zhhd/GetWXJsApiByAjax.aspx?urlStr=' + encodeURIComponent(window.location.href),
        type: "GET",
        dataType: 'json',
        timeout: 5000,
        beforeSend: function () {
        },
        success: function (json) {
            wx.config({
                debug: false,
                appId: json["appId"],
                timestamp: json["timestamp"],
                nonceStr: json["nonceStr"],
                signature: json["signature"],
                jsApiList: [
                       'checkJsApi',
                       'onMenuShareTimeline',
                       'onMenuShareAppMessage'
                ]
            });

            wx.ready(function () {
                sObjAudio.play();
                wx.onMenuShareAppMessage({
                    title: wxtitle,
                    desc: wxdesc,
                    link: wxlink,
                    imgUrl: wximgUrl,
                    trigger: function (res) {

                    },
                    success: function (res) {
                        // alert("分享成功"); 分享给好友
                        // window.location.href = 'info.html';
                    },
                    cancel: function (res) {
                        // alert("cancel");
                    },
                    fail: function (res) {
                    }
                });
                wx.onMenuShareTimeline({
                    title: pengyouquanTitle,
                    link: wxlink,
                    desc: wxdesc,
                    imgUrl: wximgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                        // alert("分享成功"); 分享给好友
                        // window.location.href = 'info.html';
                    },
                    cancel: function (res) {
                        // alert("cancel");
                    },
                    fail: function (res) {
                        // alert("fail");
                    }
                });
            });
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (xhr, textStatus) {
            // alert(textStatus);
            //console.info(xhr);
        }
    });
}
