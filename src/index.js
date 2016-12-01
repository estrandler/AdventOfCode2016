"use strict";
var prompt = require('prompt');
var input;
var levels = [];
var selectedLevel;
var isPlusSelected;
for (var i = 1; i < 25; i++) {
    levels.push(i);
}
console.log('Which day do you want to solve?');
prompt.start();
prompt.get(['Level', 'Plus'], function (err, result) {
    if (err) {
        return onErr(err);
    }
    selectedLevel = parseInt(result.Level, 10);
    isPlusSelected = result.Plus === 'Y' || result.Plus === 'y';
    console.log('You chose:');
    console.log('  Level: ' + result.Level);
    console.log('  Plus: ' + isPlusSelected);
    handleSelectedLevel();
});
function onErr(err) {
    console.log(err);
    return 1;
}
function handleSelectedLevel() {
    switch (selectedLevel) {
        case 1:
            LevelOne();
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        default:
            console.log('Level not solved yet!'); //Test compile
            break;
    }
}
function LevelOne() {
    var lvl = new LevelOne();
    lvl.solve();
}
//# sourceMappingURL=index.js.map