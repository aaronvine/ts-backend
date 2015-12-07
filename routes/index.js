var express = require('express');
var router = express.Router();
var validator = require('validator');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
/* GET tickets */
router.get('/tickets', function (req, res, next) {
    var ticketsList = req.ticketsModule.getTicketsList();
    res.json(ticketsList);
});
/* GET ticket by id */
router.get('/tickets/:id', function (req, res, next) {
    var ticket = req.ticketsModule.getTicketById(req.params.id);
    res.json(ticket);
});
/* DELETE ticket by id */
router.delete('/tickets/:id', function (req, res, next) {
    req.ticketsModule.removeTicket(req.params.id);
    res.redirect('tickets');
});
/* POST new ticket */
router.post('/tickets', function (req, res, next) {
    var newTicket = {};
    if (validator.isNull(req.body.title) || validator.isNull(req.body.content) || validator.isNull(req.body.userEmail)) {
        return res.status(500).json('missing details');
    } else if (!validator.isEmail(req.body.userEmail)) {
        return res.status(500).json('incorrect email address');
    } else {
        newTicket.id =  req.ticketsModule.uuid();
        newTicket.title = req.body.title;
        newTicket.content = req.body.content;
        newTicket.userEmail = req.body.userEmail;
        req.ticketsModule.addNewTicket(newTicket);
        res.redirect('tickets');
    }
});
/* GET new ticket page */
router.get('/newticket', function (req, res, next) {
    res.render('newticket', {title: 'Add a new ticket'});
});

router.get('/removeticket', function (req, res, next) {
    res.render('removeticket', {title: 'Remove a ticket by id'});
});

module.exports = router;
