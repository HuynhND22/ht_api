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
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("./product.entity");
const ward_entity_1 = require("./ward.entity");
let Supplier = class Supplier extends typeorm_1.BaseEntity {
    // HOOKS (AUTO VALIDATE)
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ primaryKeyConstraintName: 'supplierId' }),
    __metadata("design:type", Number)
], Supplier.prototype, "supplierId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 255 }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'nvarchar', length: 255 }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'nvarchar', length: 15, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Supplier.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Supplier.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', default: () => "GETUTCDATE()" }),
    __metadata("design:type", String)
], Supplier.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", default: () => "GETUTCDATE()", nullable: true, onUpdate: "GETUTCDATE()" }),
    __metadata("design:type", String)
], Supplier.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (p) => p.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ward_entity_1.Ward, (w) => w.suppliers),
    (0, typeorm_1.JoinColumn)({
        name: 'wardId',
        referencedColumnName: 'wardId'
    }),
    __metadata("design:type", ward_entity_1.Ward)
], Supplier.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Supplier.prototype, "validate", null);
Supplier = __decorate([
    (0, typeorm_1.Entity)({ name: 'Supplier' })
], Supplier);
exports.Supplier = Supplier;
