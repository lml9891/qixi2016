
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

function AddPageView(App, URL, OpenID, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        URL: document.URL,
        UrlReferrer: document.referrer,
        Src: getQueryStringByName("src"),
        Remark: Remark
    });

    var host = window.location.host;
    console.log(host);

    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
        }
    });
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null
}
//生成guid
function CreateGUID() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//记录日志的URL
_LogURL = "http://wx2.fractalist.com.cn/hengtian/SystemCommon/Log"
_PVURL = "http://wx2.fractalist.com.cn/hengtian/SystemCommon/PageView";
_GUID = getCookie("_GUID");
console.log("_GUID:" + _GUID);
if (_GUID == "" || _GUID == null) {
    //生成一个guid
    _GUID = CreateGUID();
    //保存到cookie中
    setCookie("_GUID", _GUID);
}

_App = "雪佛兰";
//没有openid 的时可以使用guid 作为用户id 统计uv
_OpenID = _GUID;
_Mobile = "",
_Type = "";
_SubType = "";
_Method = "";
_Parameter = document.URL;
_Content = "";
_Remark = "";
//记录pv_uv
AddPageView(_App, _PVURL, _OpenID, _Remark);

pengyouquanTitle = "抢位置：七夕情话上震旦，让全中国看见";
wxtitle = "抢位置：七夕情话上震旦，让全中国看见";

wxdesc = "把你交给我";

var wxlink = "http://chevrolet.6vi.com/7-7/afterShare.aspx";
var wximgUrl = "http://chevrolet.6vi.com/7-7/share/share.jpg";
window.addEventListener('load', onloadFun, false);

function _Log(URL, App, OpenID, Mobile, Type, SubType, Method, Parameter, Content, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        Mobile: Mobile,
        Type: Type,
        SubType: SubType,
        Method: Method,
        Parameter: Parameter,
        Content: Content,
        Remark: Remark
    });
    //url: "http://" + host + "/SystemCommon/Log",
    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
        }
    });
}
//分享后记录数据
function RecordShare(type, remark) {
    _Type = type;
    _Remark = remark;
    _Log(_LogURL, _App, _OpenID, _Mobile, _Type, _SubType, _Method, _Parameter, _Content, _Remark);
}

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
                            RecordShare("好友", JSON.stringify(res));
                           
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
                            RecordShare("朋友圈", JSON.stringify(res));
                            
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
