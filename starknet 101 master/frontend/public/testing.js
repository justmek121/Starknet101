const express = require('express');
const app = express();
const port = 3000;

// Define a route that serves your HTML page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Simple Node.js Webpage</title>
        </head>
        <body>
            <h1>Hello, Node.js!</h1>
            <p>This is a simple Node.js webpage.</p>
        </body>
        </html>
    `);
});

// Start the web server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
