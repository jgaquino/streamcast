$(document).ready(function() {


    $('#nav-menu-mobile').on('click', function() {
        $('.content-nav-mobile').fadeToggle(150);
    });

    $(window).resize(function() {
        if ($(window).width() > 600) {
            $('.content-nav-mobile').fadeOut(0);
        }
    });

    $('.close').on('click', function(){
        $('.content-nav-mobile').fadeOut(150);
    });


    //BLOCK EFFECT PLUGIN
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    $.each($('.animate'), function(index, value) {

        //NOT VISITBLE ELEMENT
        $(value).css('opacity', 0);

        var delayClass = $(value)[0].classList[$(value)[0].classList.length - 2];
        var effect = $(value)[0].classList[$(value)[0].classList.length - 1];
        effect = effect.substring(8, effect.length);
        var number = parseInt(delayClass.charAt(delayClass.length - 1));

        var classes = {
            'delay': number * 200,
            'effect': effect
        }

        var elementPosition = $(value).offset().top - $(window).height();

        function animateNow() {
            var positionScroll = $(document).scrollTop();

            if (elementPosition < positionScroll) {

                setTimeout(function() {
                    $(value).css('opacity', 1).animateCss(classes.effect);
                }, classes.delay);

                elementPosition = 'null';
            }
        }
        animateNow();

        $(window).scroll(function() {
            animateNow();
        });

    });

    function blockHero(e) {
        if (e.currentTarget.id == 'custom-scroll') {
            return true;
        }else {
            return false;
        }
    }
    //ANIMATION LINK HASH
    $('.scroll').on('click', function(e) {
        e.preventDefault();

        var offset = 0;
        var target = this.hash;

        if ($(this).data('offset') != undefined) offset = $(this).data('offset');

        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - offset + (blockHero(e) ? $('#home-img-hero').height():0)
        }, 700, 'swing', function() {

            var input = $(target).find('form > input');

            if (input.length > 0) {
                input[0].focus();
                $('.content-nav-mobile').fadeOut(150);
            }
            // window.location.hash = target;
        });

    });

});