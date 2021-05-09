"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../task/app"));
var mock_1 = require("./mock");
describe("Test for function structure", function () {
    it("Returns an object for even distro", function () {
        var expected = app_1.default(50, 1);
        expect(typeof expected).toBe('object');
    });
    it("checks that the function is called with 2 arguments", function () {
        var expected = app_1.default.length;
        expect(expected).toBe(2);
    });
});
describe("Test for function expected value", function () {
    it("Returns evenly distributed values for boarded", function () {
        var expected = app_1.default(50, 1);
        expect(expected.boarded.length % 5).toEqual(0);
    });
    it("Returns reservation list for uneven distro", function () {
        var expected = app_1.default(4, 1);
        expect(expected.reservation.length % 5).toBe(4);
    });
    it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", function () {
        var expected = app_1.default(60, 0);
        expect(expected.boarded.length).toEqual(50);
    });
});
describe("test for shuffle", function () {
    it("Single shuffle works ", function () {
        var expected = app_1.default(105, 1);
        expect(expected.count).toEqual(2);
    });
    it("first multiple shuffle works ", function () {
        var expected = app_1.default(155, 2);
        expect(expected.count).toEqual(3);
    });
    it("second multiple shuffle works ", function () {
        var expected = app_1.default(209, 3);
        expect(expected.count).toEqual(4);
    });
    it("third multiple shuffle works ", function () {
        var expected = app_1.default(259, 4);
        expect(expected.count).toEqual(5);
    });
});
describe("test for boarded value with passengers of 50 and shuffle 0", function () {
    var passengers = 50;
    var shuffle = 0;
    var expected = app_1.default(passengers, shuffle);
    expect(expected.boarded).toStrictEqual(mock_1.prefilled);
});
