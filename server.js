// server.js

import express from 'express';
import bodyParser from 'body-parser'; // Import body-parser
import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
