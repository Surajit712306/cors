const app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log(`Server is running at http://localhost:${app.get('port')}.`)
});

server.on('error', err => {
    console.log(`Server error: ${err.message}`);
});