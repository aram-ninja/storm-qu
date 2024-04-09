jQuery(document).ready(function($){
// console.log('start -')


// const themeToggle = document.querySelector(
//     '.light-dark-mood-desk input'
// );

// const themeTogglemob = document.querySelector(
//     '.light-dark-mood-mob input'
// );

// const currentTheme = localStorage.getItem("theme");

// if (currentTheme) {
//     if (currentTheme === "dark") {
//         $('html').css({"background":"#000"})
//         $('body').addClass('dark');
//         $('.dark-mood').show();
//         $('.light-mood').css({"display":"none"});
//         $('.light-dark-mood-mob input').prop('checked', true);
//         $('.light-dark-mood-desk input').prop('checked', true);
//     }else{
//         $('body').removeClass('dark');
//         $('.light-dark-mood-mob input').prop('checked', false);
//         $('.light-dark-mood-desk input').prop('checked', false);
//     }
// }


// function setCookie(name, value) {
//     document.cookie = name + "=" + value;
// }

// function switchTheme(e) {
//     var element = $('body');
//     if (e.target.checked) {
//         localStorage.setItem("theme", "dark");
//         setCookie("theme", "dark");
//         element.addClass('dark');
//         $('.light-mood').hide();
//         $('.dark-mood').show();
//     } else {
//         localStorage.setItem("theme", "light");
//         setCookie("theme", "light");
//         element.removeClass('dark');
//         $('.light-mood').show();
//         $('.dark-mood').hide();
//     }
// }


// themeToggle.addEventListener("change", switchTheme, false);
// themeTogglemob.addEventListener("change", switchTheme, false);

// $(document).on('click', '.light-dark-mood-desk input', function () {

//     if ($('.light-dark-mood-desk input:checked').length > 0) {
//         $('.light-dark-mood-mob input').prop('checked', true);
//     } else {
//         $('.light-dark-mood-mob input').prop('checked', false);
//     }
// })

// $(document).on('click', '.light-dark-mood-mob input', function () {
//     if ($('.light-dark-mood-mob input:checked').length > 0) {
//         $('.light-mood').hide();
//         $('.dark-mood').show();
//         $('.light-dark-mood-desk input').prop('checked', true);
//         $('body').addClass('dark');
//     } else {
//         $('.light-mood').show();
//         $('.dark-mood').hide();
//         $('.light-dark-mood-desk input').prop('checked', false);
//         $('body').removeClass('dark');
//     }
// })
// console.log('end dark mood')
});
