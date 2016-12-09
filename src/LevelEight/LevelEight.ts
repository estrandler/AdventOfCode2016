import fs = require('fs');

class Level8 {
    grid: Object = {};
    counter: number = 0;

    constructor(){
        this.createGrid();
        var self = this;

        fs.readFile('src/LevelEight/LevelEightInput.txt', "utf8", function(err, data) {
                var splitted = data.split('\r\n');      

                for(var i = 0; i < splitted.length; i++){
                    var ins = new Instruction(splitted[i]);
              
                    self.grid = ins.DoMagic(self.grid);
                }

                 for(var x = 0; x < 50; x++){
                    for(var y = 0; y < 6; y++){
                        var temp = x + ',' + y;


                        if(self.grid[temp] === '#')
                            self.counter++;
                    }
                }
                

                console.log('Result:', self.counter);

                for(var y = 0; y < 6; y++){
                    var row = '';

                    for(var x = 0; x < 50; x++){
                        row += self.grid[x + ',' + y];
                    }

                    console.log(row);
                }
        });
    }

    createGrid(){

        for(var i = 0; i < 50; i++){
            for(var j = 0; j < 6; j++){
                var string = i + ',' + j;
                this.grid[string] = '.';
            }
        }

    }
}

class Instruction {
    private instruction: string = '';
    private XY: string = '';
    private column_row_idx: number = 0;
    private numSteps: number = 0;
    private X: number = 0;
    private Y: number = 0;
    private grid: Object;
    constructor(unparsedString: string){
        var splitted = unparsedString.split(' ');
        this.instruction = splitted[0];

        if(this.instruction.indexOf('rotate') > -1){
            this.XY = splitted[1] === 'row' ? 'Y' : 'X';
            this.column_row_idx = parseInt(splitted[2].split('=')[1]);
            this.numSteps = parseInt(splitted[4]);
        } else {
            this.X = parseInt(splitted[1].split('x')[0]);
            this.Y = parseInt(splitted[1].split('x')[1]);
            
        }

        
    }

    DoMagic(grid: Object) {
        this.grid = grid;
        if(this.instruction === 'rotate'){
            if(this.XY === 'Y'){
                this.rotateRow();
            } else {
                this.rotateColumn();
            }
        } else {
            this.createRect();
        }

        return this.grid;
    }

    private rotateRow(){
        var saveBeforeChange = JSON.parse(JSON.stringify(this.grid));

        for(var x = 0; x < 50; x++){
            var prevX = x;

            for(var i = 0; i < this.numSteps; i++){
                prevX--;

                if(prevX < 0) prevX = 50 - 1;
            }

            this.grid[x + ',' + this.column_row_idx] = saveBeforeChange[prevX + ',' + this.column_row_idx];
        }
    }

    private rotateColumn(){
        var saveBeforeChange = JSON.parse(JSON.stringify(this.grid));

        for(var y = 0; y < 6; y++){
            var prevY = y;

            for(var i = 0; i < this.numSteps; i++){
                prevY--;

                if(prevY < 0) prevY = 6-1;
            }

            this.grid[this.column_row_idx + ',' + y] = saveBeforeChange[this.column_row_idx + ',' + prevY];

        }

    }

    private createRect() {
        for(var x = 0; x < this.X; x++){
            for(var y = 0; y < this.Y; y++){
                var string = x + ',' + y;

                this.grid[string] = '#';
            }
        }
    }

}

var lvl = new Level8();