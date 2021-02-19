"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contact_1 = require("./contact");
test("test if string is empty", function () {
    expect(contact_1.validateNotEmpty(" ")).toBe(false);
});
test("test if valid email", function () {
    expect(contact_1.validateEmail("daniel@daniel.no")).toBe(true);
});
test("validate Length", function () {
    expect(contact_1.validateLength("Hallo World")).toBe(true);
});
