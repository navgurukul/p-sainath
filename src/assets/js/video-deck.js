/*
    Make cards clickable
    ====================
*/

$('.video-deck .card-body').on('click', function () {
    $(this).parent().find("a").trigger('click');
});

/*

    Set caption from card text
    ==========================
*/

$('.video-deck a').fancybox({
    caption: function (instance, item) {
        return $(this).parent().find('.card-text').html();
    }
});