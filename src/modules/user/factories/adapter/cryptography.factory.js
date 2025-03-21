"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCryptographyUserAdapter = void 0;
var cryptography_user_adapter_1 = require("@/modules/user/adapter/cryptography-user.adapter");
var makeCryptographyUserAdapter = function () {
    return new cryptography_user_adapter_1.CryptographyUserAdapter();
};
exports.makeCryptographyUserAdapter = makeCryptographyUserAdapter;
