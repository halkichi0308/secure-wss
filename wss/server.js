import { createServer } from "https";
import { readFileSync } from "fs";
import { WebSocketServer } from "ws";

const server = createServer({
    cert: readFileSync("./cert/cert.pem"),
    key: readFileSync("./cert/privkey.pem"),
});
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
        console.log("received: %s", data);
        wss.clients.forEach(function (client) {
            client.send(data.toString());
        });
    });

    ws.send("something");
});

server.listen(5001);
