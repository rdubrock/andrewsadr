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
    from: 'contact@andrewsadrservices.com',
    to: 'andrewselaine@gmail.com',
    subject: 'Enquiry through website from '+req.body.name,
    html: '<h4>Name: </h4><p>'+req.body.name+'</p><h4>Email: </h4><p>'+req.body.email+'</p><h4>Phone: </h4><p>'+req.body.phone+'</p><h4>Message: </h4><p>'+req.body.message+'</p>'
  }
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            console.log("got an error: ", err);
            res.end('error');
        }
        else {
            console.log(body);
            res.end();
        }
    });

  res.end();
})

module.exports = router;
