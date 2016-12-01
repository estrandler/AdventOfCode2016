import fs = require('fs');



class LevelOne  {


    solve() {
        var position = new Position();
        
       fs.readFile('src/LevelOneInput.txt', "utf8", function(err, data) {
            var splitted = data.split(', ');

            for(var i = 0; i < splitted.length; i++){
                var numberOfSteps = parseInt(splitted[i].substr(1));

                position.move(splitted[i][0], numberOfSteps);
            }

            var resultX = Math.abs(position.x);
            var resultY = Math.abs(position.y);
            console.log('Resultat:', resultX + resultY);
            console.log('Resultat Goldstar:', position.getFirstDoublePosition());
        });
    }
}


class Position {
    x: number = 0;
    y: number = 0;
    currentDirection: string = 'north';
    visitedPositions: string[] = [];

    getFirstDoublePosition() {
        var temp : string[] = [];
        var firstDouble : string;
        
        for(var i = 0; i < this.visitedPositions.length; i++) {
            var position = this.visitedPositions[i];

            if(temp.indexOf(position) !== -1){
                firstDouble = position;
                break;
            } else {
                temp.push(position);
            }
        }

        return parseInt(firstDouble.split(',')[0]) + parseInt(firstDouble.split(',')[1]);
    }

    getPositionString(): string {
        return Math.abs(this.x).toString() + ',' + Math.abs(this.y).toString();
    }

    move(turn: string, length: number){

        if(turn == 'R')
            this.turnRight(length);
        else
            this.turnLeft(length);

    }

    turnRight(number) {
        
        var xBefore = this.x;
        var yBefore = this.y;

        switch(this.currentDirection)
        {
            case 'north':
            {
                
                this.currentDirection = 'east';
                this.x += number;

                for(var i = xBefore; i < this.x; i++){
                    var locationString = i + ',' + this.y;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
            case 'east':
            {
                this.currentDirection = 'south';
                this.y -= number;

                for(var i = this.y; i > yBefore; i--){
                    var locationString = this.x + ',' + i;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
            case 'south':
            {
                this.currentDirection = 'west';
                this.x -= number;

                for(var i = this.x; i > xBefore; i--){
                    var locationString = i + ',' + this.y;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
            case 'west':
            {
                this.currentDirection = 'north';
                this.y += number;

                for(var i = yBefore; i < this.y; i++){
                    var locationString = this.x + ',' + i;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
        }
    }

    turnLeft(number) {

        var xBefore = this.x;
        var yBefore = this.y;

        switch(this.currentDirection)
        {
            case 'north':
            {
                this.currentDirection = 'west';
                this.x = this.x - number;

                for(var i = xBefore; i > this.x; i--){
                    var locationString = i + ',' + this.y;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
            case 'east':
            {
                this.currentDirection = 'north';
                this.y = this.y + number;

                for(var i = yBefore; i < this.y; i++){
                    var locationString = this.x + ',' + i;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
            case 'south':
            {
                this.currentDirection = 'east';
                this.x = this.x + number;

                for(var i = xBefore; i < this.x; i++){
                    var locationString = i + ',' + this.y;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
            case 'west':
            {
                this.currentDirection = 'south';
                this.y = this.y - number;

                for(var i = yBefore; i > this.y; i--){
                    var locationString = this.x + ',' + i;
                    this.visitedPositions.push(locationString);
                }

                break;
            }
        }
    }
}

let levelone = new LevelOne();
levelone.solve();