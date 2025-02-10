const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000; 
// const port = 3000;
const framesDir = path.join(__dirname, "frames", "parrot");

app.use(express.static("public"));

// app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') { // Check if the request is HTTP
//       return res.redirect(301, `https://${req.hostname}${req.originalUrl}`); // Redirect to HTTPS
//     }
//     next(); // Continue to the next middleware/route handler
// });

function getFrames() {
    return fs.readdirSync(framesDir)
        .filter(file => file.endsWith(".txt"))
        .sort();
}

// app.get("/", (req, res) => {
//     res.setHeader("Content-Type", "text/plain");
//     res.send("Welcome");
// });

app.get("/", (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    if (!userAgent.includes("curl")){  
        res.sendFile(path.join(__dirname, "index.html"));
    }
    else{
        res.send('Use [/parrot]');
    }
    
});

app.get("/parrot", (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    if (!userAgent.includes("curl")) {
        
        res.sendFile(path.join(__dirname, "index.html"));
        
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const frames = getFrames();
    let index = 0;

    const interval = setInterval(() => {
        if (index >= frames.length) index = 0;
        const content = fs.readFileSync(path.join(framesDir, frames[index]), "utf-8");
        res.write(`\n\x1Bc${content}\n`);
        index++;
    }, 200);

    req.on("close", () => clearInterval(interval));
});

if (require.main === module) {
    app.listen(port, () => console.log(`http://localhost:${port}/parrot`));
}

module.exports = app;