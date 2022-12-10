/*---------------------------------------------------------------------
特定の高さでヘッダーCSSを付加
---------------------------------------------------------------------*/
$(window).scroll(function() {
    let scrollTop = jQuery(window).scrollTop(); // スクロール上部の位置
    let areaTop = jQuery("#header-change").offset().top; // 対象エリアの上部の位置

    if (scrollTop > areaTop && scrollTop) {
        // スクロールが対象エリアに入った場合
        $("body").addClass("is-in");
        $(".is-active").addClass("headerLogScroll");
    } else {
        // スクロールが対象エリアから出ている場合
        $("body").removeClass("is-in");
        $(".is-active").removeClass("headerLogScroll");
    }
});

/*---------------------------------------
レスポンシブメニュー
---------------------------------------*/
/* ハンバーガーボタン */
$(function() {
    $('.hamburger-button').on('click', function() {
        $(this).toggleClass('is-active');
        $('.drawer-menu').toggleClass('is-active');
    });
});
/* ドロワーメニュー */

/*---------------------------------------
ヘッダーサブメニュー スライド表示
---------------------------------------*/

$(function() {
    $('ul.menu-list li.menu-item').hover(
        function() {
            $('.sub-menu-content:not(:animated)', this).slideDown(300);
        },
        function() {
            $('.sub-menu-content', this).slideUp(300);
        }
    );
});

/*---------------------------------------
ページのスクロールに合わせてvideoタグの動画再生
---------------------------------------*/
jQuery(function($) {
    function playVideos(videos) {
        const startPosition = $(window).scrollTop() + $(window).height();
        videos.each(function(index) {
            if (startPosition > $(this).offset().top) {
                $(this).get(0).play();
            }
        });
    }
    $(window).on('load', function() {
        const videos = $('.video_wrapper > video');
        if (videos.length) {
            playVideos(videos);
            $(window).on('scroll', function() {
                playVideos(videos);
            });
        }
    });
});


/*---------------------------------------
ページトップ
---------------------------------------*/

$('#page-top').click(function() {
    $('html,body').animate({
        scrollTop: 0
    }, 300);
});