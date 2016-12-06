import fs = require('fs');

class Level6 {
mainArr: any[] = [];


    constructor() {
          var self = this;
          for(var i = 0; i < 8; i++){
            this.mainArr.push([]);
          }

        fs.readFile('src/LevelSix/LevelSixInput.txt', "utf8", function(err, data) {
                var splitted = data.split('\r\n');

                self.parseCharactersIntoRows(splitted);
                self.sortByVal();

                self.logResult();
        })
    }

    logResult(): void {
        var output = '';

        for(var i = 0; i < this.mainArr.length; i++){
            output += this.mainArr[i][0].char;
        }

        console.log('Result:', output);

    }

    sortByVal() :void {
        for(var i = 0; i < this.mainArr.length; i++){
            this.mainArr[i] = this.mainArr[i].sort(function(a, b){
                return b.value - a.value;
            })

        }

    }

    parseCharactersIntoRows(input: any): void {
        for(var i = 0; i < input.length; i++){
            for(var rowIdx = 0; rowIdx < this.mainArr.length; rowIdx++){
                var char = input[i][rowIdx];
                var isInArr = false;
                var isInArrIdx = 0;

                for(var j = 0; j < this.mainArr[rowIdx].length; j++){
                    if(this.mainArr[rowIdx][j].char === char){
                            isInArr = true;
                            isInArrIdx = j;
                            console.log('arrinindex', this.mainArr[rowIdx][j].char === char)
                        }
                }

                if(isInArr){
                    console.log('isinarr', this.mainArr[rowIdx][isInArrIdx]);
                    this.mainArr[rowIdx][isInArrIdx].value++;
                } else {
                    this.mainArr[rowIdx].push({
                        char: char,
                        value: 0
                    });
                }
            }
        }   
    }
}

var lvl = new Level6();