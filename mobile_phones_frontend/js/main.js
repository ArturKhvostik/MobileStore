$(function(){
    $('.menu__btn').on('click', function () {
        $('.menu__list').toggleClass('menu__list--active');
    });
});

$(function() {
    
    $('.photo__slider').slick({
        arrows: false,
        dots: true,
    });

});
/////

// $(function() {

//     $('[name=add]').on('click', function () {
//         console.log('dada');

//     });
// });