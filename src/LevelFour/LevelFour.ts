import fs = require('fs');

class Level4 {
    count: number = 0;
    validEncryptions: EncryptedName[] = [];

    constructor() {
        var self = this;
        fs.readFile('src/LevelFour/LevelFourInput.txt', "utf8", function(err, data) {
                var splitted = data.split('\r\n');             

            for(var i = 0; i < splitted.length; i++){
                var Encryption = new EncryptedName(splitted[i]);

                if(Encryption.IsValid()){
                    self.count = self.count + Encryption.CheckSum;
                    self.validEncryptions.push(Encryption);
                  } 
           }

           console.log('Resultat:', self.count);

           /*Part two*/
           self.validEncryptions.forEach(encryption => {
               
               var deciphered = encryption.Decipher();

               if(deciphered.indexOf('northpole') == 0 ){
                    console.log('Result part 2:', encryption.CheckSum);
                }
               
           });
        })

    }
}

class EncryptedName {
    private Keys: string = '';
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
                this.Keys += splitted[i];
            } else {
                var newSplit = splitted[i].split('[');

                this.CheckSum = parseInt(newSplit[0]);
                this.Encryption = newSplit[1].substring(0, newSplit[1].length - 1);
            }
        }
    }

    public Decipher() : string {
        var output: string = '';
        var numberOfSteps = this.CheckSum;
        var stringToRotate = this.encryptedString.substring(0, this.encryptedString.lastIndexOf('-')).toLowerCase();

         for(var i = 0; i < stringToRotate.length; i++){
             output += this.rotateThroughKeymap(stringToRotate[i], numberOfSteps); ;
         }

        return output;
    }

    private rotateThroughKeymap(stringToRotate: string, numberOfSteps: number): string{
        var keyMap = 'abcdefghijklmnopqrstuvwxyz';
        var startIdx = keyMap.indexOf(stringToRotate);
        var stopIdx = startIdx;

        if(stringToRotate === '-')
            return ' ';

        for(var i = 0; i < numberOfSteps; i++){

            stopIdx++;
            if(stopIdx > keyMap.length -1) stopIdx = 0;

        }     

        return keyMap[stopIdx];
    }

    public IsValid() : boolean {
        var arr = [];

        for(var i = 0; i < this.Keys.length; i++){
                var isInArr = false;

                for(var j = 0; j < arr.length; j++){
                    if(arr[j].char === this.Keys[i]){
                            arr[j].value++;
                            isInArr = true;
                     }
                }

                if(!isInArr){
                    arr.push({
                        char: this.Keys[i],
                        value: 0
                    });
                }
            
        }


        arr = arr.sort(function(a, b) {
            if(a.value < b.value) return 1;
            else if(a.value > b.value) return -1;
            else {
                if(a.char > b.char) return 1;
                else if(a.char < b.char) return -1;
                else return 0;
            }
        });


        for(var i = 0; i < this.Encryption.length; i++){
            if(arr[i].char !== this.Encryption[i])
            {
                    return false;
            }
        }

        return true;
    }
}



console.log('DayFour!!');
var lvl = new Level4();