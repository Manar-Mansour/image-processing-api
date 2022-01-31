"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This function checks if the input string contains only digits
var isDigitsOnly = function (x) {
    return parseFloat(x).toString() === x;
};
exports.default = isDigitsOnly;
