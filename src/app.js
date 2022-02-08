const server = require('./server.js');
const { connectDb } = require('./db.js');

connectDb();

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Server listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});
