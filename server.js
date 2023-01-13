const express = require('express');
const path = require('path');

const app = express();




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`)
})