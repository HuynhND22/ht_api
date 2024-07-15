"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const multer = require('multer');
const path = require('path');
const posts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = multer.diskStorage({
        contentType: multer.AUTO_CONTENT_TYPE,
        destination: function (req, file, cb) {
            if (!fs_1.default.existsSync(`./public/uploads/posts/`)) {
                fs_1.default.mkdirSync(`./public/uploads/posts/`, { recursive: true });
            }
            return cb(null, `./public/uploads/posts/`);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
            return Date.now() + '-' + file.originalname;
        }
    });
    const upload = multer({ storage: storage }).array("images", 5);
    yield upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Upload failed" });
            }
            else {
                try {
                    const images = (_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => {
                        console.log(file === null || file === void 0 ? void 0 : file.filename);
                        return { url: 'http://localhost:9999/uploads/posts/' + (file === null || file === void 0 ? void 0 : file.filename) };
                    });
                    console.log(images);
                    return res.status(200).json(images);
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Transaction failed" });
                }
            }
        });
    });
});
exports.default = { posts };
