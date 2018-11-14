const express = require("express");
const app = express();
let sendToPage = () => {};

const port = 3000;
let items = [];

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/page.html");
});
app.get("/queue", (req, res) => {
    items = req.param("items");
    console.log("items", items);
    sendToPage(JSON.stringify(items));
    res.send("ok");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//websocket server
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 40510 });

wss.on("connection", function(ws) {
    ws.on("message", function(message) {
        console.log("received: %s", message);
    });

    sendToPage = (msg) => {
      ws.send(msg);
    }
});
