"use strict";
var fs = require('fs');
console.log('DayTwo!');
var Level2 = (function () {
    function Level2(shouldSolvePlus) {
        //Part one
        this.row1 = [1, 2, 3];
        this.row2 = [4, 5, 6];
        this.row3 = [7, 8, 9];
        this.x = 1;
        this.y = 1;
        this.minIndex = 0;
        this.maxIndex = 2;
        this.grid = [this.row1, this.row2, this.row3];
        //Part two
        this.row1_plus = [0, 0, 1, 0, 0];
        this.row2_plus = [0, 2, 3, 4, 0];
        this.row3_plus = [5, 6, 7, 8, 9];
        this.row4_plus = [0, 'A', 'B', 'C', 0];
        this.row5_plus = [0, 0, 'D', 0, 0];
        this.x_plus = 0;
        this.y_plus = 2;
        this.minIndex_plus = 0;
        this.maxIndex_plus = 4;
        this.grid_plus = [this.row1_plus, this.row2_plus, this.row3_plus, this.row4_plus, this.row5_plus];
        //Common
        this.Left = 'L';
        this.Right = 'R';
        this.Up = 'U';
        this.Down = 'D';
        this.code = '';
        if (!shouldSolvePlus)
            this.solve();
        else
            this.solvePlus();
    }
    Level2.prototype.solvePlus = function () {
        var self = this;
        fs.readFile('src/LevelTwo/LevelTwoInput.txt', "utf8", function (err, data) {
            var rows = data.split('\n');
            for (var j = 0; j < rows.length; j++) {
                for (var i = 0; i < rows[j].length; i++) {
                    var instruction = rows[j][i];
                    if (instruction == self.Left)
                        self.moveleft_plus();
                    else if (instruction == self.Right)
                        self.moveright_plus();
                    else if (instruction == self.Up)
                        self.moveup_plus();
                    else if (instruction == self.Down)
                        self.movedown_plus();
                }
                self.code += self.grid_plus[self.y_plus][self.x_plus];
            }
            console.log('Level2_plus:');
            console.log('Result:', self.code);
        });
    };
    Level2.prototype.moveup_plus = function () {
        var yAfterMove = this.y_plus - 1;
        if (yAfterMove >= this.minIndex_plus && this.grid_plus[yAfterMove][this.x_plus] !== 0) {
            this.y_plus = yAfterMove;
        }
    };
    Level2.prototype.movedown_plus = function () {
        var yAfterMove = this.y_plus + 1;
        if (yAfterMove <= this.maxIndex_plus && this.grid_plus[yAfterMove][this.x_plus] !== 0) {
            this.y_plus = yAfterMove;
        }
    };
    Level2.prototype.moveleft_plus = function () {
        var xAfterMove = this.x_plus - 1;
        if (xAfterMove >= this.minIndex_plus && this.grid_plus[this.y_plus][xAfterMove] !== 0) {
            this.x_plus = xAfterMove;
        }
    };
    Level2.prototype.moveright_plus = function () {
        var xAfterMove = this.x_plus + 1; //this.x_plus + 1;
        if (xAfterMove <= this.maxIndex_plus && this.grid_plus[this.y_plus][xAfterMove] !== 0) {
            this.x_plus = xAfterMove;
        }
    };
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
            console.log('Level2:');
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
var lvl = new Level2(false);
var lvl_plus = new Level2(true);
//# sourceMappingURL=LevelTwo.js.map