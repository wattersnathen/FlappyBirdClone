var pipe = require('../entities/pipe');
var score = require('../entities/score');
var shuttle = require('../entities/shuttle');

var settings = require('../settings');

var PipeSystem = function (entities) {
    this.entities = entities;
    this.canvas = document.getElementById('canvas');
    this.interval = 0;
    this.paused = false;
};

PipeSystem.prototype.run = function () {
    this.interval = window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function () {
    
    if (this.paused) {
        return;
    }

    var canvasRight = 0.5 * this.canvas.width / this.canvas.height;
    var gapPosition = 0.4 + Math.random() * 0.2;

    var initialX = canvasRight + settings.pipeWidth / 2;

    var height = gapPosition - settings.pipeGap / 2;
    var position = {
        x: initialX,
        y: height / 2
    };

    var size = {
        x: settings.pipeWidth,
        y: height
    };

    this.entities.push(new pipe.Pipe(position, size));

    var height = 1 - gapPosition - settings.pipeGap / 2;
    var position = {
        x: initialX,
        y: 1 - height / 2
    };

    var size = {
        x: settings.pipeWidth,
        y: height
    };

    this.entities.push(new pipe.Pipe(position, size));

    // add score entity next to pipes
    var scorePos = {
        x: settings.pipeWidth / 2 + initialX + settings.birdWidth * 2,
        y: gapPosition
    };

    var scoreSize = {
        x: 0.001,
        y: settings.pipeGap * 2
    };

    this.entities.push(new score.Score(scorePos, scoreSize));

};

exports.PipeSystem = PipeSystem;