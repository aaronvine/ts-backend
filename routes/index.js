var express = require('express');
var router = express.Router();

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
    res.ticketsModule.removeTicket(req.params.id);
});
/* POST new ticket */
router.post('/tickets', function (req, res, next) {
    var newTicket = {};
    newTicket.id =  req.ticketsModule.uuid();
    newTicket.title = req.body.title;
    newTicket.content = req.body.content;
    newTicket.userEmail = req.body.userEmail;
    req.ticketsModule.addNewTicket(newTicket);
    res.redirect('tickets');
});
/* GET new ticket page */
router.get('/newticket', function (req, res) {
    res.render('newticket', { title: 'Add a new ticket' });
});

module.exports = router;
