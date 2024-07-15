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
const data_source_1 = require("../data-source");
const post_entity_1 = require("../entities/post.entity");
const handleUniqueError_1 = require("../helpers/handleUniqueError");
const fs_1 = __importDefault(require("fs"));
const typeorm_1 = require("typeorm");
const checkUnique_1 = __importDefault(require("../helpers/checkUnique"));
const multer = require('multer');
const path = require('path');
const repository = data_source_1.AppDataSource.getRepository(post_entity_1.Post);
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield repository.find({ relations: ['category'], order: { createdAt: 'DESC' } });
        if (products.length === 0) {
            return res.status(204).send({
                error: "No content",
            });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield repository.findOne({
            where: { postId: parseInt(req.params.id) },
            relations: ['category'],
        });
        product ? res.status(200).json(product) : res.sendStatus(410);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const upload = multer({ storage: storage }).single("images");
        yield upload(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    try {
                        const product = req.body;
                        const removeSurroundingQuotes = (value) => {
                            if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
                                return value.slice(1, -1);
                            }
                            return value;
                        };
                        Object.keys(product).forEach(key => {
                            product[key] = removeSurroundingQuotes(product[key]);
                        });
                        let images;
                        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)
                            images = 'uploads/posts/' + ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
                        const saveData = {
                            name: product.name,
                            categoryId: product.categoryId,
                            description: product.description,
                            content: product.content,
                            cover: images
                        };
                        const result = yield repository.save(saveData);
                        const success = yield repository.findOne({ where: { postId: result.postId }, relations: ['category'] });
                        return res.status(200).json('success');
                    }
                    catch (error) {
                        if (error.number == 2627) {
                            const message = (0, handleUniqueError_1.handleUniqueError)(error);
                            return res.status(400).json({ error: message });
                        }
                        console.log(error);
                        return res.status(500).json({ error: "Transaction failed" });
                    }
                }
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const upload = multer({ storage: storage }).single("images");
        yield upload(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    try {
                        const postId = parseInt(req.params.id);
                        const found = yield repository.findOne({ where: { postId: postId } });
                        if (!found)
                            return res.sendStatus(410);
                        const product = req.body;
                        const removeSurroundingQuotes = (value) => {
                            if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
                                return value.slice(1, -1);
                            }
                            return value;
                        };
                        Object.keys(product).forEach(key => {
                            product[key] = removeSurroundingQuotes(product[key]);
                        });
                        let images;
                        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)
                            images = 'uploads/posts/' + ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
                        const saveData = {
                            name: product.name,
                            categoryId: product.categoryId,
                            description: product.description,
                            content: product.content,
                            cover: images
                        };
                        Object.assign(found, saveData);
                        const result = yield repository.save(found);
                        const success = yield repository.findOne({ where: { postId: result.postId }, relations: ['category'] });
                        return res.status(200).json('success');
                    }
                    catch (error) {
                        if (error.number == 2627) {
                            const message = (0, handleUniqueError_1.handleUniqueError)(error);
                            return res.status(400).json({ error: message });
                        }
                        console.log(error);
                        return res.status(500).json({ error: "Transaction failed" });
                    }
                }
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const softDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.id);
        console.log(postId);
        const found = yield repository.findOneBy({ postId: postId });
        if (!found)
            return res.status(410).json('Product not found');
        yield repository.softDelete({ postId: postId });
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const restore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.id);
        const found = yield repository.findOne({ where: { postId: postId, deletedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) }, withDeleted: true, });
        if (!found)
            return res.status(410).json('Product not found');
        yield repository.restore({ postId: postId });
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const getDeleted = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield repository.find({ withDeleted: true, where: { deletedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) }, relations: ['category'], order: { deletedAt: 'DESC' } });
        if (products.length === 0) {
            return res.status(204).send({
                error: "No content",
            });
        }
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const hardDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.id);
        const product = yield repository.findOne({ withDeleted: true, where: { postId: postId, deletedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } });
        if (!product)
            return res.sendStatus(410);
        yield repository.delete({ postId: postId });
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const checkProductUnique = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, ignore, field } = req.query;
    if (ignore && ignore == value) {
        return res.sendStatus(200);
    }
    try {
        const check = yield (0, checkUnique_1.default)(post_entity_1.Post, `${field}`, value);
        check ? res.sendStatus(200) : res.sendStatus(400);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const getByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        const searchCondition = search ? { name: (0, typeorm_1.Like)(`%${search}%`) } : {};
        const { categoryId } = req.params;
        const products = yield repository.find({ where: Object.assign({ statusId: 41, categoryId: parseInt(categoryId) }, searchCondition), relations: ['images', 'category', 'supplier', 'status', 'productSizes.size'], order: { createdAt: 'DESC' } });
        if (products.length === 0) {
            return res.status(204).send({
                error: "No content",
            });
        }
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const client = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        const searchCondition = search ? { name: (0, typeorm_1.Like)(`%${search}%`) } : {};
        const products = yield repository.find({ where: Object.assign({ statusId: 41 }, searchCondition), relations: ['category'], order: { createdAt: 'DESC' } });
        if (products.length === 0) {
            return res.status(204).send({
                error: "No content",
            });
        }
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = { getAll, getById, create, update, softDelete, restore, hardDelete, getDeleted, checkProductUnique, getByCategory, client };
