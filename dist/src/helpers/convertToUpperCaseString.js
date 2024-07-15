"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUpperCaseString = void 0;
const convertToUpperCaseString = (str) => {
    let simpleString = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    simpleString = simpleString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return simpleString.replace(/\s+/g, ' ').trim().toUpperCase();
};
exports.convertToUpperCaseString = convertToUpperCaseString;
