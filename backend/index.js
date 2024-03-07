import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import recipeRoutes from './routes/recipesRoutes.js';
import config from './config.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/api', recipeRoutes);


app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl} on port ${config.port}`),
);