const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { dbConnection } = require('./config/dbConfig.js');

const userRoute = require('./routes/userRoute.js');
const projectRoute = require('./routes/projectsRoute.js')

dbConnection();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/projects", projectRoute);

app.listen(port, () => console.log(`Node JS server listening on port ${port}`));
