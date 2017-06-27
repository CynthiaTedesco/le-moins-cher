/**
 * Created by Cynthia on 01/03/2017.
 */
var express = require('express');
var js = require('../public/js/scripts');

var servicesRouter = express.Router();

servicesRouter.route('/').get(function (request, response) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.services'),
        question: js.getObj().__('services.question'),
        answer_paragraph1: js.getObj().__('services.answer.paragraph1'),
        answer_paragraph2: js.getObj().__('services.answer.paragraph2'),
        webcenter_title: js.getObj().__('services.webcenter.title'),
        webcenter_text: js.getObj().__('services.webcenter.text'),
        webcenter_document: js.getObj().__('services.webcenter.document'),
        webcenter_document_text: js.getObj().__('services.webcenter.document.text'),
        webcenter_digital: js.getObj().__('services.webcenter.digital'),
        webcenter_digital_text: js.getObj().__('services.webcenter.digital.text'),
        webcenter_enterprise: js.getObj().__('services.webcenter.enterprise'),
        webcenter_enterprise_text: js.getObj().__('services.webcenter.enterprise.text'),
        webcenter_records: js.getObj().__('services.webcenter.records'),
        webcenter_records_text: js.getObj().__('services.webcenter.records.text'),
        cloud_title: js.getObj().__('services.cloud.title'),
        cloud_paragraph1: js.getObj().__('services.cloud.paragraph1'),
        cloud_paragraph2: js.getObj().__('services.cloud.paragraph2'),
        sites_title: js.getObj().__('services.sites.title'),
        sites_paragraph1: js.getObj().__('services.sites.paragraph1'),
        portal_title: js.getObj().__('services.portal.title'),
        portal_paragraph1: js.getObj().__('services.portal.paragraph1')
    });
    locals.menu.services.class = 'active';
    response.render('pages/servicios', locals);
})

exports.router = function () {
    return servicesRouter;
}

