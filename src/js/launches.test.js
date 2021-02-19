"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var launches_1 = require("./launches");
test("timeConverter", function () {
    expect(launches_1.timeConverter(1603553460)).toBe("24 Oct 2020");
});
