$(function() {

    /*导航*/
    $('.nav li').hover(function() {

        $(this).find('p a').animate({ "margin-top": "-32px" }, 350)

    }, function() {

        $(this).find('p a').animate({ "margin-top": "0" }, 350)

    })

    /*公共案例hover效果*/
    $('.wedo_list li').hover(function() {

        $(this).find('.wedo_show').animate({ "bottom": "0" }, 350)
        $(this).find('.wedo_img img').animate({ "opacity": "1" }, 150)

    }, function() {

        $(this).find('.wedo_show').animate({ "bottom": "-60" }, 350)
        $(this).find('.wedo_img img').animate({ "opacity": "0.6" }, 150)

    })


    $('.float_qq2').hover(function() {

        $(this).animate({ "left": "-70px" }, 350)

    }, function() {

        $(this).animate({ "left": "0" }, 350)

    })

    $('.float_qq3').hover(function() {

        $(this).animate({ "left": "-116px" }, 350)

    }, function() {

        $(this).animate({ "left": "0" }, 350)

    })

    $('.float_qq4').hover(function() {

        $(this).find('.float_shwx').show();

    }, function() {

        $(this).find('.float_shwx').hide();

    })

    $('.foot_dshare3').hover(function() {

        $('.foot_shWx').show();

    }, function() {

        $('.foot_shWx').hide();

    })

    $('.foot_dshare2').hover(function() {

        $('.foot_shTelWx').show();

    }, function() {

        $('.foot_shTelWx').hide();

    })

})
