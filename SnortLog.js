const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8011;
const filePath = path.join(__dirname, 'snort_afterPingAttack.alert.fast');

app.use(cors({origin: "*"}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Route to fetch the file data
app.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, snortLogFileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }

        const snortLogFileDataLines = snortLogFileData.split('\n');
        res.json(snortLogFileDataLines);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// const fs = require("fs");
// const http = require("http");
// const socketIo = require("socket.io");

// const port = 8011;

// const server = http.createServer();
// const io = socketIo(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type"],
//         credentials: true
//     }
// });

// const filePath = 'snort_afterPingAttack.alert.fast';

// fs.watch(filePath, (eventType, filename) => {
//     if (eventType === 'change') {
//         fs.readFile(filePath, 'utf8', (err, snortLogFileData) => {
//             if (err) {
//                 console.error('Error reading file:', err);
//                 return;
//             }
            
//             const snortLogFileDataLines = snortLogFileData.split('\n');
//             console.log('The file has been modified!');

//             io.emit('fileChanged', snortLogFileDataLines);
//         });
//     }
// });

// io.on('connection', (socket) => {
//     console.log('New client connected');

//     fs.readFile(filePath, 'utf8', (err, snortLogFileData) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }

//         const snortLogFileDataLines = snortLogFileData.split('\n');
//         socket.emit('fileChanged', snortLogFileDataLines);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// server.listen(port, () => console.log("Listening on port " + port));
