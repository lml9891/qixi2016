$(function () {
  get_userinfo(function (data) {
    var $name = $('#name');
    var $tel = $('#tel');
    var $time = $('#time');
    var $sales = $('#sales');
    var $dealer = $('#dealer');
    var $infoSub = $('#infoSub');
    var $infoError = $('#infoError');
    var od = 'ontouchstart' in window ? 'tap':'click';

    if (data.Success) {
      $name.val(data.Data.RealName);
      $tel.val(data.Data.Mobile);
      $infoSub.on(od, function () {
        var sTimeVal = $time.val();
        var sSalesVal = $sales.val();
        var sDealerVal = $dealer.val();
        var sNameVal = $name.val();
        var sTelVal = $tel.val();

        if (sDealerVal === '0') {
          $infoError.html('请选经销商');
          return;
        }
        if (sSalesVal === '0') {
          $infoError.html('请选择销售顾问');
          return;
        }
        if (sTimeVal === '0') {
          $infoError.html('请选择意向购车时间');
          return;
        }

        add_activity_customer_info(sNameVal,sTelVal,data.Data.ProvinceName,data.Data.CityName,data.Data.CarSeries,sDealerVal,sSalesVal,sTimeVal, function (data) {
          if (data.Success) {
            window.location.href = 'orderSuc.html';
          }
        });

      });
    }
  });
});
