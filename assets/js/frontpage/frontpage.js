if (jQuery('#preloader').length != 0 ) {
    // window.addEventListener('load', function() {
    jQuery(window).on('load', function() {
        jQuery('#preloader').addClass('loaded');
        jQuery('body').addClass('loaded');

        setTimeout(function (){
            jQuery('body').addClass('cursor');
            var isHero = jQuery('.home .site-header.unvisible');
            if(isHero) {
                isHero.removeClass('unvisible') ;
            }
        },3500);
    });
}

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

jQuery(document).ready(function ($) {
// if($('.home header').position() ){
//
// }
    if ( window.location.pathname === '/' ){
        if ($('.home header').position().top < 200) {
            $('.home header').addClass('custompoint');
        } else {
            $('.home header').removeClass('custompoint');
        }
        if( $(window).width() >= 1102 ) {
            /*$('.home .bottom-details a').on('click', function (e) {
                e.preventDefault();
                fullpage_api.moveTo(2);
            });*/
        }
        else {
            $('.bottom-details').click(function (e) {
                var proj_top = $('section.projects').offset().top;
                $('html, body').animate({
                    scrollTop:  proj_top
                }, 'slow');
            });
        }
        //
        // $('.home #menu-nav .menu-item-type-custom a, .home .ellipsis-shape a').on('click', function(e){
        //     e.preventDefault();
        //     fullpage_api.moveTo(4);
        // });

    }



    /* Swiper
   **************************************************************/
    var projectSwiper= Swiper;
    var init = false;

    /* Which media query
    **************************************************************/
    function swiperMode() {
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 1101px)');
        let desktop = window.matchMedia('(min-width: 1102px)');
        let tablet = window.matchMedia('(min-width: 1550px)');

        // Enable (for mobile)
        if(desktop.matches) {
            if (!init) {
                init = true;
                projectSwiper = new Swiper('.project-slider', {
                    slidesPerView: 2,
                    spaceBetween: 32,
                    // loopFillGroupBlank: false,
                    // slidesOffsetAfter:0,
                    //freeMode: true,
                    //mousewheel: true,
                    parallax: true,
                    breakpoints: {
                        1920: {
                            slidesPerView: 2,
                            spaceBetween: 32,
                        },
                        1366: {
                            slidesPerView: 2,
                            spaceBetween: 32
                        },
                        // 1024: {
                        //     slidesPerView: 1,
                        //     spaceBetween: 32
                        // },
                    },
                    keyboard: {
                        enabled: false,
                        onlyInViewport: true,
                    },
                });

                projectSwiper.on('slideChange', function () {
                    var activeslide = projectSwiper.realIndex;
                    if( activeslide == 3 ) {
                        projectSwiper.params.slidesPerView = 'auto';
                        projectSwiper.params.centeredSlides = true;
                        projectSwiper.update();
                    } else if( activeslide <= 2 ){
                        projectSwiper.params.slidesPerView = 2;
                        projectSwiper.params.centeredSlides = false;
                        projectSwiper.update();
                    }
                    var totalslide = projectSwiper.slides.length - 1;
                    let trans_index = 0;
                    if(tablet.matches) {
                        trans_index = ($(window).width() / 2 / totalslide) / 15; // naxordy '/ 5' er
                    } else {
                        trans_index = ($(window).width() / 2 / totalslide) / 30;
                    }
                    let spanlen = $('.button-paper-progres span').length;
                    $('.button-paper-progres span').each(function (index) {
                        // var transition = -Math.round((activeslide * totalslide) + 1) + ( index * totalslide );
                        var transition = -(activeslide * index) * trans_index;
                        $('.button-paper-progres span').eq(spanlen - index-1).css('transform', `translateX(${transition}px)`);
                    })
                });

                $('.project-slider .swiper-slide .image-caption').on( "mouseenter", function() {
                    $(this).parent().prev().children('.image-caption').addClass('prevelem');
                    $(this).parent().next().children('.image-caption').addClass('nextelem');
                });
                $('.project-slider .swiper-slide .image-caption').on('mouseleave', function() {
                    $(this).parent().prev().children('.image-caption').removeClass('prevelem');
                    $(this).parent().next().children('.image-caption').removeClass('nextelem');
                });
            }

        }

        // Disable (for desktop)
        else if(mobile.matches) {
            projectSwiper = new Swiper('.project-slider', {
                slidesPerView: 2,
                spaceBetween: 0,
                init: false,
            });
            init = false;
        }
    }

    /* On Load
    **************************************************************/
    swiperMode();
    window.onload = function() {
    };

    /* On Resize
    **************************************************************/
    window.onresize = function() {
        swiperMode();
    };
    console.log('asd')

    if ( window.location.pathname === '/' ){
    var canvaslight = $("#demoLight")[0],
        ctxl = canvaslight?.getContext("2d"),
        canvasdark = $("#demoDark")[0],
        ctxd = canvasdark?.getContext("2d"),
        imglight = new Image(),
        // radius = 58,
        radius = 72,
        //lightImageSrc = "/wp-content/themes/brainstormtech/images/hero/hero-light-1.jpg",
        lightImageSrc = "/wp-content/themes/brainstormtech/images/grid_pluses_bg.jpg",
        imgdark = new Image(),
        //darkImageSrc = "/wp-content/themes/brainstormtech/images/hero/hero-dark-1.jpg";
        darkImageSrc = "/wp-content/themes/brainstormtech/images/grid_pluses_bg_dark.jpg";
        resizeCanvasToDisplaySize(ctxd.canvas);
        imgdark.src = darkImageSrc;

        resizeCanvasToDisplaySize(ctxl.canvas);
        imglight.src = lightImageSrc;


        var coordsContact = {
            x: [],
            y: []
        }
        var coordsCareers = {
            x: [],
            y: []
        }
        var coordsProducts = {
            x: [],
            y: []
        }
        var coordsProjs = {
            x: [],
            y: []
        }

        // ------------- Contact ------------- //
        var minScreenContactX = $(".ellipsis-shape").position().left,
            maxScreenContactX = $(".ellipsis-shape").position().left + $(".ellipsis-shape").width(),
            minScreenContactY = $(".ellipsis-shape").position().top,
            maxScreenContactY = $(".ellipsis-shape").position().top + $(".ellipsis-shape").height()

        // ------------- Careers ------------- //
        var minScreenCareersX = $(".radius-shape").position().left,
            maxScreenCareersX = $(".radius-shape").position().left + $(".radius-shape").width(),
            minScreenCareersY = $(".radius-shape").position().top,
            maxScreenCareersY = $(".radius-shape").position().top + $(".radius-shape").height()
        // ------------- Products ------------- //
        var minScreenProductsX = $(".square-shape").position().left,
            maxScreenProductsX = $(".square-shape").position().left + $(".square-shape").width(),
            minScreenProductsY = $(".square-shape").position().top,
            maxScreenProductsY = $(".square-shape").position().top + $(".square-shape").height()
        // ------------- Projs ------------- //
        var minScreenProjsX = $(".rectangle-shape").position().left,
            maxScreenProjsX = $(".rectangle-shape").position().left + $(".rectangle-shape").width(),
            minScreenProjsY = $(".rectangle-shape").position().top,
            maxScreenProjsY = $(".rectangle-shape").position().top + $(".rectangle-shape").height();

        let wp_is_mobile = 0;
        let canvasBindEvents = ['mousedown', 'mousemove', 'mouseup'];

        if(window['frontprops'] && window['frontprops'].is_mobile){
            wp_is_mobile = parseInt(window['frontprops'].is_mobile);
        }

        if(wp_is_mobile){
            canvasBindEvents = ['touchstart', 'touchmove', 'touchend'];
        }

        function loadCanvasLight()
        {
            $(imglight).on("load", function() {
                if(wp_is_mobile){
                    return ;
                }

                let lightSelector = $("#header, #demoLight, .bottom-details, .to-bottom-scroll");

                lightSelector.bind(canvasBindEvents[0], function(e) {
                    erase(getXYLi(e),ctxl);
                    erase(getXYDa(e),ctxd);

                    if(wp_is_mobile){
                        document.body.style.overflow = 'hidden';
                    }

                    lightSelector.bind(canvasBindEvents[1], function(e) {
                        erase(getXYLi(e),ctxl);
                        erase(getXYDa(e),ctxd);

                        if(wp_is_mobile){
                            document.body.style.overflow = 'hidden';
                        }

                        // ------------- Contact ------------- //
                        if( (getXYLi(e).x > minScreenContactX && getXYLi(e).x < maxScreenContactX) && (getXYLi(e).y > minScreenContactY && getXYLi(e).y < maxScreenContactY) ) {
                            if( !coordsContact.x.includes(getXYLi(e).x) ) {
                                coordsContact.x.push(getXYLi(e).x);
                            }
                            if( !coordsContact.y.includes(getXYLi(e).y) ) {
                                coordsContact.y.push(getXYLi(e).y);
                            }
                        }
                        // ------------- Careers ------------- //
                        if( (getXYLi(e).x >= minScreenCareersX && getXYLi(e).x <= maxScreenCareersX) && (getXYLi(e).y >= minScreenCareersY && getXYLi(e).y <= maxScreenCareersY) ) {
                            if( !coordsCareers.x.includes(getXYLi(e).x) ) {
                                coordsCareers.x.push(getXYLi(e).x);
                            }
                            if( !coordsCareers.y.includes(getXYLi(e).y) ) {
                                coordsCareers.y.push(getXYLi(e).y);
                            }
                        }
                        // ------------- Products ------------- //
                        if( (getXYLi(e).x >= minScreenProductsX && getXYLi(e).x <= maxScreenProductsX) && (getXYLi(e).y >= minScreenProductsY && getXYLi(e).y <= maxScreenProductsY) ) {
                            if( !coordsProducts.x.includes(getXYLi(e).x) ) {
                                coordsProducts.x.push(getXYLi(e).x);
                            }
                            if( !coordsProducts.y.includes(getXYLi(e).y) ) {
                                coordsProducts.y.push(getXYLi(e).y);
                            }
                        }
                        // ------------- Projs ------------- //
                        if( (getXYLi(e).x >= minScreenProjsX && getXYLi(e).x <= maxScreenProjsX) && (getXYLi(e).y >= minScreenProjsY && getXYLi(e).y <= maxScreenProjsY) ) {
                            if( !coordsProjs.x.includes(getXYLi(e).x) ) {
                                coordsProjs.x.push(getXYLi(e).x);
                            }
                            if( !coordsProjs.y.includes(getXYLi(e).y) ) {
                                coordsProjs.y.push(getXYLi(e).y);
                            }
                        }
                    });

                    lightSelector.bind(canvasBindEvents[2],function() {

                        // ------------- Contact ------------- //
                        if(coordsContact.x.length > 0) {
                            let minContactX = Math.min(...coordsContact.x),
                                maxContactX = Math.max(...coordsContact.x),
                                minContactY = Math.min(...coordsContact.y),
                                maxContactY = Math.max(...coordsContact.y)
                            if( (minContactX >= minScreenContactX && maxContactX <= maxScreenContactX) && (minContactY >= minScreenContactY && maxContactY <= maxScreenContactY) ) {
                                $(".ellipsis-shape").css({"z-index":"99", "opacity":"1"})
                            }
                        }
                        // ------------- Careers ------------- //
                        if(coordsCareers.x.length > 0) {
                            let minCareersX = Math.min(...coordsCareers.x),
                                maxCareersX = Math.max(...coordsCareers.x),
                                minCareersY = Math.min(...coordsCareers.y),
                                maxCareersY = Math.max(...coordsCareers.y)
                            if ((minCareersX >= minScreenCareersX && maxCareersX <= maxScreenCareersX) && (minCareersY >= minScreenCareersY && maxCareersY <= maxScreenCareersY)) {
                                $(".radius-shape").css({"z-index": "99", "opacity": "1"})
                            }
                        }
                        // ------------- Products ------------- //
                        if(coordsProducts.x.length > 0) {
                            let minProductsX = Math.min(...coordsProducts.x),
                                maxProductsX = Math.max(...coordsProducts.x),
                                minProductsY = Math.min(...coordsProducts.y),
                                maxProductsY = Math.max(...coordsProducts.y)
                            if ((minProductsX >= minScreenProductsX && maxProductsX <= maxScreenProductsX) && (minProductsY >= minScreenProductsY && maxProductsY <= maxScreenProductsY)) {
                                $(".square-shape").css({"z-index": "99", "opacity": "1"})
                            }
                        }
                        // ------------- Projs ------------- //
                        if(coordsProjs.x.length > 0) {
                            let minProjsX = Math.min(...coordsProjs.x),
                                maxProjsX = Math.max(...coordsProjs.x),
                                minProjsY = Math.min(...coordsProjs.y),
                                maxProjsY = Math.max(...coordsProjs.y)
                            if ((minProjsX >= minScreenProjsX && maxProjsX <= maxScreenProjsX) && (minProjsY >= minScreenProjsY && maxProjsY <= maxScreenProjsY)) {
                                $(".rectangle-shape").css({"z-index": "99", "opacity": "1"})
                            }
                        }
                        // ------------- END ------------- //

                        if(wp_is_mobile){
                            document.body.style.overflow = 'auto';
                        }

                        lightSelector.unbind(canvasBindEvents[1]);
                    });
                });
                const imgRatio = imglight.height / imglight.width;
                const h = window.innerWidth * imgRatio;
                // ctxl.drawImage(imglight, 0, (window.innerHeight - h) / 2, window.innerWidth, h);
                drawImageProp(ctxl, imglight, 0, 0, window.innerWidth, window.innerHeight);
                //ctxl.drawImage(imglight,0 ,0 , window.innerWidth, window.innerHeight + 100);
                ctxl.globalCompositeOperation = "destination-out";
            });
        }

        function loadCanvasDark()
        {
            $(imgdark).on("load", function() {
                if(wp_is_mobile){
                    return ;
                }

                let darkSelector = $("#header, #demoDark, .bottom-details, .to-bottom-scroll");

                darkSelector.bind(canvasBindEvents[0], function(e) {
                    erase(getXYDa(e),ctxd);
                    erase(getXYLi(e),ctxl);

                    if(wp_is_mobile){
                        document.body.style.overflow = 'hidden';
                    }

                    darkSelector.bind(canvasBindEvents[1], function(e) {
                        erase(getXYDa(e),ctxd);
                        erase(getXYLi(e),ctxl);

                        if(wp_is_mobile){
                            document.body.style.overflow = 'hidden';
                        }

                        // ------------- Contact ------------- //
                        if( (getXYLi(e).x >= minScreenContactX && getXYLi(e).x <= maxScreenContactX) && (getXYLi(e).y >= minScreenContactY && getXYLi(e).y <= maxScreenContactY) ) {
                            if( !coordsContact.x.includes(getXYLi(e).x) ) {
                                coordsContact.x.push(getXYLi(e).x);
                            }
                            if( !coordsContact.y.includes(getXYLi(e).y) ) {
                                coordsContact.y.push(getXYLi(e).y);
                            }
                        }
                        // ------------- Careers ------------- //
                        if( (getXYLi(e).x >= minScreenCareersX && getXYLi(e).x <= maxScreenCareersX) && (getXYLi(e).y >= minScreenCareersY && getXYLi(e).y <= maxScreenCareersY) ) {
                            if( !coordsCareers.x.includes(getXYLi(e).x) ) {
                                coordsCareers.x.push(getXYLi(e).x);
                            }
                            if( !coordsCareers.y.includes(getXYLi(e).y) ) {
                                coordsCareers.y.push(getXYLi(e).y);
                            }
                        }
                        // ------------- Products ------------- //
                        if( (getXYLi(e).x >= minScreenProductsX && getXYLi(e).x <= maxScreenProductsX) && (getXYLi(e).y >= minScreenProductsY && getXYLi(e).y <= maxScreenProductsY) ) {
                            if( !coordsProducts.x.includes(getXYLi(e).x) ) {
                                coordsProducts.x.push(getXYLi(e).x);
                            }
                            if( !coordsProducts.y.includes(getXYLi(e).y) ) {
                                coordsProducts.y.push(getXYLi(e).y);
                            }
                        }
                        // ------------- Projs ------------- //
                        if( (getXYLi(e).x >= minScreenProjsX && getXYLi(e).x <= maxScreenProjsX) && (getXYLi(e).y >= minScreenProjsY && getXYLi(e).y <= maxScreenProjsY) ) {
                            if( !coordsProjs.x.includes(getXYLi(e).x) ) {
                                coordsProjs.x.push(getXYLi(e).x);
                            }
                            if( !coordsProjs.y.includes(getXYLi(e).y) ) {
                                coordsProjs.y.push(getXYLi(e).y);
                            }
                        }
                    });

                    darkSelector.bind(canvasBindEvents[2], function() {

                        // ------------- Contact ------------- //
                        if(coordsContact.x.length > 0) {
                            let minContactX = Math.min(...coordsContact.x),
                                maxContactX = Math.max(...coordsContact.x),
                                minContactY = Math.min(...coordsContact.y),
                                maxContactY = Math.max(...coordsContact.y)
                            if( (minContactX >= minScreenContactX && maxContactX <= maxScreenContactX) && (minContactY >= minScreenContactY && maxContactY <= maxScreenContactY) ) {
                                $(".ellipsis-shape").css({"z-index":"99", "opacity":"1"})
                            }
                        }
                        // ------------- Careers ------------- //
                        if(coordsCareers.x.length > 0) {
                            let minCareersX = Math.min(...coordsCareers.x),
                                maxCareersX = Math.max(...coordsCareers.x),
                                minCareersY = Math.min(...coordsCareers.y),
                                maxCareersY = Math.max(...coordsCareers.y)
                            if ((minCareersX >= minScreenCareersX && maxCareersX <= maxScreenCareersX) && (minCareersY >= minScreenCareersY && maxCareersY <= maxScreenCareersY)) {
                                $(".radius-shape").css({"z-index": "99", "opacity": "1"})
                            }
                        }
                        // ------------- Products ------------- //
                        if(coordsProducts.x.length > 0) {
                            let minProductsX = Math.min(...coordsProducts.x),
                                maxProductsX = Math.max(...coordsProducts.x),
                                minProductsY = Math.min(...coordsProducts.y),
                                maxProductsY = Math.max(...coordsProducts.y)
                            if ((minProductsX >= minScreenProductsX && maxProductsX <= maxScreenProductsX) && (minProductsY >= minScreenProductsY && maxProductsY <= maxScreenProductsY)) {
                                $(".square-shape").css({"z-index": "99", "opacity": "1"})
                            }
                        }
                        // ------------- Projs ------------- //
                        if(coordsProjs.x.length > 0) {
                            let minProjsX = Math.min(...coordsProjs.x),
                                maxProjsX = Math.max(...coordsProjs.x),
                                minProjsY = Math.min(...coordsProjs.y),
                                maxProjsY = Math.max(...coordsProjs.y)
                            if ((minProjsX >= minScreenProjsX && maxProjsX <= maxScreenProjsX) && (minProjsY >= minScreenProjsY && maxProjsY <= maxScreenProjsY)) {
                                $(".rectangle-shape").css({"z-index": "99", "opacity": "1"})
                            }
                        }
                        // ------------- END ------------- //

                        if(wp_is_mobile){
                            document.body.style.overflow = 'auto';
                        }

                        darkSelector.unbind(canvasBindEvents[1]);
                    });
                });
                const imgRatiodark = imgdark.height / imgdark.width;
                const hdark = window.innerWidth * imgRatiodark;
                // ctxd.drawImage(imgdark, 0, (window.innerHeight - hdark) / 2, window.innerWidth, hdark);
                drawImageProp(ctxd, imgdark, 0, 0, window.innerWidth, window.innerHeight);
                //ctxd.drawImage(imgdark,0,0, window.innerWidth, window.innerHeight + 100);
                ctxd.globalCompositeOperation = "destination-out";
            });
        }

        function getXYLi(e) {
            var r = $("#demoLight")[0].getBoundingClientRect();
            if(wp_is_mobile){
                return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
            }
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        }

        function getXYDa(e) {
            var r = $("#demoDark")[0].getBoundingClientRect();
            if(wp_is_mobile){
                return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
            }
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        }

        function erase(pos, ctx) {
            //console.log('erase', {pos: pos, ctx: ctx});
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }

        function resizeCanvasToDisplaySize(canvas) {

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }

            return false;
        }

        $("canvas").outerHeight($(window).height()-$("canvas").offset().top- Math.abs($("canvas").outerHeight(true) - $("canvas").outerHeight()));

        loadCanvasLight();
        loadCanvasDark();

        $(window).on("resize", function(e){
            $("canvas").outerHeight($(window).height()-$("canvas").offset().top- Math.abs($("canvas").outerHeight(true) - $("canvas").outerHeight()));
            loadCanvasLight();
            loadCanvasDark();
        });


        let sectionScrollSpeed = 700;
        let fullPageLCK = '7F49F28F-B67741D4-A2A6FF0B-95F229FF';
        let homePage = $('#fullpage');
        let homePageGlobal = $("body.home")

        var height = 100,
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime/1000)%60)*100;

        if( $(window).width() >= 1102 ) {
            if (homePage.length) {
                new fullpage('#fullpage', {
                    licenseKey: fullPageLCK,
                    autoScrolling: true,
                    scrollingSpeed: sectionScrollSpeed,
                    fitToSection: false,
                    scrollBar: false,
                    scrollHorizontally: true,
                    lockAnchors: true,
                    loopHorizontal: false,
                    responsiveWidth: 1102,
                    parallaxOptions: {
                        type: 'reveal',
                        percentage: 62,
                        property: 'translate'
                    },
                    afterLoad: function (origin, destination, direction) {
                        
                        if (destination.index >= 1) {
                            $('.home header').removeClass('custompoint');
                        } 
                        else {
                            $('.home header').addClass('custompoint');
                        }

                        if (destination.index === 1) {
                            $(".project-slider .swiper-slide").addClass('aos-animate');
                            /*
                            fullpage_api.setAllowScrolling(false);
                            fullpage_api.setKeyboardScrolling(false);
                            
                            projectSwiper.on('slideChange', function () {
                                fullpage_api.setAllowScrolling(false);
                                fullpage_api.setKeyboardScrolling(false);

                                setTimeout(() => {
                                    if ($('.project-slider .swiper-slide').last().hasClass('swiper-slide-active')) {
                                        fullpage_api.setAllowScrolling(true, 'down');
                                        fullpage_api.setKeyboardScrolling(true, 'down');
                                    }
                                    if ($('.project-slider .swiper-slide').first().hasClass('swiper-slide-active')) {
                                        fullpage_api.setAllowScrolling(true, 'up');
                                        fullpage_api.setKeyboardScrolling(true, 'up');
                                    }
                                }, 500)

                            })

                            if ($('.project-slider .swiper-slide').last().hasClass('swiper-slide-active')) {
                                fullpage_api.setAllowScrolling(true, 'down');
                                fullpage_api.setKeyboardScrolling(true, 'down');
                            }

                            if ($('.project-slider .swiper-slide').first().hasClass('swiper-slide-active')) {
                                fullpage_api.setAllowScrolling(true, 'up');
                                fullpage_api.setKeyboardScrolling(true, 'up');
                            }
                            */
                        } 

                    },
                    onLeave: function(origin, destination, direction, trigger){
                        /*
                        if ( direction == "down" ) {
                            if (destination.index != 0 || destination.index != 1) {
                                fullpage_api.setAutoScrolling(false);
                                fullpage_api.setKeyboardScrolling(false);
                                fullpage_api.setAllowScrolling(false, 'up');
                            } else {
                                fullpage_api.setAutoScrolling(true);
                                fullpage_api.setKeyboardScrolling(true);
                            }
                        } 
                        if ( direction == "up" ) {
                            console.log("up")
                        }
                        */
                    }
                });

                if( !$('body').hasClass('havesession') ) {
                    fullpage_api.setAllowScrolling(false);
                    fullpage_api.setKeyboardScrolling(false);
                    setTimeout(function () {
                        fullpage_api.setAllowScrolling(true);
                        fullpage_api.setKeyboardScrolling(true);
                    }, time + 2500);
                }
                
                $('.home .bottom-details a').on('click', function (e) {
                    e.preventDefault();
                    fullpage_api.moveTo(2);
                });
            }
            if(homePageGlobal.length) {
                let heroSectionHeight = $('section#hero').height()
                console.log(heroSectionHeight)
                $(window).scroll(function(event) {
                    if( jQuery(document).scrollTop() > heroSectionHeight ) {
                        $(".point-cursor").removeClass('draw').addClass('default')
                    } else {
                        $(".point-cursor").removeClass('default').addClass('draw')
                    }
                })
            }
        }
    }
});
