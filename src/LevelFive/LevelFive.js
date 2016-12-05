"use strict";
var crypto = require('crypto');
var Level5 = (function () {
    function Level5() {
        this.input = 'ugkcyxxp';
        this.password = '';
        var i = 0;
        while (this.password.length < 8) {
            var next = crypto.createHash('md5').update(this.input + i).digest('hex');
            i++;
            if (next.slice(0, 5) === '00000') {
                this.password += next[5];
            }
        }
        console.log('Password:', this.password);
    }
    return Level5;
}());
var Level5_b = (function () {
    function Level5_b() {
        this.input = 'ugkcyxxp';
        this.password = ['', '', '', '', '', '', '', ''];
        var i = 0;
        var numberFound = 0;
        while (numberFound < 8) {
            var next = crypto.createHash('md5').update(this.input + i).digest('hex');
            i++;
            if (next.slice(0, 5) === '00000') {
                try {
                    var idx = parseInt(next[5]);
                    if (idx < 8 && !isNaN(idx)) {
                        if (this.password[idx] == '') {
                            this.password[idx] = next[6];
                            numberFound++;
                        }
                    }
                }
                catch (e) { }
            }
        }
        console.log('Password:', this.password.join(''));
    }
    return Level5_b;
}());
console.log('Day Five!');
var lvl1 = new Level5();
var lvl = new Level5_b();
//# sourceMappingURL=LevelFive.js.map