const server = require('./setup-server');

server.listen(process.env.APP_PORT);

console.log('Sports Assist application listening on port ' + process.env.APP_PORT);