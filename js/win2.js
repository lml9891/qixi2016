$(function () {
 
    //根据QueryString参数名称获取值
    function getQueryStringByName(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }
    var MovieTiect = getQueryStringByName("MovieTiect");
    $(".winCode").html(MovieTiect);
    //返回
    $("#winBack").click(function () {
        location.href = "infoFull.html";
    });
});
 
