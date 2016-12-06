"use strict";
var fs = require('fs');
var Level6 = (function () {
    function Level6() {
        this.mainArr = [];
        var self = this;
        for (var i = 0; i < 8; i++) {
            this.mainArr.push([]);
        }
        fs.readFile('src/LevelSix/LevelSixInput.txt', "utf8", function (err, data) {
            var splitted = data.split('\r\n');
            self.parseCharactersIntoRows(splitted);
            self.sortByVal();
            self.logResult();
        });
    }
    Level6.prototype.logResult = function () {
        var output = '';
        for (var i = 0; i < this.mainArr.length; i++) {
            output += this.mainArr[i][0].char;
        }
        console.log('Result:', output);
    };
    Level6.prototype.sortByVal = function () {
        for (var i = 0; i < this.mainArr.length; i++) {
            this.mainArr[i] = this.mainArr[i].sort(function (a, b) {
                return b.value - a.value;
            });
        }
    };
    Level6.prototype.parseCharactersIntoRows = function (input) {
        for (var i = 0; i < input.length; i++) {
            for (var rowIdx = 0; rowIdx < this.mainArr.length; rowIdx++) {
                var char = input[i][rowIdx];
                var isInArr = false;
                var isInArrIdx = 0;
                for (var j = 0; j < this.mainArr[rowIdx].length; j++) {
                    if (this.mainArr[rowIdx][j].char === char) {
                        isInArr = true;
                        isInArrIdx = j;
                        console.log('arrinindex', this.mainArr[rowIdx][j].char === char);
                    }
                }
                if (isInArr) {
                    console.log('isinarr', this.mainArr[rowIdx][isInArrIdx]);
                    this.mainArr[rowIdx][isInArrIdx].value++;
                }
                else {
                    this.mainArr[rowIdx].push({
                        char: char,
                        value: 0
                    });
                }
            }
        }
    };
    return Level6;
}());
var lvl = new Level6();
//# sourceMappingURL=LevelSix.js.map