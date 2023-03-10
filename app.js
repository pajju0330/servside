require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const trainRoutes = require('./routes/trainRoutes');
const busRoutes = require('./routes/busRoutes');
app.use(cors());
//middlewares
app.use(express.json());
app.use('/api/v1/trains',trainRoutes);
app.use('/api/v1/bus',busRoutes);


app.listen(port,()=> console.log(`app is listening at port ${port}`));