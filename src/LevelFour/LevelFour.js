"use strict";
var fs = require('fs');
var Level4 = (function () {
    function Level4() {
        this.count = 0;
        this.validEncryptions = [];
        var self = this;
        fs.readFile('src/LevelFour/LevelFourInput.txt', "utf8", function (err, data) {
            var splitted = data.split('\r\n');
            for (var i = 0; i < splitted.length; i++) {
                var Encryption = new EncryptedName(splitted[i]);
                if (Encryption.IsValid()) {
                    self.count = self.count + Encryption.CheckSum;
                    self.validEncryptions.push(Encryption);
                }
            }
            console.log('Resultat:', self.count);
            /*Part two*/
            self.validEncryptions.forEach(function (encryption) {
                var deciphered = encryption.Decipher();
                if (deciphered.indexOf('northpole') == 0) {
                    console.log('Result part 2:', encryption.CheckSum);
                }
            });
        });
    }
    return Level4;
}());
var EncryptedName = (function () {
    function EncryptedName(encryptedString) {
        this.Keys = '';
        this.encryptedString = encryptedString;
        this.parseEncryptedString();
    }
    EncryptedName.prototype.parseEncryptedString = function () {
        var splitted = this.encryptedString.split('-');
        for (var i = 0; i < splitted.length; i++) {
            var last = i == (splitted.length - 1);
            if (!last) {
                this.Keys += splitted[i];
            }
            else {
                var newSplit = splitted[i].split('[');
                this.CheckSum = parseInt(newSplit[0]);
                this.Encryption = newSplit[1].substring(0, newSplit[1].length - 1);
            }
        }
    };
    EncryptedName.prototype.Decipher = function () {
        var output = '';
        var numberOfSteps = this.CheckSum;
        var stringToRotate = this.encryptedString.substring(0, this.encryptedString.lastIndexOf('-')).toLowerCase();
        for (var i = 0; i < stringToRotate.length; i++) {
            output += this.rotateThroughKeymap(stringToRotate[i], numberOfSteps);
            ;
        }
        return output;
    };
    EncryptedName.prototype.rotateThroughKeymap = function (stringToRotate, numberOfSteps) {
        var keyMap = 'abcdefghijklmnopqrstuvwxyz';
        var startIdx = keyMap.indexOf(stringToRotate);
        var stopIdx = startIdx;
        if (stringToRotate === '-')
            return ' ';
        for (var i = 0; i < numberOfSteps; i++) {
            stopIdx++;
            if (stopIdx > keyMap.length - 1)
                stopIdx = 0;
        }
        return keyMap[stopIdx];
    };
    EncryptedName.prototype.IsValid = function () {
        var arr = [];
        for (var i = 0; i < this.Keys.length; i++) {
            var isInArr = false;
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].char === this.Keys[i]) {
                    arr[j].value++;
                    isInArr = true;
                }
            }
            if (!isInArr) {
                arr.push({
                    char: this.Keys[i],
                    value: 0
                });
            }
        }
        arr = arr.sort(function (a, b) {
            if (a.value < b.value)
                return 1;
            else if (a.value > b.value)
                return -1;
            else {
                if (a.char > b.char)
                    return 1;
                else if (a.char < b.char)
                    return -1;
                else
                    return 0;
            }
        });
        for (var i = 0; i < this.Encryption.length; i++) {
            if (arr[i].char !== this.Encryption[i]) {
                return false;
            }
        }
        return true;
    };
    return EncryptedName;
}());
console.log('DayFour!!');
var lvl = new Level4();
//# sourceMappingURL=LevelFour.js.map