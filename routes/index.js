/**
 * Created by Cynthia on 20/02/2017.
 */
const routes = require('express').Router();
var js = require('../public/js/scripts');
var lang;

routes.get('/*', function (request, response, next) {
    //it prevents double preparation if request comes from language change
    if (js.validRoute(request.url) && js.getLanguages().indexOf(request.url.replace('/', '')) < 0) {
        console.log('calling preparation from /*');
        console.log(request.url);
        prepare(request);
    }
    next();
});
routes.get('/', function (request, response) {
    var locals = js.getLocals({
        slideshows: [
            {
                divClass: 'item active',
                imgSrc: 'images/slideshow/slide01.jpg',
                imgAlt: 'first slide',
                caption: js.getObj().__('caption1')
            },
            {
                divClass: 'item',
                imgSrc: 'images/slideshow/slide02.jpg',
                imgAlt: 'second slide',
                caption: js.getObj().__('caption2')
            },
            {
                divClass: 'item',
                imgSrc: 'images/slideshow/slide03.jpg',
                imgAlt: 'third slide',
                caption: js.getObj().__('caption3')
            },
            {
                divClass: 'item',
                imgSrc: 'images/slideshow/slide04.jpg',
                imgAlt: 'fourth slide',
                caption: js.getObj().__('caption4')
            },
            {
                divClass: 'item',
                imgSrc: 'images/slideshow/slide05.jpg',
                imgAlt: 'fifth slide',
                caption: js.getObj().__('caption5')
            },
            {
                divClass: 'item',
                imgSrc: 'images/slideshow/slide06.jpg',
                imgAlt: 'sixth slide',
                caption: js.getObj().__('caption6')
            }
        ],
        commitment: {
            title: js.getObj().__('commitment.title'),
            text: js.getObj().__('commitment.text')
        },
        alliances: js.getObj().__('business.alliances'),
        contentManagement: js.getObj().__('content.management'),
        readMore: js.getObj().__('read.more'),
        products: js.getObj().__('products'),
        content: js.getObj().__('content'),
        portal: js.getObj().__('portal'),
        sites: js.getObj().__('sites'),
        cloud: js.getObj().__('cloud')
    });

    locals.menu.home.class = 'active';
    response.render('pages/index', locals);
});

//resolves language
var setLanguage = function (request) {
    lang = js.resolveLanguage(request);
}
//sets lang var and common locals
var prepare = function (request) {
    //checks if lang var is set. If not, it resolves it
    if (!lang) {
        setLanguage(request);
    }
    js.setLabels(request, lang);
}

routes.get('*/es', function (request, response) {
    response.cookie('lang', 'es', {});
    setLanguage({cookies: {lang: 'es'}});
    response.redirect(request.get('referer') ? request.get('referer') : '/');
});
routes.get('*/en', function (request, response) {
    response.cookie('lang', 'en', {});
    setLanguage({cookies: {lang: 'en'}});
    response.redirect(request.get('referer') ? request.get('referer') : '/');
});

module.exports = routes;