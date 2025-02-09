const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000; 
// const port = 3000;
const framesDir = path.join(__dirname, "frames", "parrot");

app.use(express.static("public"));



function getFrames() {
    return fs.readdirSync(framesDir)
        .filter(file => file.endsWith(".txt"))
        .sort();
}
app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});


app.get("/", (req, res) => {
    return res.send(`
        <html>
            <head>
                <title>Console Canvas</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg">
                <style>
                    body {
                        background-color: black;
                        color: white;
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }
                    code {
                        background-color: #333;
                        padding: 5px;
                        border-radius: 5px;
                        color: #0f0;
                    }
                </style>
            </head>
            <body>
                <h1>Welcome!</h1>
                <p>This is project is for you to have fun while using your terminal</p>
                <code>curl consolecanvas.vercel.app/parrot</code>
            </body>
        </html>
    `);
    
    
});

app.get("/parrot", (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    if (!userAgent.includes("curl")) {
        return res.send(`
            <html>
                <head>
                    <title>Console Canvas</title>
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
                    <style>
                        body {
                            background-color: black;
                            color: white;
                            font-family: Arial, sans-serif;
                            text-align: center;
                        }
                        code {
                            background-color: #333;
                            padding: 5px;
                            border-radius: 5px;
                            color: #0f0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Oops!</h1>
                    <p>We are not supported in web,Please run:</p>
                    <code>curl consolecanvas.vercel.app/parrot</code>
                </body>
            </html>
        `);
        
        
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