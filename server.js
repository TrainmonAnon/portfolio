require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
var Mailchimp = require('mailchimp-api-v3')
 
var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/profile', profile);

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
      person: {
        firstName: 'Brandon',
        lastName: 'Fletcher',
      }
    }
  
    res.render('index', data);
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
  
app.post('/thanks', (req, res) => {
    let mockData = {firstName:"Bob", lastName:"AlsoBob", email:"bob@bob.bob"};
    if (process.env.NODE_ENV === 'test') res.render('thanks', { contact: mockData });
    let { firstName, lastName, email } = req.body;
    let contact = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    }
    
    mailchimp.post('/lists/e98f95e4c7/members', contact)
      .then(function(results) {
        res.render('thanks', { contact: req.body });
      })
      .catch(function (err) {
        console.log(err);
      });

    
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
})

module.exports = app;