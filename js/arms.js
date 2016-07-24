$(function () {
  var $armsMask = $('#armsMask');
  var od = 'ontouchstart' in window ? 'tap':'click';
  
  $('#arms8').addClass('arms8in').on('webkitAnimationEnd', function () {
    $(this).off().removeClass('arms8in').addClass('arms8Loop');
    cClick = true;
  });

  $('.armsClick').each(function (i,k) {
    $(k).on(od, function () {
      if (!cClick) {
        return;
      }
      $armsMask.show().addClass('showAnim');
      $('#arms'+ (i+1) +'Alert').show();
      $('#arm'+ (i+1) +'Font').addClass('armsFontIn');
      $('#arm'+ (i+1) +'Img2').addClass('arm'+ (i+1) +'ImgAnim');

    });
    $('#arms'+ (i+1) +'Quit').on(od, function () {
      $armsMask.hide().removeClass('showAnim');
      $('#arms'+ (i+1) +'Alert').hide();
      $('#arm'+ (i+1) +'Font').removeClass('armsFontIn');
      $('#arm'+ (i+1) +'Img2').removeClass('arm'+ (i+1) +'ImgAnim');

    });
  });

});
