const app = require('.');
const PORT = process.ENV.port || 3000;

// start server
const server = app.listen(PORT);
console.log('Express started. Listening on %s', PORT);
