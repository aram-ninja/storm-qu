jQuery(document).ready(function ($) {

    let wp_is_mobile = 0;

    if(window['cursorprops'] && window['cursorprops'].is_mobile){
        wp_is_mobile = parseInt(window['cursorprops'].is_mobile);
    }

    if(wp_is_mobile){
        return;
    }

    let cursor = $('.point-cursor');
    let forlinks = $('body a,.cursor #hero a, body .floating-menu>div a, #header a, input[type="checkbox"], input[type="submit"], button');
    let mouseX = 0;
    let mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY,
                }
            })
        }
    });

    $(window).mousemove(function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    })


    if( $('body').hasClass('havesession') ) {
         $('#hero .desktop-parth .light-mood, #hero .desktop-parth .dark-mood,  #hero .desktop-parth .to-bottom-scroll').mousemove(function () {
             cursor.removeClass('link-hover');
             cursor.removeClass('default');
             cursor.addClass('draw');
         });

         $('section.projects').mouseout(function () {
             cursor.removeClass('draw');
             cursor.addClass('default');
         });
    }

    jQuery(window).on('load', function() {
        setTimeout(function () {
            $('.cursor #hero .desktop-parth .light-mood, .cursor #hero .desktop-parth .dark-mood, .cursor #hero .desktop-parth .to-bottom-scroll').mousemove(function () {
                cursor.removeClass('link-hover');
                cursor.removeClass('default');
                cursor.addClass('draw');
            });

            $('.cursor section.projects').mouseout(function () {
                cursor.removeClass('draw');
                cursor.addClass('default');
            });

        }, 3500);
    })

    $('#hero .desktop-parth .to-bottom-scroll').mousemove(function () {
        cursor.removeClass('link-hover');
        cursor.removeClass('default');
        cursor.addClass('draw');
    });

    $(forlinks).each(function () {
        $(this).mousemove( () => {
            cursor.addClass('link-hover');
            cursor.removeClass('default');
            cursor.removeClass('draw');
        });

        $(this).mouseout( () => {
            cursor.addClass('default');
            cursor.removeClass('link-hover');
        });
    })

})