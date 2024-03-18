// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import recipeRoutes from './routes/recipesRoutes.js';
// import usersRoutes from './routes/usersRoutes.js';
// import config from './config.js';



// // Unhandled exception handler
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error.message, error.stack);
//   // Optionally, you might want to perform additional cleanup or logging here
//   // process.exit(1); // Terminate the process after handling the exception
// });



// const app = express();
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// // Serve frontend files
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.use(cors());
// // Routes
// app.use('/api', recipeRoutes);
// app.use('/api/users', usersRoutes);

// // Serve frontend for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

// app.listen(config.port, () =>
//   console.log(`Server is live @ ${config.hostUrl} on port ${config.port}`),
// );

// const path = require('path');

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import recipeRoutes from './routes/recipesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import config from './config.js';


// Unhandled exception handler
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message, error.stack);
  // Optionally, you might want to perform additional cleanup or logging here
  // process.exit(1); // Terminate the process after handling the exception
});



const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
// Routes
app.use('/api', recipeRoutes);
app.use('/api/users', usersRoutes);


app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl} on port ${config.port}`),
);