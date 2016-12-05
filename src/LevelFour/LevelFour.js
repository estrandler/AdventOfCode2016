"use strict";
var fs = require('fs');
var Level4 = (function () {
    function Level4() {
        var self = this;
        fs.readFile('src/LevelFour/LevelFourInput.txt', "utf8", function (err, data) {
            var splitted = data.split('\r\n');
            for (var i = 0; i < splitted.length; i++) {
                var Encryption = new EncryptedName(splitted[i]);
            }
        });
    }
    return Level4;
}());
var EncryptedName = (function () {
    function EncryptedName(encryptedString) {
        this.Keys = [];
        this.encryptedString = encryptedString;
        this.parseEncryptedString();
    }
    EncryptedName.prototype.parseEncryptedString = function () {
        var splitted = this.encryptedString.split('-');
        for (var i = 0; i < splitted.length; i++) {
            var last = i == (splitted.length - 1);
            if (!last) {
                this.Keys.push(splitted[i]);
            }
            else {
                var newSplit = splitted[i].split('[');
                this.CheckSum = parseInt(newSplit[0]);
                this.Encryption = newSplit[1].substring(0, newSplit[1].length - 1);
            }
        }
        console.log(this);
    };
    EncryptedName.prototype.IsValid = function () {
        return true;
    };
    return EncryptedName;
}());
console.log('DayFour!!');
var lvl = new Level4();
//# sourceMappingURL=LevelFour.js.map