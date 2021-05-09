"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskOne = function (passengers, shuffle) {
    var location = ['Abuja', 'Sambisa', 'Lagos', 'Jos', 'Enugu'];
    var boardedArr = [];
    var reserveArr = [];
    var count = 0;
    var passengersList = Array.from({ length: passengers }).map(function (p, index) { return ({
        name: "" + ("passenger" + (index + 1)),
        location: "" + location[index % 5],
    }); });
    //@desc for passengers less than 5
    if (passengers < 5) {
        reserveArr = passengersList;
        console.log(reserveArr);
    }
    //@desc for passengers less than or equal to 50
    if (passengers <= 50) {
        if (passengers % 5 == 0) {
            boardedArr = passengersList;
            console.log(boardedArr);
            count++;
        }
        else {
            var reservePassengers = passengers % 5;
            var value = passengers - reservePassengers;
            boardedArr = passengersList.splice(0, value);
            count++;
            reserveArr = passengersList;
        }
    }
    //@desc for passengers greater than 50
    else {
        while (shuffle >= 0 && passengersList.length > 49) {
            if (shuffle == 0) {
                boardedArr = passengersList.splice(0, 50);
                reserveArr = passengersList;
                count++;
            }
            else {
                boardedArr = passengersList.splice(0, 50);
                count++;
                if (passengersList.length < 50 && shuffle > 0) {
                    if (passengersList.length < 5) {
                        reserveArr = passengersList;
                    }
                    else {
                        var remainder = passengersList.length - (passengersList.length % 5);
                        boardedArr = passengersList.splice(0, remainder);
                        count++;
                        reserveArr = passengersList;
                    }
                }
            }
            shuffle--;
        }
    }
    return {
        boarded: boardedArr,
        reservation: reserveArr,
        count: count
    };
};
exports.default = taskOne;
