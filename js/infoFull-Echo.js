
//设置省份数据    
//获取经销商省份列表
//get_dealers_province(function(data) {
//    //请求成功
//    var province = $("#province");
//    if (data.ReturnCode=="000") {
//        //遍历省份
//        var list = data.Data;
//        $.each(list, function (i,v) {
//            option = "<option value='" + v + "'>" + v + "</option>";
//            //添加到 select 元素中    
//            province.append(option);
//        });
//    }
//    //调用change事件，初始城市信息    
//    provinceChange();
//});

//省份选中事件    
function provinceChange() {
    console.log("province-change");
    var pro = $("#province");
    setCity(pro.val());
}

//省份选中事件    
function cityChange() {
    console.log("City--change");
    var pro = $("#city");
    setDealer(pro.val());
}
//根据选中的省份获取对应的城市    
function setCity(province) {
    var city = $("#city");
    //先清空之前绑定的值    
    city.empty();
    //
    city.append("<option value='0'>请选择(市)</option>");
    get_dealers_city(province, function (data) {
        console.log(data);
        if (data.Success) {
            var list = data.Data;
            //遍历城市
            $.each(list, function (i, v) {
                option = "<option value='" + v + "'>" + v + "</option>";
                //添加到 select 元素中    
                city.append(option);
            });
        }
    });
    //调用change事件，初始城市信息    
    cityChange();
}

//根据选中的城市设置经销商    
function setDealer(city) {
    var dealer = $("#dealer");
    //先清空之前绑定的值    
    dealer.empty();
    //
    dealer.append("<option value='0'>请选择(经销商)</option>");
    get_dealers_dealers(city, function (data) {
        console.log(data);
        if (data.Success) {
            var list = data.Data;
            //遍历城市
            $.each(list, function (i, v) {
                console.log(v);

                option = "<option value='" + v.DealerFullName + "'>" + v.Dealer + "</option>";
                //添加到 select 元素中    
                dealer.append(option);
            });
        }

    });

}