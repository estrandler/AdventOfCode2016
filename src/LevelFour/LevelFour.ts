import fs = require('fs');

class Level4 {


    constructor() {
        var self = this;
        fs.readFile('src/LevelFour/LevelFourInput.txt', "utf8", function(err, data) {
                var splitted = data.split('\r\n');
                

            for(var i = 0; i < splitted.length; i++){
                var Encryption = new EncryptedName(splitted[i]);
            }
        })
    }
}

class EncryptedName {
    private Keys: string[] = [];
    private Encryption: string;

    private encryptedString: string;

    public CheckSum: number;

    constructor(encryptedString: string){

        this.encryptedString = encryptedString;
        this.parseEncryptedString();
    }

    private parseEncryptedString() {
        var splitted = this.encryptedString.split('-');

        for(var i = 0; i < splitted.length; i++){
            var last = i == (splitted.length - 1);

            if(!last){
                this.Keys.push(splitted[i]);
            } else {
                var newSplit = splitted[i].split('[');

                this.CheckSum = parseInt(newSplit[0]);
                this.Encryption = newSplit[1].substring(0, newSplit[1].length - 1);
            }
        }

        console.log(this);
    }

    public IsValid() : boolean {
        return true;
    }
}



console.log('DayFour!!');
var lvl = new Level4();