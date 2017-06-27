/**
 * Created by Cynthia on 10/02/2017.
 */

$(function () {
    $('.language-dropdown').click(function () {
        $('.language-dropdown').toggleClass('closed');
        $('.language-dropdown').toggleClass('opened');
    });

    if ($(".result-message").size() > 0){
        location.href = "#result-message";
    }

    $('.to-top').click(function () {
        location.href = "#";
    });

});