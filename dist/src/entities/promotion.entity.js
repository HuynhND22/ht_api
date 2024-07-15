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
exports.Promotion = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const cart_entity_1 = require("./cart.entity");
const status_entity_1 = require("./status.entity");
const orderDetail_entity_1 = require("./orderDetail.entity");
const promotionDetail_entity_1 = require("./promotionDetail.entity");
let Promotion = class Promotion extends typeorm_1.BaseEntity {
    // HOOKS (AUTO VALIDATE)
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'promotionId' }),
    __metadata("design:type", Number)
], Promotion.prototype, "promotionId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Promotion.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, typeorm_1.Check)('"limit" > 0'),
    __metadata("design:type", Number)
], Promotion.prototype, "limit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, typeorm_1.Check)('"price" > 0'),
    __metadata("design:type", Number)
], Promotion.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => "GETUTCDATE()" }),
    __metadata("design:type", String)
], Promotion.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => "GETUTCDATE()" }),
    (0, typeorm_1.Check)(`"endDate" >= "startDate"`),
    __metadata("design:type", String)
], Promotion.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", String)
], Promotion.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', default: () => "GETUTCDATE()" }),
    __metadata("design:type", String)
], Promotion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", default: () => "GETUTCDATE()", nullable: true, onUpdate: "GETUTCDATE()" }),
    __metadata("design:type", String)
], Promotion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", String)
], Promotion.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetail_entity_1.OrderDetail, (od) => od.promotion),
    __metadata("design:type", Array)
], Promotion.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => status_entity_1.Status, (s) => s.promotions),
    (0, typeorm_1.JoinColumn)({
        name: "statusId",
        referencedColumnName: 'statusId'
    }),
    __metadata("design:type", status_entity_1.Status)
], Promotion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => promotionDetail_entity_1.PromotionDetail, (pd) => pd.promotion),
    __metadata("design:type", Array)
], Promotion.prototype, "promotionDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (c) => c.promotion),
    __metadata("design:type", Array)
], Promotion.prototype, "carts", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Promotion.prototype, "validate", null);
Promotion = __decorate([
    (0, typeorm_1.Entity)({ name: 'Promotions' })
], Promotion);
exports.Promotion = Promotion;
