import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import recipeRoutes from './routes/recipesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import config from './config.js';

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message, error.stack);
});

// Creating an instance of the Express application
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
// Routes
app.use('/api', recipeRoutes);
app.use('/api/users', usersRoutes);

// Starting the server.
const server = app.listen(config.port, () => {
  console.log(`Server is live @ ${config.hostUrl} on port ${config.port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${config.port} is already in use. Trying another port...`);
    // Attempt to handle the error, for example, by trying a different port.
  } else {
    console.error('An error occurred while starting the server:', error);
  }
});