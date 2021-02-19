"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rocket_details_1 = require("./rocket-details");
test("timeConverterRockets", function () {
    expect(rocket_details_1.timeConverterRockets(1603553460)).toBe("24 Oct 2020");
});
