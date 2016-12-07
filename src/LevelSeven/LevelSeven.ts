import fs = require('fs');

class Level7 {
    counter: number = 0;

    constructor() {
          var self = this;
          

        fs.readFile('src/LevelSeven/LevelSevenInput.txt', "utf8", function(err, data) {
            var splitted = data.split('\r\n');

                self.createAbbas(splitted);

                console.log('Result:', self.counter);
        })
    }

    createAbbas(splitted: string[]){
        for(var i = 0; i < splitted.length; i++){
            var abba = new ABBA(splitted[i]);

            if(abba.supportsTLS())
                this.counter++;
        }
    }

}

class ABBA {
    private partsNotInClams: string[] = [];
    private partsInClams: string[] = [];

    constructor(unparsedString) {
        var isInClams = false;
        var currentString = '';

        for(var i = 0; i < unparsedString.length; i++){
            var char = unparsedString[i];
            var last = (i == unparsedString.length - 1);

            if(char === '[' || char === ']' || last){
                if(isInClams){
                    currentString = last ? currentString += char : currentString;
                    this.partsInClams.push(currentString);
                    currentString = '';
                    }
                else {
                    currentString = last ? currentString += char : currentString;
                    this.partsNotInClams.push(currentString);
                    currentString = '';
                }
                isInClams = !isInClams; 
            } else {
                currentString += char;
            }
        }
    }

    supportsTLS() : boolean {
        for(var i = 0; i < this.partsInClams.length; i++){
            if(this.hasABBA(this.partsInClams[i])){
                return false;
            }
        }

        for(var i = 0; i < this.partsNotInClams.length; i++){
            if(this.hasABBA(this.partsNotInClams[i])){
                return true;
            }
        }

        return false;
    }

    hasABBA(input: string) : boolean {
        for(var i = 0; i < input.length - 3; i++){
            var current = input.substr(i, 4);
            var reversed = current.split('').reverse().join('');

            if(current === reversed && current[0] !== current[1]){
                return true;
            }
        }
        return false;
    }
}


var lvl = new Level7();