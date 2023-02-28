import express from 'express';
import router from './routes';
import db from './db';

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

db.testConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
  });
