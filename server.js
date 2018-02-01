const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.port || 1122;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// app.post("/", (req, res) => {
//     let data = "";
//     res.send(data);
// });

io.on("connection", socket => {
    console.log("user connected");

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });

    socket.on("chat message", msg => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});

http.listen(port, function() {
    console.log("Listening on port : " + port);
});