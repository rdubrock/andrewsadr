var express = require('express');
var router = express.Router();
var Mailgun = require('mailgun-js');
var mailGunUserInfo = require('./mailgunlogininfo.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/mail', function(req, res, next) {
  var api_key = mailGunUserInfo.api_key;
  var domain = mailGunUserInfo.domain;  
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});

  var data = {
  //Specify email data
    from: 'contact@andrewsadrservices.com',
  //The email to contact
    to: 'andrewselaine@gmail.com',
  //Subject and text data  
    subject: 'Enquiry through website from '+req.body.name,
    html: '<h4>Name: </h4><p>'+req.body.name+'</p><h4>Email: </h4><p>'+req.body.email+'</p><h4>Phone: </h4><p>'+req.body.phone+'</p><h4>Message: </h4><p>'+req.body.message+'</p>'
  }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.end('error');
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.end();
            console.log(body);
        }
    });

  res.end();
})

module.exports = router;
