const express = require("express");
const app = express();
const cors = require('cors')

require('dotenv').config();

app.use(cors())
const extract_data = require('./routes/extract_data');

app.use('/api/extract_data', extract_data);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listen on port ${port}`);
})

