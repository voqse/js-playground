import server from './server.js';
import { connectDb } from './db.js';

connectDb(process.env.MONGO_URI);

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Server listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});
