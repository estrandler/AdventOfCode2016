"use strict";
var fs = require('fs');
console.log('DayTwo!');
var Level2 = (function () {
    function Level2() {
        this.row1 = [1, 2, 3];
        this.row2 = [4, 5, 6];
        this.row3 = [7, 8, 9];
        this.x = 1;
        this.y = 1;
        this.minIndex = 0;
        this.maxIndex = 2;
        this.grid = [this.row1, this.row2, this.row3];
        this.Left = 'L';
        this.Right = 'R';
        this.Up = 'U';
        this.Down = 'D';
        this.code = '';
        this.solve();
    }
    Level2.prototype.solve = function () {
        var self = this;
        fs.readFile('src/LevelTwo/LevelTwoInput.txt', "utf8", function (err, data) {
            var rows = data.split('\n');
            for (var j = 0; j < rows.length; j++) {
                for (var i = 0; i < rows[j].length; i++) {
                    var instruction = rows[j][i];
                    if (instruction == self.Left)
                        self.moveleft();
                    else if (instruction == self.Right)
                        self.moveright();
                    else if (instruction == self.Up)
                        self.moveup();
                    else if (instruction == self.Down)
                        self.movedown();
                }
                self.code += self.grid[self.y][self.x];
            }
            console.log('Result:', self.code);
        });
    };
    Level2.prototype.moveup = function () {
        if (this.y > this.minIndex)
            this.y--;
    };
    Level2.prototype.movedown = function () {
        if (this.y < this.maxIndex)
            this.y++;
    };
    Level2.prototype.moveleft = function () {
        if (this.x > this.minIndex)
            this.x--;
    };
    Level2.prototype.moveright = function () {
        if (this.x < this.maxIndex)
            this.x++;
    };
    return Level2;
}());
var lvl = new Level2();
//# sourceMappingURL=LevelTwo.js.map