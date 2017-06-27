var express = require('express');
var js = require('../public/js/scripts');
var nodemailer = require('nodemailer');

var contactRouter = express.Router();
var makeEmail = function (name, company, position, phone, cellphone, email, comments) {
    var emailText = 'Has recibido un nuevo mensaje de <b>' + name +':</b><br/><br/>';
    if (company){
        emailText = emailText.concat('<b>Empresa:</b> ' + company + '<br/>');
    }
    if (position){
        emailText = emailText.concat('<b>Puesto:</b> ' + position + '<br/>');
    }
    if (phone){
        emailText = emailText.concat('<b>Telefono:</b> ' + phone + '<br/>');
    }
    if (cellphone){
        emailText = emailText.concat('<b>Teléfono movil:</b> ' + cellphone + '<br/>');
    }

    emailText = emailText.concat('<b>Email:</b> ' + email + '<br/>');
    emailText = emailText.concat('<br/><b>Mensaje:</b><br/><br/> ' + comments + '<br/>');

    return emailText;
}
var getCompleteMessage = function (array) {
    var msg = array[6].replace('comments=', '')  + '<br/>';
    for (var i = 7; i < array.length; i++) {
        msg = msg.concat(array[i] ? array[i] + '<br/>' : '<br/>');
    }

    return msg;
}

var mailHandler = function (request, response) {
    var bodyArray = request.body.split('\r\n');
    var name = bodyArray[0].substring(bodyArray[0].indexOf('=')+1, bodyArray[0].length);
    var company = bodyArray[1].substring(bodyArray[1].indexOf('=')+1, bodyArray[1].length);
    var position = bodyArray[2].substring(bodyArray[2].indexOf('=')+1, bodyArray[2].length);
    var phone = bodyArray[3].substring(bodyArray[3].indexOf('=')+1, bodyArray[3].length);
    var cellphone = bodyArray[4].substring(bodyArray[4].indexOf('=')+1, bodyArray[4].length);
    var email = bodyArray[5].substring(bodyArray[5].indexOf('=')+1, bodyArray[5].length);
    var comments = getCompleteMessage(bodyArray);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'eisys.sender@gmail.com', // Your email id
            pass: 'eisyssysie' // Your password
        }
    });

    var text = 'Hello world from \n\n';
    var mailOptions = {
        from: 'eisys.sender@gmail.com', // sender address
        to: 'escribinos@eisys.com.ar', // list of receivers
        subject: 'Eisys web message', // Subject line
        // You can choose to send an HTML body instead
        html: makeEmail(name, company, position, phone, cellphone, email, comments)
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            response.redirect('/contacto?success=false');
        }else{
            response.redirect('/contacto?success=true');
        };
    });
}

contactRouter.route('/').get(function (request, response) {
    var locals = js.getLocals({
        title: js.getObj().__('nav.contact.us'),
        text: js.getObj().__('contact.text'),
        name: js.getObj().__('contact.name'),
        company: js.getObj().__('contact.company'),
        position: js.getObj().__('contact.position'),
        phone: js.getObj().__('contact.phone'),
        cellphone: js.getObj().__('contact.cellphone'),
        mail: js.getObj().__('contact.mail'),
        comments: js.getObj().__('contact.comments'),
        send: js.getObj().__('contact.send'),
        mandatory: js.getObj().__('contact.mandatory')
    });
    locals.menu.contact.class = 'active';
    locals.success = js.getObj().__('contact.success');
    locals.error = js.getObj().__('contact.error');
    locals.successMessage = js.getObj().__('contact.success.message');
    locals.errorMessage = js.getObj().__('contact.error.message');
    locals.resultMessage = '';

    if (request.query && request.query.success){
        console.log(request.query.success);
        if (request.query.success === 'true'){
            locals.resultMessage = '../partials/success.message.ejs'
        } else if (request.query.success === 'false'){
            locals.resultMessage = '../partials/error.message.ejs'
        }
    }

    response.render('pages/contacto', locals);
})

contactRouter.route('/send').post(mailHandler);

exports.router = function () {
    return contactRouter;
}