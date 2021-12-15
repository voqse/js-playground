import server from './server.js';
import config from './config.js';

server.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});
