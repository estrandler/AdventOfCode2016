
import fs = require('fs');
console.log('DayTwo!');




class Level2 {
    private row1: number[] = [1, 2, 3];
    private row2: number[] = [4, 5, 6];
    private row3: number[] = [7, 8, 9];
    private x: number = 1;
    private y: number = 1;
    private minIndex: number = 0;
    private maxIndex: number = 2;
    private grid: number[][] = [this.row1, this.row2, this.row3];

    private Left: string = 'L';
    private Right: string = 'R';
    private Up: string = 'U';
    private Down: string = 'D';

    private code: string = '';

    constructor() {
         this.solve();
    }

    private solve(){
        var self = this;
        fs.readFile('src/LevelTwo/LevelTwoInput.txt', "utf8", function(err, data) {
            var rows = data.split('\n');

            for(var j = 0; j < rows.length; j++){
                for(var i = 0; i < rows[j].length; i++){
                    var instruction = rows[j][i];

                    if(instruction == self.Left)
                        self.moveleft();
                    else if(instruction == self.Right)
                        self.moveright();
                    else if(instruction == self.Up)
                        self.moveup();
                    else if(instruction == self.Down)
                        self.movedown();
                }

                self.code += self.grid[self.y][self.x];
            }

            

            console.log('Result:', self.code);
        });
    }

    private moveup(){
        if(this.y > this.minIndex)
            this.y--;
    }

    private movedown(){
        if(this.y < this.maxIndex)
            this.y++;
    }

    private moveleft(){
         if(this.x > this.minIndex)
            this.x--;
    }

    private moveright(){
         if(this.x < this.maxIndex)
            this.x++;
    }
}


var lvl = new Level2();