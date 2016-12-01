"use strict";
var fs = require('fs');
var LevelOne = (function () {
    function LevelOne() {
    }
    LevelOne.prototype.solve = function () {
        var position = new Position();
        fs.readFile('src/LevelOneInput.txt', "utf8", function (err, data) {
            var splitted = data.split(', ');
            for (var i = 0; i < splitted.length; i++) {
                var numberOfSteps = parseInt(splitted[i].substr(1));
                position.move(splitted[i][0], numberOfSteps);
            }
            var resultX = Math.abs(position.x);
            var resultY = Math.abs(position.y);
            console.log('Resultat:', resultX + resultY);
            console.log('Resultat Goldstar:', position.getFirstDoublePosition());
        });
    };
    return LevelOne;
}());
var Position = (function () {
    function Position() {
        this.x = 0;
        this.y = 0;
        this.currentDirection = 'north';
        this.visitedPositions = [];
    }
    Position.prototype.getFirstDoublePosition = function () {
        var temp = [];
        var firstDouble;
        for (var i = 0; i < this.visitedPositions.length; i++) {
            var position = this.visitedPositions[i];
            if (temp.indexOf(position) !== -1) {
                firstDouble = position;
                break;
            }
            else {
                temp.push(position);
            }
        }
        return parseInt(firstDouble.split(',')[0]) + parseInt(firstDouble.split(',')[1]);
    };
    Position.prototype.getPositionString = function () {
        return Math.abs(this.x).toString() + ',' + Math.abs(this.y).toString();
    };
    Position.prototype.move = function (turn, length) {
        if (turn == 'R')
            this.turnRight(length);
        else
            this.turnLeft(length);
    };
    Position.prototype.turnRight = function (number) {
        var xBefore = this.x;
        var yBefore = this.y;
        switch (this.currentDirection) {
            case 'north':
                {
                    this.currentDirection = 'east';
                    this.x += number;
                    for (var i = xBefore; i < this.x; i++) {
                        var locationString = i + ',' + this.y;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
            case 'east':
                {
                    this.currentDirection = 'south';
                    this.y -= number;
                    for (var i = this.y; i > yBefore; i--) {
                        var locationString = this.x + ',' + i;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
            case 'south':
                {
                    this.currentDirection = 'west';
                    this.x -= number;
                    for (var i = this.x; i > xBefore; i--) {
                        var locationString = i + ',' + this.y;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
            case 'west':
                {
                    this.currentDirection = 'north';
                    this.y += number;
                    for (var i = yBefore; i < this.y; i++) {
                        var locationString = this.x + ',' + i;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
        }
    };
    Position.prototype.turnLeft = function (number) {
        var xBefore = this.x;
        var yBefore = this.y;
        switch (this.currentDirection) {
            case 'north':
                {
                    this.currentDirection = 'west';
                    this.x = this.x - number;
                    for (var i = xBefore; i > this.x; i--) {
                        var locationString = i + ',' + this.y;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
            case 'east':
                {
                    this.currentDirection = 'north';
                    this.y = this.y + number;
                    for (var i = yBefore; i < this.y; i++) {
                        var locationString = this.x + ',' + i;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
            case 'south':
                {
                    this.currentDirection = 'east';
                    this.x = this.x + number;
                    for (var i = xBefore; i < this.x; i++) {
                        var locationString = i + ',' + this.y;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
            case 'west':
                {
                    this.currentDirection = 'south';
                    this.y = this.y - number;
                    for (var i = yBefore; i > this.y; i--) {
                        var locationString = this.x + ',' + i;
                        this.visitedPositions.push(locationString);
                    }
                    break;
                }
        }
    };
    return Position;
}());
var levelone = new LevelOne();
levelone.solve();
//# sourceMappingURL=LevelOne.js.map