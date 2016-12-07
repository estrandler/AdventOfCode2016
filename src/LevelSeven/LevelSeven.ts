import fs = require('fs');

class Level7 {
    counter: number = 0;
    counterSSL : number = 0;

    constructor() {
          var self = this;
          

        fs.readFile('src/LevelSeven/LevelSevenInput.txt', "utf8", function(err, data) {
            var splitted = data.split('\r\n');

                self.createAbbas(splitted);

                console.log('Result:', self.counter);
                console.log('Result2:', self.counterSSL);
        })
    }

    createAbbas(splitted: string[]){
        for(var i = 0; i < splitted.length; i++){
            var abba = new ABBA(splitted[i]);

            if(abba.supportsTLS())
                this.counter++;

            if(abba.supportsSSL())
                this.counterSSL++;
        }
    }

}

class ABBA {
    private partsNotInClams: string[] = [];
    private partsInClams: string[] = [];

    private abaArrInClams: string[] = [];
    private abaArrNotInClams: string[] = [];


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

    supportsSSL() : boolean {
        this.abaArrInClams = this.getABAs(this.partsInClams);

        if(this.abaArrInClams.length === 0)
            return false;

        this.abaArrNotInClams = this.getABAs(this.partsNotInClams);

        if (this.abaArrNotInClams.length === 0)
            return false;

        return this.compareABAs();
    }

    compareABAs() : boolean {
        for(var i = 0; i < this.abaArrInClams.length; i++){
            var aba = this.abaArrInClams[i];

            for(var j = 0; j < this.abaArrNotInClams.length; j++) {
                var outsideAba = this.abaArrNotInClams[j];

                if(aba[0] === outsideAba[1] && aba[1] === outsideAba[0])
                    return true;
            }
        }

        return false;
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

    getABAs(inputArr: string[]) : string[] {
        var output = [];
        
        for(var j = 0; j < inputArr.length; j++){
            var input = inputArr[j];

            for(var i = 0; i < input.length - 2; i++){
                var current = input.substr(i, 3);

                if(current[0] === current[2] && current[0] !== current[1]){
                    output.push(current);
                }
            }
        }

        return output;
    }
}


var lvl = new Level7();