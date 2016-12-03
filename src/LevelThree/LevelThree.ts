import fs = require('fs');

class Level3 {
    private triangles: Triangle[] = [];
    private trianglesPlus: Triangle[] = [];
    constructor(){
        var self = this;
        fs.readFile('src/LevelThree/LevelThreeInput.txt', "utf8", function(err, data) {
                var splitted = data.split('\r\n');

                for(var i = 0; i < splitted.length; i++){
                    var splitted2 = splitted[i].split('  ');
                    var temp = [];

                    for(var j = 0; j < splitted2.length; j++){
                        if(splitted2[j] !== ''){
                            temp.push(splitted2[j].trim());
                            }
                    }

                    var side1: number = parseInt(temp[0]);
                    var side2: number = parseInt(temp[1]);
                    var side3: number = parseInt(temp[2]);
                    var triangle = new Triangle(side1, side2, side3);

                    if(triangle.IsValid())
                        self.triangles.push(triangle);
                }

                console.log('Answer:', self.triangles.length);


/**Part two */
                var tempForAll = [];
                for(var i = 0; i < splitted.length; i++)
                {
                    var splitted2 = splitted[i].split('  ');
                    
                    for(var j = 0; j < splitted2.length; j++)
                    {
                        if(splitted2[j] !== '')
                        {
                            tempForAll.push(parseInt(splitted2[j].trim());
                        }
                    }  
                }
                 
                var sorted = self.sort(tempForAll, 0).concat(self.sort(tempForAll, 1)).concat(self.sort(tempForAll, 2));
                
                for(var i= 0; i < sorted.length; i = i + 3){
                    var side1 = sorted[i];
                    var side2 = sorted[i + 1];
                    var side3 = sorted[i + 2];
                    var triangle = new Triangle(side1, side2, side3);

                    if(triangle.IsValid())
                        self.trianglesPlus.push(triangle);
                }

                console.log('AnswerPlus:', self.trianglesPlus.length);
            });

            
        }

        private number[] sort(unsorted: number[], startIdx){
            var tempWithCorrectOrder: number[] = [];

            for(var i = startIdx; i < unsorted.length; i = i + 3){
                tempWithCorrectOrder.push(unsorted[i]);                
            }

            return tempWithCorrectOrder;
        }
}

class Triangle{
    private side_1: number;
    private side_2: number;
    private side_3: number;

    constructor(side_1: number, side_2: number, side_3: number){
        this.side_1 = side_1;
        this.side_2 = side_2;
        this.side_3 = side_3;
    }

    public IsValid() : boolean { 
        return ((this.side_1 + this.side_2) > this.side_3) &&
        ((this.side_2 + this.side_3) > this.side_1) &&
        ((this.side_1 + this.side_3) > this.side_2);
    }
}

console.log('DayThree');
var lv = new Level3();