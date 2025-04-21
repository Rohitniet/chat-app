"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authware = Authware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("@repo/backend_common/index");
async function Authware(req, res, next) {
    try {
        const token = req.headers.token;
        //@ts-ignore
        const userobject = jsonwebtoken_1.default.verify(token, index_1.jwt_secret);
        if (!userobject) {
            res.json({
                "message": "invalid user"
            });
        }
        const userid = userobject.id;
        //@ts-ignore
        req.id = userid;
        next();
    }
    catch (e) {
        res.json({
            "message": "invalid jwt token"
        });
    }
}
