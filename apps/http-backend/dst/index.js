"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("@repo/backend_common/index");
const zodschema_1 = require("@repo/common/zodschema");
const client_1 = require("@repo/db/client");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", async (req, res) => {
    const validateddata = zodschema_1.signupschema.safeParse(req.body);
    if (validateddata.data == undefined) {
        return;
    }
    const email = validateddata.data?.email;
    const password = validateddata.data?.password;
    const hashed = await bcrypt_1.default.hash(password, 5);
    const name = validateddata.data?.name;
    await client_1.client.user.create({
        data: {
            email,
            //@ts-ignore
            name,
            password: hashed
        }
    });
    res.json({
        "message": "you have signed up"
    });
});
app.post("/signin", async (req, res) => {
    const validateddata = zodschema_1.signinschema.safeParse(req.body);
    if (validateddata.data == undefined) {
        return;
    }
    const email = validateddata.data?.email;
    const password = validateddata.data?.password;
    const user = await client_1.client.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        res.json({
            "message": "user not found"
        });
    }
    if (user?.password === undefined) {
        return;
    }
    const hashpass = user?.password;
    const pass = await bcrypt_1.default.compare(password, hashpass);
    if (!pass) {
        res.json({
            "message": "wrong pass"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, index_1.jwt_secret);
    res.json({
        token
    });
});
app.post("/create-room", middleware_1.Authware, async (req, res) => {
    const data = zodschema_1.Createroom.safeParse(req.body);
    if (!data.success) {
        res.json({
            "message": "incorrect inputs"
        });
    }
    //@ts-ignore
    const userid = req.id;
    const slug = data.data?.slug;
    const room = await client_1.client.room.create({
        data: {
            slug: slug,
            adminid: userid
        }
    });
    res.json({
        roomid: room.id
    });
});
app.listen(3001);
