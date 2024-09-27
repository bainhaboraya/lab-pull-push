const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'mycv.txt');
const POLLING_INTERVAL = 1000; 
const TIMEOUT = 30000; 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.get('/mycv', (req, res) => {
    const clientTime = parseInt(req.query.lastModified, 10) || 0;

    const checkFile = () => {
        fs.stat(FILE_PATH, (err, stats) => {
            if (err) {
                res.status(500).send('Error reading file');
                return;
            }
            const fileTime = stats.mtimeMs;
            if (fileTime > clientTime) {
                fs.readFile(FILE_PATH, 'utf8', (err, data) => {
                    if (err) {
                        res.status(500).send('Error reading file');
                        return;
                    }
                    res.json({
                        data,
                        client_time: clientTime,
                        server_time: fileTime
                    });
                });
            } else {
                setTimeout(checkFile, POLLING_INTERVAL);
            }
        });
    };

    setTimeout(() => res.status(204).send(), TIMEOUT); 
    checkFile();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
