import server from './server.js';
import * as db from './db.js';

db.connectDb();

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Server listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});
