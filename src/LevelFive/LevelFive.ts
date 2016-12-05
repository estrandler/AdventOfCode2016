import crypto = require('crypto');
import fs = require('fs');


class Level5 {
    private input: string = 'ugkcyxxp';
    private password: string = '';

    constructor(){
        var i = 0;
        while(this.password.length < 8) {
            var next = crypto.createHash('md5').update(this.input + i).digest('hex');
            i++;
            if(next.slice(0, 5) === '00000') {
                this.password += next[5];
            }
        }

        console.log('Password:', this.password);
    }
}

class Level5_b {
    private input: string = 'ugkcyxxp';
    private password: string[] = ['','','','','','','', '']

    constructor(){
        var i = 0;
        var numberFound = 0;
        while(numberFound < 8) {
            var next = crypto.createHash('md5').update(this.input + i).digest('hex');
            i++;
            if(next.slice(0, 5) === '00000') {
                try{
                    var idx = parseInt(next[5]);

                    if(idx < 8 && !isNaN(idx)) {
                        if(this.password[idx] == ''){
                            this.password[idx] = next[6];
                            numberFound++;
                        }
                    }
                } catch (e){}
            }
        }

        console.log('Password:', this.password.join(''));
    }
}

console.log('Day Five!');
var lvl1 = new Level5();
var lvl = new Level5_b();

