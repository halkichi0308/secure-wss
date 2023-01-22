import express from "express";
import { createServer } from "https";
import { readFileSync } from "fs";

let app = express();

app.get("/", function (req, res, next) {
    let html = readFileSync("./index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
});

let options = {
    key: readFileSync("./cert/privkey.pem"),
    cert: readFileSync("./cert/fullchain.pem"),
};

let server = createServer(options, app);

server.listen(4443, function () {
    console.log("listen 4443");
});
