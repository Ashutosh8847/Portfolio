const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

const mail_route = require('./routes/mailRoutes');
app.use('/mail', mail_route);

app.listen(process.env.PORT || 3500, () => {
    console.log(`Backend server is running ON PORT http://localhost:${process.env.PORT || 3500}`);
});
