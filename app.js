const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
    origin: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', (req, res) => {
    res.send("https://cors-cut.glitch.me/your-url");
});

app.get('*', async (req, res) => {
    try
    {
        const url = req.url.toString().substring(1);
        const {data} = await axios.get(url);
        return res.send(data);
    }
    catch(err) 
    {
        return res.status(500).json({
            type: "ERROR",
            payload: err.message
        });
    }
});

app.all('*', (req, res) => {
    return res.status(500).json({
        type: "ERROR",
        payload: "Only GET request is allowed."
    });
});

const PORT = process.env.PORT || 5000;
app.set('port', PORT);

module.exports = app;

