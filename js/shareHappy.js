
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

domain = 'http://' + window.location.host;

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
pengyouquanTitle = "抢位置：七夕情话上震旦，让全中国看见";
wxtitle = "抢位置：七夕情话上震旦，让全中国看见";

wxdesc = "把全新科鲁兹交给我";

var wxlink = "http://chevrolet.6vi.com/7-7/afterShare.aspx";
var wximgUrl = "http://chevrolet.6vi.com/7-7/share/share.jpg";
window.addEventListener('load', onloadFun, false);

//分享
//晒幸福
function share() {
    onloadFun();
}

//数据请求
function upload2(url, param, callback) {
    $.ajax({
        type: "post",
        url: url + "&t=" + Math.random(),
        data: param,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            //回调
            callback(data);
        },
        error: function (xhr, textStatus) {
            //console.log(xhr);
        }
    });
}

//获取用户的表白信息
function get_user_new_content2(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_user_new_content";
    //请求后台
    upload2(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

function onloadFun() {
    //获取用户最新的留言信息
    get_user_new_content2(function (data) {
        //请求成功
        //配置分享文案
        wxdesc = data.Message;
        //分享出去的表白的id
        wxlink = wxlink + "?ID="+data.Remark;
        $.ajax({
            async: false,
            url: 'http://wx.fractalist.com.cn/zhhd/GetWXJsApiByAjax.aspx?urlStr=' + encodeURIComponent(location.href.split('#')[0]),
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
                    wx.onMenuShareAppMessage({
                        title: wxtitle,
                        desc: wxdesc,
                        link: wxlink,
                        imgUrl: wximgUrl,
                        trigger: function (res) {

                        },
                        success: function (res) {
                            window.location.href = 'info.html';
                        },
                        cancel: function (res) {
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
                            window.location.href = 'info.html';
                        },
                        cancel: function (res) {
                        },
                        fail: function (res) {
                        }
                    });
                });
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function (xhr, textStatus) {
                console.info(xhr);
            }
        });
    },true);

}
