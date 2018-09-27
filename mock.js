//mock.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();
router.render = (req, res) => {
    const method = req.method.toLowerCase();
    const path = req.body && req.body.currentPage ? req.url + '/' + req.body.currentPage : req.originalUrl;
    const mock = require('./mock-server' + path + '/index.' + method + '.json');
    res.status(200).jsonp(mock);
};
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
    console.log('bds-queue-mobile Server is running')
});
