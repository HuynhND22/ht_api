"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = __importDefault(require("../controllers/upload.controller"));
const router = express_1.default.Router();
router.post('/posts', upload_controller_1.default.posts);
exports.default = router;
