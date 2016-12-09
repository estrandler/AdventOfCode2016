"use strict";
var fs = require('fs');
var Level9 = (function () {
    function Level9() {
        var self = this;
        fs.readFile('src/LevelNine/LevelNineInput.txt', "utf8", function (err, data) {
            data = data.replace(' ', '');
            var part1 = self.readData(data);
            console.log('Result 1:', part1.length);
            var part2 = self.readDataRecursive(data);
            console.log('Result 2:', part2);
        });
    }
    Level9.prototype.readDataRecursive = function (data) {
        var length = data.length;
        for (var i = 0; i < data.length; i++) {
            var char = data[i];
            if (char !== '(')
                continue;
            var rest = data.substring(i);
            var values = data.substring(i + 1, i + rest.indexOf(')'));
            var stringLengthToDecompress = parseInt(values.split('x')[0]);
            var numberOfTimesToDecompress = parseInt(values.split('x')[1]);
            var startIdx = i + rest.indexOf(')') + 1;
            var matchstring = data.substr(startIdx, stringLengthToDecompress);
            var subLength = this.readDataRecursive(matchstring);
            length += subLength * numberOfTimesToDecompress - matchstring.length - (values.length + 2);
            i = startIdx + matchstring.length - 1;
        }
        return length;
    };
    Level9.prototype.readData = function (data) {
        var decompressed = '';
        var stringLengthToDecompress = 0;
        var numberOfTimesToDecompress = 0;
        var i = 0;
        while (i < data.length) {
            var char = data[i];
            if (char === '(') {
                var rest = data.substring(i);
                var values = data.substring(i + 1, i + rest.indexOf(')'));
                stringLengthToDecompress = parseInt(values.split('x')[0]);
                numberOfTimesToDecompress = parseInt(values.split('x')[1]);
                var newString = rest.substr(rest.indexOf(')') + 1, stringLengthToDecompress);
                for (var j = 0; j < numberOfTimesToDecompress; j++)
                    decompressed += newString;
                i = i + values.length + stringLengthToDecompress + 2;
            }
            else {
                decompressed += char;
                i++;
            }
        }
        return decompressed;
    };
    return Level9;
}());
var lvl = new Level9();
//# sourceMappingURL=LevelNine.js.map