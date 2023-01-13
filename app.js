require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const trainRoutes = require('./routes/trainRoutes');

//middlewares
app.use(express.json());
app.use('/api/v1/trains',trainRoutes);


app.listen(port,()=> console.log(`app is listening at port ${port}`));