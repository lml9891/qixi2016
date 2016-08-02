

var domain = 'http://' + window.location.host;
//数据请求
function upload(url, param, callback) {
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
            $('#modal-img').hide();
        }
    });
}

//获取用户最新的一条表白，显示在大楼上
function get_user_new_content(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_user_new_content";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}


//获取最新n条表白信息
function get_contents(page,callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        Page:page
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_contents";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}


//点赞数量加1
function add_like_count(ContentID, callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        ID: ContentID
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=add_like_count";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//提交表白内容
function add_love_content(Content,LoveFrom,LoveTo, callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        Content: Content,
        LoveFrom: LoveFrom,
        LoveTo:LoveTo
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=add_love_content";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//提交用户信息，并抽取电影票
function submit_userinfo_get_movieticket(realname, mobile, callback) {
    if (realname == "") {
        $("#infoError").html("姓名不能为空！");
        return false;
    };
    if (mobile == "" || mobile.length != 11) {
        $("#infoError").html("手机格式不正确！");
        return false;
    };
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        RealName: realname,
        Mobile: mobile
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=submit_userinfo_get_movieticket";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}


//获取抽奖失败用户的中奖信息（用户姓名/手机号码）
function get_userinfo(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_userinfo";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//获取经销商省份
function get_dealers_province(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_dealers_province";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}
//获取经销商城市列表
function get_dealers_city(province,callback) {
    //
    var params = $.param({
        Province:province
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_dealers_city";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//获取经销商列表
function get_dealers_dealers(city,callback) {
    //
    var params = $.param({
        City:city
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_dealers_dealers";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//预约赏车
function add_activity_customer_info(realname, mobile, provincename, cityname, carseries, dealer, salesconsultant, ExpectDate,remark, callback) {

    //RealName = "刘涛",
    //Mobile = "13716170047",
    //CityName = "北京",
    //ProvinceName = "北京",
    //CarSeries = "全新科鲁兹",
    //Dealer = "天津市泓德汽车贸易有限公司",
    //ExpectDate = "2",
    //SalesConsultant = "李飞",
    //Remarks = "备注感言"

    if (realname == "") {
        $("#infoError").html("姓名不能为空！");
        return false;
    };
    if (mobile == "" || mobile.length != 11) {
        $("#infoError").html("手机格式不正确！");
        return false;
    };

    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        ExpectDate: ExpectDate,
        RealName: realname,
        Mobile: mobile,
        ProvinceName: provincename,
        CityName: cityname,
        CarSeries: '全新科鲁兹',
        Dealer: dealer,
        SalesConsultant: salesconsultant,
        Remarks: remark
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=add_activity_customer_info";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}
//////////////////////--------------------------------------------////////////////////////////
//抽取电影票
$("#infoSub").click(function () {
    var realname = $("#realname").val();
    var mobile = $("#mobile").val();
    //抽取电影票
    submit_userinfo_get_movieticket(realname, mobile, function (data) {
        if (data.Success) {
            switch (data.ReturnCode) {
                case "000":
                    //---中奖
                    //电影票中奖码
                    var Movie = data.Message;

                    break;
                case "001":
                    //---已经中过奖

                    break;
                case "-001":
                    //---未中奖
                    break;
            }
        } else {
            //console.log(false);
        }
    });
});
