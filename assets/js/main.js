jQuery(document).ready(function($){
    //contact form in our-services
    $('.contact_form .input_name input, .contact_form .input_email input').on('focus', function (){

        $('.hidden_form_fields').css('display','block');

    });

    /** Hide this animation, and try default style of button */
    // $(".contact_form_submit").mouseenter(function() {
    //     $(".contact_form_submit input[type=\"submit\"]").css("animation","button_animation .5s ease-in forwards");
    // }).mouseleave(function() {
    //     $(".contact_form_submit input[type=\"submit\"]").css("animation","button_animation_mouse_leave .5s ease-in forwards");
    // });


    //show message
    $('#wpcf7-f2424-o1').on('wpcf7submit', function (event) {

        if ('mail_sent' === event.detail.status) {
            $(this).find('.success-message').css("display","block")
            $('.form_title, .fields').css('display','none');
        }
    });

    ///header
    var e = 0;
    $(window).on("scroll", function() {
        var o = $(this).scrollTop();
        if (o > e) {
            $("#header").removeClass("sticky");
        } else {
            $("#header").addClass("sticky");
        }
        e = o;

        if ($(this).scrollTop() >= 70) {
            $("#header").addClass("totop");
        } else {
            $("#header").removeClass("totop");
        }
    });

    if( $('body.single-careers').length != 0 )
    {

        $(window).resize(function () {
            menu_letter();
        });

        menu_letter();

        function menu_letter()
        {
            if ($(window).width() >= 1279)
            {
                $white_pos = $('.position-right').offset().left;
                $('body #stylemenu').remove();
                $('body .position').append('<div id="stylemenu"></div>');

                $('#header .container-fluid .header-areas #menu-nav #primary-menu>li a').each(function (index) {
                    let black_p = $white_pos - $(this).offset().left;
                    let ind = index + 1;
                    $('body #stylemenu').append('<style> #header .container-fluid .header-areas #menu-nav #primary-menu>li:nth-child(' + ind + ') a:after { clip-path: polygon(calc(100% - (100% - ' + black_p + 'px)) 0%, calc(100% - (100% - ' + black_p + 'px)) 100%, 0% 100%, 0% 0%) } </style>');
                });
            }
        }

    }

    function parallaxScroll()
    {
        const scrolled = $(window).scrollTop();
        $('.left .image-caption').css('top', (0 - (scrolled * .10)) + 'px');
        $('.right .image-caption').css('top', (0 + (scrolled * .10) / 1.5) + 'px');
        // $('.right .image-caption').css('top', (0 + (scrolled * .25) / 2) + 'px');
    }

    function projectsItemsSizeChecker()
    {
        let desktop = window.matchMedia('(min-width: 1102px)');
        if(desktop.matches)
        {
            let projectsItems = $('.projects-list .item');
            projectsItems.each(function (idx){
                if($(this).hasClass('left') && idx === projectsItems.length-1){
                    $(this).css('padding', '0');
                }
            });
        }
    }

    $(window).on("load resize scroll",function(e){
        let desktop = window.matchMedia('(min-width: 1102px)');

        if(desktop.matches)
        {
            if ($(".item.right").length != 0 || $(".item.left").length != 0) {
                parallaxScroll();
                projectsItemsSizeChecker();
            }
        }
    });

    //Menu open and close functions

    $('.menu-toggle').on('click', () => {
        $(document.body).addClass('menu-open');
        $('#mobile-menu').addClass('opened');
    });

    $('#mobile-menu .menu-close, #primary-menu li').on('click', () => {
        $(document.body).removeClass('menu-open');
        $('#mobile-menu').removeClass('opened');
    });

    let prod_item = $(".products .item");

    if(false)
    {
        prod_item.hover(function () {
            $(".products .title").css('opacity', '0.5');
            prod_item.not(this).css('opacity', '0.5');
        });

        prod_item.mouseleave(function () {
            $(".products .title").css('opacity', '1');
            prod_item.css('opacity', '1');
        });
    }
    // Menu Contact text decoration
    $('li.contactlink a').click(function (){
        if($("#contact_form").length == 0) {
            window.location.href = '/#contact_form'
        }
        //if($("#contact_form").length)
        //$(this).toggleClass("contact-current-menu-item");
    });
    // if($(window).width() < 998){
    //     $(".contact-section").attr("id",'contact');
    // } else {
    //     $(".contact-section").attr("id",'');
    // }
    // let current_contact = window.location.href.split("/");
    // if(current_contact[3] === "#contact"){
    //     $('li.contactlink a').toggleClass("contact-current-menu-item");
    // }

    // Contact form
    $(".contact-form .field input,.contact-form .field textarea").focusin(function() {
        $(this).parent().siblings(".label-text").addClass("label-top");
        if($(this).val() != ""){
            $(this).parent().siblings(".label-text").addClass("label-top");
        }
    });
    $(".contact-form .field input,.contact-form .field textarea").focusout(function() {
        if($(this).val() == ""){
            $(this).parent().siblings(".label-text").removeClass("label-top");
        }
    });
    $(".contact-form .button-paper").click(function (){
        let invalid_value = $('.contact-form .field input').attr("aria-invalid");
        if(invalid_value == "true"){
            $(".contact-form .label-text").css("bottom", "23px");
        }
    })
    $('.contact-form .field textarea').on('input', function () {
        if($(window).width() > 998){
            this.style.height = "50px";
        } else {
            this.style.height = "35px";
        }
        this.style.height =
            (this.scrollHeight) + 'px'; 
    });


    // //recaptcha error message
    // $('.contact_form_submit input').on('click', function (e) {
    // console.log($(this).parent('form').find('.recaptcha .wpcf7-not-valid-tip').length);
    //
    //     $(this).parent('form').find('.recaptcha .wpcf7-not-valid-tip').addClass('recaptcha-error');
    //         $('.recaptcha-error').first().css('color','green');
    //     // if($('.recaptcha .wpcf7-not-valid-tip').length){
    //     //     console.log($('.recaptcha .wpcf7-not-valid-tip').length)
    //     //
    //     // }
    // });
    $(".recaptcha").append('<span class="recaptcha-error">Please verify that you are not a robot.</span>');


    /** Scroll down to section with ID */
    $('a[href="#contact_form"]').on('click', function(e) {
        e.preventDefault();
     
        var targetOffset = $($(this).attr('href')).offset().top - 50; 
     
        $('html, body').animate(
           {
              scrollTop: targetOffset
           },
           500,
           'linear'
        );
     });
});

