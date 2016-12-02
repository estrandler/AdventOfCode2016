
import fs = require('fs');
console.log('DayTwo!');




class Level2 {
    //Part one
    private row1: number[] = [1, 2, 3];
    private row2: number[] = [4, 5, 6];
    private row3: number[] = [7, 8, 9];
    private x: number = 1;
    private y: number = 1;
    private minIndex: number = 0;
    private maxIndex: number = 2;
    private grid: number[][] = [this.row1, this.row2, this.row3];

    //Part two
    private row1_plus: number[] = [0, 0, 1, 0, 0];
    private row2_plus: number[] = [0, 2, 3, 4, 0];
    private row3_plus: number[] = [5, 6, 7, 8, 9];
    private row4_plus: any[] = [0, 'A', 'B', 'C', 0];
    private row5_plus: any[] = [0, 0, 'D', 0, 0];
    private x_plus: number = 0;
    private y_plus: number = 2;
    
    private minIndex_plus: number = 0;
    private maxIndex_plus: number = 4;
    private grid_plus: any[][] = [this.row1_plus, this.row2_plus, this.row3_plus, this.row4_plus, this.row5_plus];

    //Common
    private Left: string = 'L';
    private Right: string = 'R';
    private Up: string = 'U';
    private Down: string = 'D';
    private code: string = '';

    constructor(shouldSolvePlus: boolean) {
        if(!shouldSolvePlus)
            this.solve();
        else
            this.solvePlus();
    }

    private solvePlus(){
        var self = this;
        fs.readFile('src/LevelTwo/LevelTwoInput.txt', "utf8", function(err, data) {
            var rows = data.split('\n');

            for(var j = 0; j < rows.length; j++){
                for(var i = 0; i < rows[j].length; i++){
                    var instruction = rows[j][i];
                   

                    if(instruction == self.Left)
                        self.moveleft_plus();
                    else if(instruction == self.Right)
                        self.moveright_plus();
                    else if(instruction == self.Up)
                        self.moveup_plus();
                    else if(instruction == self.Down)
                        self.movedown_plus();

                }

                self.code += self.grid_plus[self.y_plus][self.x_plus];
            }

            
            console.log('Level2_plus:');
            console.log('Result:', self.code);
        });
    }

    private moveup_plus(){
       let yAfterMove = this.y_plus - 1;
            if(yAfterMove >= this.minIndex_plus && this.grid_plus[yAfterMove][this.x_plus] !== 0){
                this.y_plus = yAfterMove;
            }
       
    }

    private movedown_plus(){


        let yAfterMove = this.y_plus + 1;
        

         if(yAfterMove <= this.maxIndex_plus && this.grid_plus[yAfterMove][this.x_plus] !== 0){
             this.y_plus = yAfterMove;
         }
    }

    private moveleft_plus(){
         let xAfterMove = this.x_plus - 1;

          if(xAfterMove >= this.minIndex_plus && this.grid_plus[this.y_plus][xAfterMove] !== 0){
             this.x_plus = xAfterMove;
         }
    }

    private moveright_plus(){
         let xAfterMove = this.x_plus + 1; //this.x_plus + 1;

         if(xAfterMove <= this.maxIndex_plus && this.grid_plus[this.y_plus][xAfterMove] !== 0){
             this.x_plus = xAfterMove;
         }
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
            
            console.log('Level2:');
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

var lvl = new Level2(false); 


var lvl_plus = new Level2(true); 