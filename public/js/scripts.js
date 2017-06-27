/**
 * Created by Cynthia on 10/02/2017.
 */

var exports = module.exports = {};

var i18n;
var obj = {};
var commons = {};
var defaultLang = 'es';
var spanishObj = {
    name: 'es',
    label: 'ESPAÑOL',
    url: '/es'
};
var englishObj = {
    name: 'en',
    label: 'ENGLISH',
    url: '/en'
};

var selectedLang;
var nonSelectedLang;

exports.setTranslator = function (i18n) {
    this.i18n = i18n;
}
exports.getTranslator = function(){
    return this.i18n;
}
exports.getLanguages = function(){
    return ['es', 'en'];
}

exports.getSelectedLang = function(){
    return selectedLang;
}

exports.validRoute = function (url) {
    return url.indexOf('images') + url.indexOf('stylesheets') + url.indexOf('js') + url.indexOf('favicon') === -4;
}
exports.getNonSelectedLang = function () {
    return nonSelectedLang;
}
exports.setObj = function(obj1){
    obj = obj1;
}
exports.getObj = function(){
    return obj;
}
exports.resolveLanguage = function(request) {
    if (request && request.cookies){
        console.log('resolving language');
        if (request.cookies.lang === 'en'){
            selectedLang = englishObj;
            nonSelectedLang = spanishObj;
        } else {
            selectedLang = spanishObj;
            nonSelectedLang = englishObj;
        }
        return selectedLang.name;
    } else {
        console.log('setting default language');
        selectedLang = spanishObj;
        nonSelectedLang = englishObj;
        return defaultLang;
    }
}

exports.getLocals = function(locals){
    locals.menu = commons.menu;
    locals.dropDown = commons.dropDown;

    return locals;
}

exports.getAboutLocals = function(){
    return {
        title: obj.__('about.title'),
        paragraph1: obj.__('about.paragraph1'),
        paragraph2: obj.__('about.paragraph2'),
        paragraph3: obj.__('about.paragraph3'),
        paragraph4: obj.__('about.paragraph4'),
        welcome: obj.__('about.welcome'),
        director_name: obj.__('about.director.name'),
        director: obj.__('about.director')
    }
}

exports.setLabels = function(request, lang){
    this.getTranslator().setLocale(request, lang);

    commons = {menu: {
                home: {label: obj.__('nav.home'), class: ''},
                know: {label: obj.__('nav.know.us'), class: ''},
                know_about: {label: obj.__('nav.know.us.about'), class: ''},
                know_philosophy: {label: obj.__('nav.know.us.philosophy'), class: ''},
                know_background: {label: obj.__('nav.know.us.background'), class: ''},
                know_working: {label: obj.__('nav.know.us.working'), class: ''},
                know_allies: {label: obj.__('nav.know.us.allies'), class: ''},
                services: {label: obj.__('nav.services'), class: ''},
                contact: {label: obj.__('nav.contact.us'), class: ''}
            },
        dropDown: {selected: this.getSelectedLang(),
            nonSelected: this.getNonSelectedLang()}};
}

module.exports = exports;