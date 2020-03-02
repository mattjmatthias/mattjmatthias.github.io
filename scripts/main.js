$(function () {
    var scroll_start = 0;
    var startchange = $('.post-container');
    var offset = startchange.offset()
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $(".header_nav_wrapper").css('opacity', '1');
                $(".header_nav_wrapper").css('visibility', 'visible');
            } else {
                $(".header_nav_wrapper").css('opacity', '0');
                $(".header_nav_wrapper").css('visibility', 'collapse');
            }
        });
    }
    
    if ($('#accentColour').val() != undefined) {
        var accentColour = $('#accentColour').val();
        $('.title-page-footer').css('background-color', accentColour);
        $('h2').css('color', accentColour);
        $('h3').css('color', lightenDarkenColour(accentColour, 50));
        $('q').css('background-color', accentColour);
        $('blockquote').css('color', accentColour);
    }
    
    // Toggle the download icon from black to white on mouse enter
    $('.good-developer-download').mouseenter(function () {
        $(this).find('.icon-image-black').addClass('icon-image-white');
        $(this).find('.icon-image-white').removeClass('icon-image-black');
    });

    $('.good-developer-download').mouseleave(function () {
        $(this).find('.icon-image-white').addClass('icon-image-black');
        $(this).find('.icon-image-black').removeClass('icon-image-white');
    });

    // For any image galleries in posts, set the thumbnail width to be the 95% / the number of images.
    $('.image-gallery').each(function (index) {
        if ($(this).find('figure').attr("class") == undefined) {
            var width = 90 / $(this).find('figure').length;
            $(this).find('figure').css('width', width + "%");
        }
    });

    // Set the hero-image of an article to the link set on each page in the hidden input field #hero-image
    if ($('.post-header #hero-image').val() != undefined) {
        var heroImage = $('.post-header #hero-image').val();
        $('.post-header .title').css('background-image', 'url(' + heroImage + ')');
    }

    $('.translate').click(function () {
        $('#english-text').css('display', 'none');
        $('#translated-text').css('display', 'block');

        $('.post-sidebar .translated').css('display', 'block');
        $('.post-sidebar .english').css('display', 'none');
    });

    $('.display-english').click(function () {
        $('#english-text').css('display', 'block');
        $('#translated-text').css('display', 'none');

        $('.post-sidebar .translated').css('display', 'none');
        $('.post-sidebar .english').css('display', 'block');
    });
    
    /*
    'use strict';
    var $page = $('#main'),
        options = {
            debug: true,
            prefetch: true,
            cacheLength: 2,
            forms: 'form',
            anchors: 'a',
            onStart: {
                duration: 250, // Duration of our animation
                render: function ($container) {
                    // Add your CSS animation reversing class
                    $container.addClass('is-exiting');
                    // Restart your animation
                    smoothState.restartCSSAnimations();
                }
            },
            onReady: {
                duration: 0,
                render: function ($container, $newContent) {
                    // Remove your CSS animation reversing class
                    $container.removeClass('is-exiting');
                    // Inject the new content
                    $container.html($newContent);
                }
            }
        },
        smoothState = $page.smoothState(options).data('smoothState');
        */
});

function lightenDarkenColour(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}