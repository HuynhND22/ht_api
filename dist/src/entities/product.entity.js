"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const category_entity_1 = require("./category.entity");
const image_entity_1 = require("./image.entity");
const supplier_entity_1 = require("./supplier.entity");
const status_entity_1 = require("./status.entity");
const productSize_entity_1 = require("./productSize.entity");
let Product = class Product extends typeorm_1.BaseEntity {
    // HOOKS (AUTO VALIDATE)
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ primaryKeyConstraintName: 'productId' }),
    __metadata("design:type", Number)
], Product.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', default: () => "GETUTCDATE()" }),
    __metadata("design:type", String)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", default: () => "GETUTCDATE()", nullable: true, onUpdate: "GETUTCDATE()" }),
    __metadata("design:type", String)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (c) => c.products),
    (0, typeorm_1.JoinColumn)({
        name: 'categoryId',
    }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (s) => s.products),
    (0, typeorm_1.JoinColumn)({
        name: 'supplierId',
    }),
    __metadata("design:type", supplier_entity_1.Supplier)
], Product.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (i) => i.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productSize_entity_1.ProductSize, (s) => s.product),
    __metadata("design:type", Array)
], Product.prototype, "productSizes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => status_entity_1.Status, (c) => c.products),
    (0, typeorm_1.JoinColumn)({
        name: "statusId",
        referencedColumnName: 'statusId'
    }),
    __metadata("design:type", status_entity_1.Status)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Product.prototype, "validate", null);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'Products' })
], Product);
exports.Product = Product;
