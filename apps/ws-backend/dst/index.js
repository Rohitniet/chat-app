"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const index_1 = require("@repo/backend_common/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const wss = new ws_1.WebSocketServer({ port: 8080 });
const users = [];
function checkuser(token) {
    const decode = jsonwebtoken_1.default.verify(token, index_1.jwt_secret);
    if (typeof decode === "string") {
        return null;
    }
    if (!decode || !decode.id) {
        return null;
    }
    return decode.id;
}
wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get("token") || "";
    const userid = checkuser(token);
    if (userid == null) {
        ws.close();
        return;
    }
    users.push({
        userid,
        ws,
        rooms: []
    });
    ws.on('message', function message(data) {
        const parsedata = JSON.parse(data);
        console.log("recived a message");
        if (parsedata.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedata.room);
        }
        if (parsedata.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter(x => x !== parsedata.room);
        }
        if (parsedata.type === "chat") {
            console.log("                                                                 we are hiting it");
            const room = parsedata.room;
            const message = parsedata.message;
            console.log("                                                                 we are hiting it");
            users.forEach(user => {
                if (user.rooms.includes(room)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        room
                    }));
                }
            });
        }
    });
    ws.send('something');
});
