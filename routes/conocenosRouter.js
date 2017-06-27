/**
 * Created by Cynthia on 24/02/2017.
 */
var express = require('express');
var js = require('../public/js/scripts');

var conocenosRouter = express.Router();

conocenosRouter.route('/').get(function (request, response, next) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.know.us'),
        subsection: '../pages/acerca.ejs'
    });
    locals.section = js.getAboutLocals();
    locals.menu.know.class = 'active';
    locals.menu.know_about.class = 'active';
    response.render('pages/conocenos', locals);
})
conocenosRouter.route('/acerca').get(function (request, response, next) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.know.us'),
        subsection: '../pages/acerca.ejs'
    });
    locals.section = js.getAboutLocals();
    locals.menu.know.class = 'active';
    locals.menu.know_about.class = 'active';
    response.render('pages/conocenos', locals);
})
conocenosRouter.route('/filosofia').get(function (request, response, next) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.know.us'),
        section: {title: js.getObj().__('philosophy.title'),
            paragraph1: js.getObj().__('philosophy.paragraph1'),
            paragraph2: js.getObj().__('philosophy.paragraph2'),
            paragraph3: js.getObj().__('philosophy.paragraph3'),
            paragraph4: js.getObj().__('philosophy.paragraph4')},
        subsection: '../pages/filosofia.ejs'
    })
    locals.menu.know.class = 'active';
    locals.menu.know_philosophy.class = 'active';
    response.render('pages/conocenos', locals);
})
conocenosRouter.route('/trayectoria').get(function (request, response, next) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.know.us'),
        section: {title: js.getObj().__('background.title'),
            paragraph1: js.getObj().__('background.paragraph1'),
            paragraph2: js.getObj().__('background.paragraph2')},
        subsection: '../pages/trayectoria.ejs'
    });
    locals.menu.know.class = 'active';
    locals.menu.know_background.class = 'active';
    response.render('pages/conocenos', locals);
})
conocenosRouter.route('/trabajo').get(function (request, response, next) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.know.us'),
        section: {title: js.getObj().__('working.title'),
            paragraph1: js.getObj().__('working.paragraph1'),
            paragraph2: js.getObj().__('working.paragraph2'),
            paragraph3: js.getObj().__('working.paragraph3')},
        subsection: '../pages/trabajo.ejs'
    });
    locals.menu.know.class = 'active';
    locals.menu.know_working.class = 'active';
    response.render('pages/conocenos', locals);
})
conocenosRouter.route('/alianzas').get(function (request, response, next) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.know.us'),
        section: {title: js.getObj().__('allies.title'),
            paragraph1: js.getObj().__('allies.paragraph1')},
        subsection: '../pages/alianzas.ejs'
    });
    locals.menu.know.class = 'active';
    locals.menu.know_allies.class = 'active';
    response.render('pages/conocenos', locals);
})

exports.router = function () {
    return conocenosRouter;
}

