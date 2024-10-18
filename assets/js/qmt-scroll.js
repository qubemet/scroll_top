(function($) {
    'use strict';

    $(document).ready(function() {
        const scrollButton = $(".qmt-scroll-wrap");
        const offset = parseInt(scrollButton.attr('data-scroll-offset'), 10) || 0;
        const animationType = scrollButton.attr('data-animation');

        // Define a set of animation functions
        const animations = {
            fade: {
                show: () => scrollButton.fadeIn(),
                hide: () => scrollButton.fadeOut()
            },
            slide_up: {
                show: () => scrollButton.slideDown(),
                hide: () => scrollButton.slideUp()
            },
            slide_left: {
                show: () => {
                    scrollButton.removeClass('qmt-scroll-slide_left_out');
                    scrollButton.addClass('qmt-scroll-slide_left');
                },
                hide: () => {
                    scrollButton.addClass('qmt-scroll-slide_left_out');
                }
            },
            slide_right: {
                show: () => {
                    scrollButton.removeClass('qmt-scroll-slide_right_out');
                    scrollButton.addClass('qmt-scroll-slide_right');
                },
                hide: () => {
                    scrollButton.addClass('qmt-scroll-slide_right_out');
                }
            },
            flip: {
                show: () => {
                    scrollButton.removeClass('qmt-scroll-flip-out');
                    scrollButton.addClass('qmt-scroll-flip-in');
                },
                hide: () => {
                    scrollButton.addClass('qmt-scroll-flip-out');
                }
            },
            default: {
                show: () => {
                    scrollButton.show();
                },
                hide: () => {
                    scrollButton.hide();
                }
            },
        };
        if (offset > 0 && animations[animationType]) {
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > offset) {
                    // Call the appropriate show animation function
                    animations[animationType].show();
                } else {
                    // Call the appropriate hide animation function
                    animations[animationType].hide();
                }
            });
        }

        scrollButton.on('click', function() {
            $('html, body').animate({ scrollTop: 0 });
        });
    });


})( jQuery );